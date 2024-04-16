import fs from 'fs';
import { logger } from '@src/commons/logger';

/**
 * @description Writes a message to a file.
 * @param {string} file - The file path.
 * @param {string} message - The message to be written to the file.
 * @returns {void}
 */
export function writeFile<T>(file: string, message: string, data: T): void {
  // Create a writable stream to the file in append mode
  const logStream = fs.createWriteStream(file, { flags: 'a' });

  // Create a timestamp with current date and time
  const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');

  // Format the log entry with timestamp, action description, and data
  const logEntry = `${timestamp}  ${message} ${JSON.stringify(data)}`;

  // Write the message to the file followed by a newline character
  logStream.write(`${logEntry}\n`);

  // Close the stream
  logStream.end();

  // Log to console
  logger.info(`The results are exported to file ${file}`);
}
