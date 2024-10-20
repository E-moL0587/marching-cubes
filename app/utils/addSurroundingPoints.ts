type Coordinate = { x: number; y: number; z: number; };

export function addSurroundingPoints(coordinates: { x: number; y: number; z: number; }[]): Coordinate[] {
  const newCoordinates = new Set<string>();
  const directions = [
    { x: 0.5, y: 0, z: 0 }, { x: -0.5, y: 0, z: 0 },
    { x: 0, y: 0.5, z: 0 }, { x: 0, y: -0.5, z: 0 },
    { x: 0, y: 0, z: 0.5 }, { x: 0, y: 0, z: -0.5 },
    { x: 0.5, y: 0.5, z: 0.5 }, { x: -0.5, y: -0.5, z: -0.5 }
  ];

  coordinates.forEach(coord => {
    directions.forEach(dir => {
      const newCoord = {
        x: coord.x + dir.x,
        y: coord.y + dir.y,
        z: coord.z + dir.z
      };
      newCoordinates.add(JSON.stringify(newCoord));
    });
  });

  return Array.from(newCoordinates).map(coordStr => JSON.parse(coordStr));
}
