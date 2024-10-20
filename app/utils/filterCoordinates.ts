export const filterCoordinates = (coordinates: { x: number; y: number; z: number; }[]) => {
  return coordinates.filter((coord) => coord.x < 0 && coord.y > 0);
};
