import fs from 'fs';

/**
 * @description Writes a message to a file.
 * @param {string} file - The file path.
 * @param {string} message - The message to be written to the file.
 * @returns {void}
 */
export function writeFile(file: string, message: string): void {
  // Create a writable stream to the file in append mode
  const logStream = fs.createWriteStream(file, { flags: 'a' });

  // Write the message to the file followed by a newline character
  logStream.write(`${message}\n`);

  // Close the stream
  logStream.end();
}
