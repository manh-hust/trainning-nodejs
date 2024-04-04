import fs from 'fs';
import { readFileSync } from 'fs';

/**
 * Check file exist and empty
 * @param {string} path - File name
 * @returns {string } File data
 */
export function readFile(path: string): string {
  // Check file is exist
  if (!fs.existsSync(path)) throw Error('File not found!');
  const fileData = readFileSync(path, 'utf-8');
  // Check empty file
  if (fileData === '') throw Error('File empty!');

  return fileData;
}
