import fs from 'fs';
import { logger } from '@src/commons/logger';
import { readFileSync } from 'fs';

/**
 * Check file exist and empty
 * @param {string} path - File name
 * @returns {string | undefined} File data
 */
export function isValidFile(path: string): string | undefined {
  // Check file is exist
  if (!fs.existsSync(path)) {
    logger.error('File not found');
    return;
  }
  const fileData = readFileSync(path, 'utf-8');
  // Check empty file
  if (fileData === '') {
    logger.error('File empty!');
    return;
  }
  return fileData;
}
