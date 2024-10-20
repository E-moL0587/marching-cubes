"use client";

import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { Sphere, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { filterCoordinates } from './utils/filterCoordinates';
import { addSurroundingPoints } from './utils/addSurroundingPoints';

type Coordinate = { x: number; y: number; z: number; };

function CameraControls({ targetCameraSettings, cameraRef }: { targetCameraSettings: any, cameraRef: React.RefObject<THREE.PerspectiveCamera> }) {
  useFrame(() => {
    if (!cameraRef.current) return;
    cameraRef.current.position.lerp(targetCameraSettings.position, 0.05);
    cameraRef.current.fov += (targetCameraSettings.fov - cameraRef.current.fov) * 0.05;
    cameraRef.current.updateProjectionMatrix();
  });

  return null;
}

export default function CoordinatesPage() {
  const [coordinates, setCoordinates] = useState<Coordinate[]>([]);
  const [targetCameraSettings, setTargetCameraSettings] = useState({ position: new THREE.Vector3(0, 10, 20), fov: 75 });
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      const response = await fetch('/api');
      const data = await response.json();
      setCoordinates(data);
    };

    fetchCoordinates();
  }, []);

  const handle1 = () => {
    setCoordinates(filterCoordinates(coordinates));
    setTargetCameraSettings({ position: new THREE.Vector3(-30, 20, 10), fov: 20 });
  };

  const handle2 = () => {
    setCoordinates(addSurroundingPoints(coordinates));
    setTargetCameraSettings({ position: new THREE.Vector3(-30, 20, 10), fov: 20 });
  };

  return (
    <div style={{ padding: "50px" }}>
      <button onClick={handle1} style={{ marginBottom: "20px" }}>handle1</button>
      <button onClick={handle2} style={{ marginBottom: "20px" }}>handle2</button>

      <Canvas camera={{ position: [0, 10, 20], fov: 75 }} style={{ width: "300px", height: "300px", background: "#f0f0f0" }} onCreated={({ camera }) => cameraRef.current = camera as THREE.PerspectiveCamera }>
        <OrbitControls />
        <CameraControls targetCameraSettings={targetCameraSettings} cameraRef={cameraRef} />

        {coordinates.map((coord, index) => (
          <Sphere key={index} args={[0.1, 32, 32]} position={[coord.x, coord.y, coord.z]}>
            <meshStandardMaterial />
          </Sphere>
        ))}
      </Canvas>
    </div>
  );
}
