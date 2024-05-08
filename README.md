# VocalVision

VocalVision is a web application that empowers individuals with visual impairments to perceive their surroundings using sound. This project utilizes computer vision techniques to analyze images and describe the scene through audio output, providing users with an auditory representation of their environment.

## Features

- **Object Detection**: Detects objects in uploaded images using YOLO (You Only Look Once) object detection algorithm.
- **Audio Description**: Generates audio descriptions of the detected objects using text-to-speech (TTS) technology.
- **Accessibility**: Designed with accessibility in mind, making it user-friendly for individuals with visual impairments.
- **Easy Integration**: Simple integration with existing assistive technologies and devices.

## Technologies Used

- **Frontend**: React.js, Framer Motion
- **Backend**: Flask (Python)
- **Computer Vision**: OpenCV, YOLO (You Only Look Once)
- **Text-to-Speech (TTS)**: gTTS (Google Text-to-Speech)
- **Communication**: Axios for API requests

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/Amarr7777/VocalVision.git

2. Run the frontend
    ```bash
    cd VocalVision/frontend/ObjectDetectionWithVoiceFeedback
    npm i
    npm run dev

3. Run the server (for mac)
    ```bash
    cd VocalVision/server
    source venv/bin/activate
    pip3 install -r requirements.txt
    python3 server.py

4. Run the server (for windows)
    ```bash
    cd VocalVision/server
    source venv/Scripts/activate
    pip install -r requirements.txt
    python server.py
   
### **Note**:
You need to download the [yolo pretrained weights](https://pjreddie.com/media/files/yolov3.weights) and place it in the server folder to get started with the code.
