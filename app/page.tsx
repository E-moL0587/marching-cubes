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

  const filteredCoordinates = coordinates.filter(
    (coord) => coord.x < 0 && coord.y > 0
  );

  return (
    <div style={{ padding: "50px" }}>
      <Canvas camera={{ position: [0, 0, 25] }} style={{ width: "300px", height: "300px", background: "#f0f0f0" }}>
        <OrbitControls />

        {coordinates.map((coord, index) => (
          <Sphere key={index} args={[0.1, 32, 32]} position={[coord.x, coord.y, coord.z]}>
            <meshStandardMaterial />
          </Sphere>
        ))}
      </Canvas>

      <Canvas camera={{ position: [0, 0, 25] }} style={{ width: "300px", height: "300px", background: "#e0e0e0" }}>
        <OrbitControls />

        {filteredCoordinates.map((coord, index) => (
          <Sphere key={index} args={[0.1, 32, 32]} position={[coord.x, coord.y, coord.z]}>
            <meshStandardMaterial />
          </Sphere>
        ))}
      </Canvas>
    </div>
  );
}
