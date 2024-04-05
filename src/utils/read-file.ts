import { FileConfig, Todo, User } from '@src/types';
import { fileConfigSchema, fileInputSchema } from '@src/constants/json-schema';

import { OPERATION } from '@src/constants/operation';
import fs from 'fs';
import { logger } from '@src/commons/logger';
import { overwriteConfigFile } from '@src/utils/overwrite-config-file';
import { readFile } from '@src/utils/validate-file';
import { readFileSync } from 'fs';
import { validateJsonFile } from '@src/utils/validate-json';
import yargs from 'yargs';

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
 * Read file and parse to json data
 * @param {string} path - Input file name
 * @returns { T }
 */
export function readJsonFile<T>(path: string): T {
  // Validate file path
  const inputFileData = readFile(path);
  // Parse input file data to json type
  const jsonFileData: T = JSON.parse(inputFileData);

  return jsonFileData;
}

/**
 * @description Loads the configuration from the command line arguments and validates it against the JSON schema.
 * @param {yargs.Arguments<{ configFile: string; inputFile?: string; }>} argv - The command line arguments.
 * @returns {FileConfig} The loaded and validated configuration object.
 */
export function loadConfig(
  argv: yargs.Arguments<{
    configFile: string;
    inputFile?: string;
  }>,
): FileConfig {
  // Load configuration from JSON file
  let config: FileConfig = readJsonFile<FileConfig>(argv.configFile);

  // Overwrite loaded configuration with command line arguments
  config = overwriteConfigFile(config, argv);

  // Validate configuration against JSON schema
  if (!validateJsonFile(fileConfigSchema, config)) throw Error('Invalid JSON schema in the configuration file');

  // Check input file existence for ADD or UPDATE operations
  if (!config.inputFile && (config.operation === OPERATION.add || config.operation === OPERATION.update))
    throw Error('Missing input file for ADD/UPDATE operation');

  return config;
}

/**
 * Read input file
 * @param {string} path - Input file name
 * @returns {Config } New todo data
 */
export function loadInputData(path: string): Todo[] {
  const inputData: Todo[] = readJsonFile<Todo[]>(path);
  // Check json schema
  if (!validateJsonFile(fileInputSchema, inputData)) throw Error('Invalid json schema input file');

  return inputData;
}
