import { promises as fs } from 'fs';
import path from 'path';

type Coordinate = { x: number; y: number; z: number; };

async function getCoordinates(): Promise<Coordinate[]> {
  const filePath = path.join(process.cwd(), 'public', 'coordinates.json');
  const jsonData = await fs.readFile(filePath, 'utf8');
  const parsedData = JSON.parse(jsonData);

  return parsedData.coordinates;
}

export default async function CoordinatesPage() {
  const coordinates = await getCoordinates();

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
