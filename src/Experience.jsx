import React, { useState, useEffect, useRef, Suspense } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Sky, Sparkles, Stars } from "@react-three/drei";
import { LoadingScreen } from "./LoadingScreen";
import { House } from "./Mobius_house";
import { DayNightControls, CameraControls } from "./components/Controls";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { gsap } from "gsap";
import { IoClose } from "react-icons/io5";

function Sun({ isDay }) {
  const sunRef = useRef();
  const lightRef = useRef();
  const { camera } = useThree();

  useFrame(({ clock }) => {
    if (isDay) {
      const t = clock.getElapsedTime() * 0.01;
      const x = Math.cos(t) * 1500;
      const y = Math.sin(t) * 1500 + 500;
      sunRef.current.position.set(x, y, 5000);
      lightRef.current.position.set(x, y, 5000);
      sunRef.current.lookAt(camera.position);
    }
  });

  return (
    <group visible={isDay}>
      <mesh
        ref={sunRef}
        position={[0, 5000, 5000]}
      >
        <sphereGeometry args={[500, 32, 32]} />
        <meshStandardMaterial
          color="#FDB813"
          emissive="#FDB813"
          emissiveIntensity={0.3}
          metalness={0.5}
          roughness={0.2}
        />
      </mesh>
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.3}
          luminanceSmoothing={0.75}
          intensity={0.02}
          height={300}
        />
      </EffectComposer>
      <directionalLight
        ref={lightRef}
        color="#FFF"
        intensity={1.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
    </group>
  );
}

function Atmosphere({ isDay }) {
  const { scene } = useThree();

  useEffect(() => {
    scene.fog = new THREE.Fog(isDay ? "#eee3b2" : "#000033", 10000, 50000);
  }, [scene, isDay]);

  return (
    <>
      {isDay && (
        <Sky
          distance={4500}
          sunPosition={[0, 1, 0]}
          inclination={0.5}
          azimuth={0.25}
        />
      )}
      <Sparkles
        count={isDay ? 100 : 25000}
        scale={5500}
        size={isDay ? 100 : 1000}
        speed={1000}
        color={isDay ? "#FFD700" : "#FFFFFF"}
      />
      <Stars
        radius={15000}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={0.6}
      />
    </>
  );
}

function Experience({
  isDay,
  setIsDay,
  setMoveCameraFunction,
  removeText,
  setRemoveText,
  setShowBackdrop,
}) {
  const cameraPositions = [
    { x: 1200, y: 200, z: 220 }, // Default position
    { x: 500, y: 300, z: 1000 },
    { x: -1200, y: 500, z: -220 },
    { x: 0, y: 1000, z: 0 },
  ];
  const [started, setStarted] = useState(false);

  const toggleDayNight = () => {
    setIsDay((prev) => !prev);
  };

  const logCameraPosition = (e) => {
    const { position } = e.target.object;
    console.log("Camera position:", position);
  };

  const cameraRef = useRef();
  const controlsRef = useRef();

  const moveCamera = (position) => {
    if (cameraRef.current && controlsRef.current) {
      gsap.to(cameraRef.current.position, {
        duration: 2,
        x: position.x,
        y: position.y,
        z: position.z,
        ease: "power2.inOut",
        onUpdate: () => {
          controlsRef.current.update();
        },
      });
    }
  };

  const closeClick = () => {
    setShowBackdrop(true);
    setRemoveText(false);
    moveCamera({ x: 800, y: 400, z: -1200 });
    setTimeout(() => {}, 500);
  };

  useEffect(() => {
    setMoveCameraFunction(() => moveCamera);
  }, [setMoveCameraFunction]);

  return (
    <div className="relative bg-[#CBD0B9] h-screen w-screen">
      <LoadingScreen
        started={started}
        setStarted={setStarted}
      />

      <Suspense fallback={null}>
        <Canvas
          legacy={true}
          shadows
          camera={{
            position: [800, 400, -1200],
            near: 0.1,
            far: 50000,
            fov: 35,
          }}
          onCreated={({ camera }) => {
            cameraRef.current = camera;
          }}
        >
          <color
            attach="background"
            args={[isDay ? "#87CEEB" : "#000033"]}
          />
          <ambientLight
            color={isDay ? "#E5A733" : "#FFF"}
            intensity={isDay ? 0.7 : 0.5}
          />
          <Atmosphere isDay={isDay} />
          <Sun isDay={isDay} />
          <House
            scale={0.4}
            castShadow
            receiveShadow
          />
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -10, 0]}
            receiveShadow
          >
            <planeGeometry args={[100000, 100000]} />
            <shadowMaterial opacity={0.4} />
          </mesh>
          <OrbitControls
            ref={controlsRef}
            target={[0, 0, 0]}
            maxDistance={100000}
            maxPolarAngle={Math.PI / 2 - 0.1}
            onChange={logCameraPosition}
          />
        </Canvas>
      </Suspense>
      <CameraControls
        moveCamera={moveCamera}
        cameraPositions={cameraPositions}
      />
      <DayNightControls
        isDay={isDay}
        toggleDayNight={toggleDayNight}
      />
      {removeText && (
        <div
          className="absolute bottom-5 left-1/2 -translate-x-1/2 p-5 hover:scale-110 transition-all rounded-full bg-black text-white md:text-xl cursor-pointer"
          onClick={closeClick}
        >
          <IoClose />
        </div>
      )}
    </div>
  );
}

export default Experience;
