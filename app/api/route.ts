import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  const filePath = path.join(process.cwd(), 'public', 'coordinates.json');
  const jsonData = await fs.readFile(filePath, 'utf8');
  const parsedData = JSON.parse(jsonData);

  return NextResponse.json(parsedData.coordinates);
}
