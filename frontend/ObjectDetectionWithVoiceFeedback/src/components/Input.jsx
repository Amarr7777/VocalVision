import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

function Input({ handleUpload, setAudioPath, setLoading }) {
  const fileInputRef = useRef(null);
  const [selectedFileName, setSelectedFileName] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFileName(file ? file.name : null);
    setSelectedFile(file);
  };

  const handleUploadFile = async () => {
    if (!selectedFile) {
      console.error("No file selected");
      return;
    }
    setLoading(true);
    console.log(selectedFile);
    const formData = new FormData();
    // const formData = selectedFile
    formData.append("file", selectedFile);
    console.log(formData);
    // Verify if formData has the file
    for (const pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response:", response.data.audio_path);
      setAudioPath(response.data.audio_path);
      setLoading(false);
      handleUpload();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        key="fileSelection"
        initial={{ opacity: 0, y: 100 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            duration: 1,
            ease: "easeInOut",
            when: "beforeChildren", // Ensures the container animates before any children
          },
        }}
        exit={{ opacity: 0, x: -100 }}
        className="flex flex-col justify-evenly align-middle items-center py-28 lg:min-h-[80vh] "
      >
        <div className="flex flex-col justify-center align-middle items-center">
          <h1 className="text-white text-justify lg:text-7xl md:text-6xl sm:text-5xl text-3xl">
            Empowering Sight with Sound
          </h1>
          <h1 className="text-white text-justify lg:text-7xl md:text-6xl sm:text-5xl text-3xl">
            <span className="bg-gradient-to-r from-purple-400 to-green-400 bg-[rgb(174,108,230)] text-transparent bg-clip-text">
              VocalVision
            </span>{" "}
            in Action.
          </h1>
          <h1 className="text-white text-justify lg:text-lg md:text-6xl sm:text-5xl text-3xl py-1 font-sans font-extralight">
            {/* <span className="bg-gradient-to-r from-purple-400 to-green-400 bg-[rgb(174,108,230)] text-transparent bg-clip-text"> */}
            Visual to audio for visually impaired using deep Learning
            {/* </span> */}
          </h1>
        </div>
        <div className="lg:flex lg:justify-between lg:gap-5 md:gap-3 flex gap-1">
          <label className="border rounded-lg px-5 py-2 text-white cursor-pointer">
            Choose file
            <input type="file" className="hidden" onChange={handleFileChange} />
            <span className="ml-2">{selectedFileName}</span>
          </label>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-gradient-to-r from-purple-400 to-green-400 bg-[rgb(174,108,230)] rounded-lg lg:px-5 lg:py-2 md:px-5 md:py-2 sm:px-5 sm:py-2  px-3 py-1 text-white "
            onClick={handleUploadFile}
          >
            Upload
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default Input;
