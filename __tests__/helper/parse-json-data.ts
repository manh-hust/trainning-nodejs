import { FileConfig } from '@src/types';
import { readFileSync } from 'fs';

export function parseJsonData(path: string): FileConfig {
  const fileData = readFileSync(path, 'utf-8');
  return JSON.parse(fileData);
}
