"use client";
import { useEffect, useState } from 'react';

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

      <p>
        {coordinates.map((coord, index) => (
          <span key={index}>
            ({coord.x}, {coord.y}, {coord.z})
            {index < coordinates.length - 1 && ", "}
          </span>
        ))}
      </p>
    </div>
  );
}
