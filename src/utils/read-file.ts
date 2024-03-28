import { FileConfig, Todo, User } from '@src/types';
import { validateJsonFileConfig, validateJsonInputFile } from '@src/utils/validate-json';

import fs from 'fs';
import { isValidFile } from '@src/utils/validate-file';
import { logger } from '@src/commons/logger';
import { readFileSync } from 'fs';

/**
 * Read user data file
 * @param {string} path - File name
 * @returns {User[] | undefined} List of users
 */
export function readUserDataFile(path: string): User[] | undefined {
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
}

/**
 * Read config file
 * @param {string} path - Config file name
 * @returns {Config | undefined} Config data
 */
export function readConfigFile(path: string): FileConfig | undefined {
  const fileData = isValidFile(path);
  // Check file is valid
  if (!fileData) {
    logger.error('Invalid config file');
    return;
  }
  const jsonFileData = JSON.parse(fileData);
  // Check json schema
  if (!validateJsonFileConfig(jsonFileData)) return;

  return jsonFileData;
}

/**
 * Read input file
 * @param {string} path - Input file name
 * @returns {Config | undefined} New todo data
 */
export function readInputFile(path: string): Todo | undefined {
  const inputFileData = isValidFile(path);
  // Check file is valid
  if (!inputFileData) {
    logger.error('Invalid input file');
    return;
  }
  const jsonFileData = JSON.parse(inputFileData);
  // Check json schema
  if (!validateJsonInputFile(jsonFileData)) return;

  return jsonFileData;
}
