import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./Header";
import Output from "./Output";
import Input from "./Input";
import Team from "./Team";

function LandingPage() {
  const [uploadStatus, setUploadStatus] = useState(false);
  const [team, setTeam] = useState(false);
  const [audioPath, setAudioPath] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = () => {
    setUploadStatus(!uploadStatus);
  };

  return team ? (
    <Team setTeam={setTeam} />
  ) : (
    <div className="bg-[rgb(4,69,79)] bg-gradient-to-r from-teal-950 via-teal-900 to-indigo-950 min-h-screen flex flex-col">
      <Header setTeam={setTeam} team={team} />
      <AnimatePresence>
        {!uploadStatus ? (
          <motion.div
            key={"input"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center h-full"
          >
            {loading ? (
              <AnimatePresence>
                <motion.div
                  key="audioPlayback"
                  initial={{ opacity: 0, y: 0 }} // Start from below the screen
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
                  <h3 className="bg-gradient-to-r from-purple-400 to-green-400 bg-[rgb(174,108,230)] text-transparent bg-clip-text">
                    Analyzing your image...
                  </h3>
                </motion.div>
              </AnimatePresence>
            ) : (
              <Input
                handleUpload={handleUpload}
                setAudioPath={setAudioPath}
                setLoading={setLoading}
              />
            )}
          </motion.div>
        ) : (
          <Output handleUpload={handleUpload} audioPath={audioPath} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default LandingPage;
