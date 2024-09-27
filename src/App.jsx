import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaVolumeUp } from "react-icons/fa";
import { IoIosArrowRoundForward } from "react-icons/io";
import Experience from "./Experience";
import { DayNightControls } from "./components/Controls";
import {
  slideAnimation,
  fadeAnimation,
  headTextAnimation,
  headContentAnimation,
  headContainerAnimation,
} from "./config/motion";

function App() {
  const [showExperience, setShowExperience] = useState(false);
  const [removeText, setRemoveText] = useState(false);
  const [isDay, setIsDay] = useState(true);
  const [showBackdrop, setShowBackdrop] = useState(true);
  const [moveCameraFunction, setMoveCameraFunction] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleExplore = () => {
    setShowExperience(true);
    setTimeout(() => setRemoveText(true), 1000);
    setTimeout(() => setShowBackdrop(false), 1300);

    if (moveCameraFunction) {
      moveCameraFunction({ x: 1200, y: 200, z: 220 });
    }
  };

  const toggleDayNight = () => {
    setIsDay(!isDay);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="main"
        className="relative h-screen w-screen overflow-hidden"
        {...fadeAnimation}
      >
        <Experience
          isDay={isDay}
          setIsDay={setIsDay}
          setMoveCameraFunction={setMoveCameraFunction}
          removeText={removeText}
          setRemoveText={setRemoveText}
          setShowBackdrop={setShowBackdrop}
        />

        <motion.nav
          className="absolute w-full top-4 left-0 z-50 px-4 sm:px-6 lg:px-8"
          {...slideAnimation("down")}
        >
          <div>
            <div className="max-w-5xl mx-auto md:px-10 bg-black bg-opacity-30 backdrop-filter backdrop-blur-md rounded-md">
              <div className="flex justify-between items-center py-3 px-4">
                <h1 className="text-white text-3xl font-light">Archviz</h1>
                <div className="flex items-center space-x-4 text-white">
                  <button className="text-sm hover:text-gray-300 transition-colors">
                    About
                  </button>
                  <button className="text-sm hover:text-gray-300 transition-colors">
                    Customize
                  </button>
                  <DayNightControls
                    toggleDayNight={toggleDayNight}
                    isDay={isDay}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.nav>

        {/* Rest of the component remains unchanged */}
        {showBackdrop && (
          <motion.div
            className="absolute inset-0 top-0 left-0 bg-black z-10 transition-all"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            exit={{ opacity: 0 }}
          ></motion.div>
        )}

        {!removeText && (
          <motion.div
            className="absolute inset-0 flex flex-col justify-center items-start ml-[8%] text-white z-20"
            {...headContainerAnimation}
          >
            <div className="relative">
              <motion.div {...headTextAnimation}>
                <h1 className="font-serif text-5xl md:text-[8rem] font-bold leading-[85%] mb-4 md:mb-4">
                  Seashore <br /> House
                </h1>
              </motion.div>

              <motion.div
                {...headContentAnimation}
                onClick={handleExplore}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="absolute w-[75vw] lg:w-full h-[60%] md:h-[40%] top-auto md:left-4 flex gap-4 items-center p-3 md:p-5 mt-3 border border-gray-300 rounded-full cursor-pointer"
              >
                <motion.button
                  className={`p-3 text-white rounded-full transition-all duration-300 text-sm md:text-xl ${
                    isHovered ? "rotating-border transition-all" : "border "
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <IoIosArrowRoundForward />
                </motion.button>
                <p className="font-sans text-sm md:text-lg text-white w-full">
                  Explore the real-time architectural visualization in three.js
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export default App;
