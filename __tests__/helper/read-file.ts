import { logger } from '@src/commons/logger';
import fs, { readFileSync } from 'fs';

/**
 * Read the contents of a file synchronously.
 * @param path The path to the file to be read.
 * @returns The contents of the file as a string, or undefined if the file does not exist.
 */
export function readFile(path: string): string | undefined {
  // Check if the file exists
  if (!fs.existsSync(path)) {
    // Log an error if the file does not exist
    logger.error('File not found');
    return; // Return undefined if the file does not exist
  }
  // Read the file contents and return them as a string
  return readFileSync(path, 'utf-8');
}
