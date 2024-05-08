import React from "react";
import { motion, AnimatePresence } from "framer-motion";

function Header({setTeam,team}) {
  const handleClick = ()=>{
      setTeam(!team)
  }
  return (
    <div className="bg-transparent flex justify-between lg:p-5 md:p-5 sm:p-5 p-5">
      <h1 className="lg:text-4xl md:text-3xl sm:text-3xl text-xl font-bold leading-tight text-white cursor-pointer">
        Voca
        <span className="bg-gradient-to-r from-purple-400 to-green-400 bg-[rgb(174,108,230)] text-transparent bg-clip-text">
          lV
        </span>
        ision
      </h1>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleClick}
        className="bg-gradient-to-r from-purple-400 to-green-400 bg-[rgb(174,108,230)] rounded-lg lg:px-5 lg:py-2 md:px-5 md:py-2 sm:px-5 sm:py-2  px-3 py-1 text-white "
      >
        Our Team
      </motion.button>
    </div>
  );
}

export default Header;
