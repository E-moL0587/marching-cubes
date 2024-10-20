type Coordinate = { x: number; y: number; z: number; };

export function filterCoordinates(coordinates: { x: number; y: number; z: number; }[]): Coordinate[] {
  return coordinates.filter((coord) => coord.x < 0 && coord.y > 0);
}
