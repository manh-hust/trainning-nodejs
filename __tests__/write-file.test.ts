import { writeFile } from '@src/utils/write-file';
import { readFile } from '@test/helper/read-file';

// Test cases for normal cases
describe('Normal cases', () => {
  test('[1]. Should return true if json data is valid schema', () => {
    // initialize test data
    const path: string = './__tests__/test-data/output.txt';
    const outputData: string = JSON.stringify({
      operation: 'ADD',
      id: 12,
      inputFile: 'input.json',
      outputFile: 'output.txt',
      logFile: 'log.txt',
    });
    // write content to the output file
    writeFile(path, 'CONFIG', outputData);
    // expect to get the written data
    expect(readFile(path)).toBe(outputData);
  });
});
