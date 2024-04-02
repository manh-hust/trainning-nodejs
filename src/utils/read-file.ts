import { readFileSync } from 'fs';
import { User } from '@src/types';
import { logger } from '@src/commons/logger';
import fs from 'fs';

/**
 * Read file and return list of users
 * @param {string} path - File name
 * @returns {User[] | undefined} List of users
 */
export function readUserDataFile(path: string): User[] | undefined {
  try {
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
    // Convert file data to string array
    const userLines: string[] = fileData.split('\n');
    // Init hasError variable to check format data in userLines
    let hasError: boolean = false;
    const users: User[] | undefined = userLines.map((userLine, index) => {
      // Extract user properties from raw string
      const userData: string[] = userLine.split(' ');
      // Check properties length
      if (userData.length !== 3) {
        logger.error(`Data format incorrect in line ${index + 1}!`);
        hasError = true;
      }
      return {
        name: userData[0],
        phone: userData[1],
        address: userData[2],
      };
    });
    // Return undefined if has incorrect data format
    if (hasError) return;

    return users;
  } catch (error) {
    // throw error;
  }
}
