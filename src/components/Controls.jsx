import { useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

function CameraControls({ moveCamera, cameraPositions }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <div>
      <div
        className="absolute cursor-pointer bottom-1 right-2 p-3 rounded-full bg-gray-700 hover:bg-gray-900 transition-all duration-300 ease-in-out"
        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
      >
        {isDrawerOpen ? (
          <IoIosArrowDown size={30} />
        ) : (
          <IoIosArrowUp size={30} />
        )}
      </div>
      <div className="absolute bottom-16 right-2 space-y-4 flex flex-col">
        {isDrawerOpen &&
          cameraPositions.map((pos, index) => (
            <button
              key={index}
              onClick={() => moveCamera(pos)}
              className="p-2 bg-gray-700 text-white rounded-lg shadow-md transition-all ease-in-out transform hover:scale-110 hover:bg-gray-600"
            >
              Camera {index + 1}
            </button>
          ))}
      </div>
    </div>
  );
}

function DayNightControls({ toggleDayNight, isDay }) {
  return (
    <button
      onClick={toggleDayNight}
      className={`p-2 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110 ${
        isDay
          ? "bg-blue-900 hover:bg-blue-800"
          : "bg-yellow-400 hover:bg-yellow-500"
      }`}
    >
      {isDay ? (
        <FaMoon className="text-white text-xl" />
      ) : (
        <FaSun className="text-white text-xl" />
      )}
    </button>
  );
}

export { CameraControls, DayNightControls };
