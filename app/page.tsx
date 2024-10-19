"use client";
import { Canvas } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import { Sphere, OrbitControls } from '@react-three/drei';

type Coordinate = { x: number; y: number; z: number; };

export default function CoordinatesPage() {
  const [coordinates, setCoordinates] = useState<Coordinate[]>([]);

  useEffect(() => {
    const fetchCoordinates = async () => {
      const response = await fetch('/api');
      const data = await response.json();
      setCoordinates(data);
    };

    fetchCoordinates();
  }, []);

  return (
    <div style={{ padding: "50px" }}>
      <h3>座標</h3>

      {coordinates.map((coord, index) => (
        <span key={index}>
          ({coord.x}, {coord.y}, {coord.z})
          {index < coordinates.length - 1 && ", "}
        </span>
      ))}

      <Canvas style={{ height: "400px", background: "#f0f0f0" }}>
        <OrbitControls />

        {coordinates.map((coord, index) => (
          <Sphere key={index} args={[0.2, 32, 32]} position={[coord.x, coord.y, coord.z]}>
            <meshStandardMaterial />
          </Sphere>
        ))}
      </Canvas>
    </div>
  );
}
