import { useProgress } from "@react-three/drei";
import { useEffect } from "react";

import { ImAppleinc } from "react-icons/im";

export const LoadingScreen = (props) => {
  const { started, setStarted } = props;
  const { progress, total, loaded, item } = useProgress();

  useEffect(() => {
    console.log(progress, total, loaded, item);
    if (progress === 100) {
      setTimeout(() => {
        setStarted(true);
      }, 1000);
    }
  }, [progress, total, loaded, item]);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full z-50 transition-opacity duration-1000 pointer-events-none
  flex flex-col gap-5 items-center justify-center bg-[#FFF]
  ${started ? "opacity-0" : "opacity-100"}`}
    >
      <h1 className="text-2xl">Loading Experience</h1>
      <div className="text-4xl md:text-9xl font-bold relative w-2/3">
        <div
          className="absolute left-0 top-0 bg-[#000] overflow-hidden truncate text-clip transition-all duration-500"
          style={{
            width: `${progress}%`,
            height: "10px",
          }}
        ></div>
        <div
          className="opacity-40"
          style={{ height: "10px" }}
        ></div>
      </div>
    </div>
  );
};
