import { readFileSync } from 'fs';

export function parseJsonData<T>(path: string): T {
  const fileData = readFileSync(path, 'utf-8');
  return JSON.parse(fileData);
}
