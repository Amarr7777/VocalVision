from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import numpy as np
import cv2
import os
import time
import speech_recognition as sr
from gtts import gTTS
import uuid  

app = Flask(__name__)
CORS(app, resources={r"/upload": {"origins": "http://localhost:5173"},
                     r"/static/*": {"origins": "http://localhost:5173"}}) 

# Function to recognize speech
def recognize_speech():
    r = sr.Recognizer()
    with sr.Microphone() as source:
        print("Listening...")
        audio = r.listen(source)
        
    try:
        print("Recognizing...")
        query = r.recognize_google(audio)
        print(f"You said: {query}")
        return query.lower()
    except sr.UnknownValueError:
        print("Sorry, I could not understand the audio.")
        return ""
    except sr.RequestError as e:
        print(f"Could not request results; {e}")
        return ""

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # Path to the YOLO directory
    yolo_path = "./"  # Adjust this path based on your project structure

    labelsPath = os.path.sep.join([yolo_path, "coco.names"])
    LABELS = open(labelsPath).read().strip().split("\n")

    np.random.seed(42)
    COLORS = np.random.randint(0, 255, size=(len(LABELS), 3), dtype="uint8")

    weightsPath = os.path.sep.join([yolo_path, "yolov3.weights"])
    configPath = os.path.sep.join([yolo_path, "yolov3.cfg"])

    net = cv2.dnn.readNetFromDarknet(configPath, weightsPath)

    image = cv2.imdecode(np.fromstring(file.read(), np.uint8), cv2.IMREAD_UNCHANGED)
    (H, W) = image.shape[:2]

    # Get the output layer indices from YOLO
    layer_names = net.getLayerNames()
    output_layers_indexes = net.getUnconnectedOutLayers().flatten()

    # Convert numpy array to list
    output_layers_indexes = [int(idx) for idx in output_layers_indexes]

    # Extract output layer names
    ln = [layer_names[i - 1] for i in output_layers_indexes]

    blob = cv2.dnn.blobFromImage(image, 1 / 255.0, (416, 416), swapRB=True, crop=False)
    net.setInput(blob)
    start = time.time()
    layerOutputs = net.forward(ln)
    end = time.time()

    print("[INFO] YOLO took {:.6f} seconds".format(end - start))

    boxes = []
    confidences = []
    classIDs = []

    for output in layerOutputs:
        for detection in output:
            scores = detection[5:]
            classID = np.argmax(scores)
            confidence = scores[classID]

            if confidence > 0.5:
                box = detection[0:4] * np.array([W, H, W, H])
                (centerX, centerY, width, height) = box.astype("int")
                x = int(centerX - (width / 2))
                y = int(centerY - (height / 2))
                boxes.append([x, y, int(width), int(height)])
                confidences.append(float(confidence))
                classIDs.append(classID)

    idxs = cv2.dnn.NMSBoxes(boxes, confidences, 0.5, 0.3)

    if len(idxs) > 0:
        list1 = []
        for i in idxs.flatten():
            (x, y) = (boxes[i][0], boxes[i][1])
            (w, h) = (boxes[i][2], boxes[i][3])
            centerx = round((2*x + w)/2)
            centery = round((2*y + h)/2)
            
            if centerx <= W/3:
                W_pos = "left "
            elif centerx <= (W/3 * 2):
                W_pos = "center "
            else:
                W_pos = "right "

            if centery <= H/3:
                H_pos = "top "
            elif centery <= (H/3 * 2):
                H_pos = "mid "
            else:
                H_pos = "bottom "
            
            list1.append(H_pos + W_pos + LABELS[classIDs[i]])

        description = ', '.join(list1)

        # Generate a unique filename for the audio file
        audio_filename = str(uuid.uuid4()) + ".mp3"
        audio_path = os.path.join('./static', audio_filename)

        myobj = gTTS(text=description, lang="en", slow=False)
        myobj.save(audio_path)

        return jsonify({'success': True, 'audio_path': audio_filename}), 200

    return jsonify({'success': False, 'message': 'No objects detected'}), 400

@app.route('/audio/<audio_filename>')
def get_audio(audio_filename):
    try:
        return send_file(audio_filename, attachment_filename=audio_filename)
    except Exception as e:
        return str(e)

if __name__ == '__main__':
    app.run(debug=True, port=8080)
