import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faLeftLong,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import member1 from "../assets/member1.png";
import member2 from "../assets/member2.png";
import member3 from "../assets/member3.png";

function Team({ setTeam }) {
  const [index, setIndex] = useState(0);
  const teamMembers = [
    { name: "Abhirami Biju", imgSrc: member1, reg: "MLM21AIM002" },
    { name: "Avani Rejeesh", imgSrc: member2, reg: "MLM21AIM010" },
    { name: "Gayathri PB", imgSrc: member3, reg: "MLM21AIM012" },
  ];
  function handleNext() {
    if (index === 0) setIndex(1);
    if (index === 1) setIndex(2);
    if (index === 2) setIndex(0);
  }
  function handlePrev() {
    if (index === 0) setIndex(2);
    if (index === 1) setIndex(0);
    if (index === 2) setIndex(1);
  }
  return (
    <AnimatePresence>
      <div className="fixed w-full inset-0 bg-[rgb(4,69,79)] bg-gradient-to-r from-teal-950 via-teal-900 to-indigo-950 bg-opacity-30 backdrop-blur-sm flex items-center justify-center">
        <motion.div
          key="fileSelection"
          initial={{ opacity: 0, x: 0 }}
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
          className="bg-transparent border border-[rgb(174,108,230)] border-r-purple-400 border-t-green-400 border-b-purple-400 border-l-green-400 lg:rounded-3xl p-5 rounded-lg lg:w-1/3 lg:h-2/3"
        >
          <div className="w-full flex items-center justify-end">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setTeam(false);
              }}
              className="bg-gradient-to-r from-purple-400 to-green-400 bg-[rgb(174,108,230)] rounded-lg lg:px-5 lg:py-2 md:px-5 md:py-2 sm:px-5 sm:py-2  px-3 py-1 text-white "
            >
              X
            </motion.button>
          </div>
          <div className="flex  justify-evenly">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePrev}
              className="bg-gradient-to-r from-purple-400 to-green-400 bg-[rgb(174,108,230)] text-transparent bg-clip-text min-h-full max-h-full"
            >
              <FontAwesomeIcon icon={faArrowLeft} color="white" />
            </motion.button>
            <motion.div
              key={index} // Ensure each item has a unique key for motion to track changes
              initial={{ opacity: 0, x: -50 }} // Initial state: fully transparent and positioned to the right
              animate={{
                opacity: 1,
                x: 0,
                transition: {
                  duration: 1,
                  ease: "easeInOut",
                  when: "beforeChildren", // Ensures the container animates before any children
                },
              }} // Final state: fully visible and centered
              exit={{ opacity: 0, x: -100 }} // Exit state: fade out to the left
              transition={{ duration: 1 }} // Animation duration
            >
              <div className="flex items-center p-2">
                <div className="flex flex-col gap-5 justify-center items-center">
                  <img src={teamMembers[index].imgSrc} alt="" />
                  <div className="flex flex-col justify-center items-center">
                    <p className="text-white text-justify lg:text-lg md:text-lg sm:text-md text-md font-bold font-sans">
                      {teamMembers[index].name}
                    </p>
                    <p className="text-white text-justify lg:text-md md:text-md sm:text-sm text-sm font-sans font-extralight">
                      {teamMembers[index].reg}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleNext}
              className="bg-gradient-to-r from-purple-400 to-green-400 bg-[rgb(174,108,230)] text-transparent bg-clip-text min-h-full max-h-full"
            >
              <FontAwesomeIcon icon={faArrowRight} color="white" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default Team;
