import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

function Output({ handleUpload, audioPath }) {
  const [audioUrl, setAudioUrl] = useState(null);

  const fetchAudio = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/static/${audioPath}`,
        {
          responseType: "blob",
        }
      );
      const audioBlob = new Blob([response.data], { type: "audio/mp3" });
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(audioUrl);
      console.log(audioUrl);
    } catch (error) {
      console.error("Error fetching audio:", error);
    }
  };

  useEffect(() => {
    fetchAudio();
  }, [audioPath]);
  return (
    <AnimatePresence>
      <motion.div
        key="audioPlayback"
        initial={{ opacity: 0, y: 100 }} // Start from below the screen
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
        // transition={{ duration: 1 }}
        className="flex flex-col justify-evenly align-middle items-center py-28 lg:min-h-[80vh] "
      >
        <div className="flex flex-col justify-center align-middle items-center">
          <h1 className="text-white text-justify lg:text-7xl md:text-6xl sm:text-5xl text-3xl">
            Hear Your{" "}
            <span className="bg-gradient-to-r from-purple-400 to-green-400 bg-[rgb(174,108,230)] text-transparent bg-clip-text">
              Vision
            </span>
          </h1>
        </div>
        <div className="audio-container p-4 max-w-xl w-2/5 bg-[#06283D] rounded-lg shadow-lg">
          <audio className="w-full h-10 " src={audioUrl} type="audio/mp3" controls>
            Your browser does not support the audio element.
          </audio>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-gradient-to-r from-purple-400 to-green-400 bg-[rgb(174,108,230)] rounded-lg lg:px-5 lg:py-2 md:px-5 md:py-2 sm:px-5 sm:py-2  px-3 py-1 text-white "
          onClick={handleUpload}
        >
          Back
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
}

export default Output;
