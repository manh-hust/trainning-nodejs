import fs from 'fs';

/**
 * @description Writes a message to a file.
 * @param {string} file - The file path.
 * @param {string} data - The string data to be written to the file.
 * @returns {void}
 */
export function writeFile(file: string, data: string): void {
  // Create a writable stream to the file in append mode
  const logStream = fs.createWriteStream(file, { flags: 'a' });

  // Write the message to the file followed by a newline character
  logStream.write(data);

  // Close the stream
  logStream.end();
}
