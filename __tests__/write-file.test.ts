import { writeFile } from '@src/utils/write-file';

// Test cases for normal cases
describe('Normal cases', () => {
  test('[1]. Should return true if json data is valid schema', () => {
    const outputData: string = JSON.stringify({
      operation: 'ADD',
      id: 12,
      inputFile: 'input.json',
      outputFile: 'output.txt',
      logFile: 'log.txt',
    });
    expect(writeFile('output.json', 'CONFIG', outputData)).toBe(void 0);
  });
});
