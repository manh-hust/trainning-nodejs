import { FileConfig } from '@src/types';
import { runCommand } from '@test/helper/run-command';
import fs from 'fs';

describe('main', () => {
  // common config
  const commonConfig: FileConfig = {
    operation: 'OPERATION',
    id: 146,
    option: {
      type: 'filter',
      value: '0',
      field: 'status',
    },
    inputFile: 'input.json',
    outputFile: 'output.txt',
    logFile: 'log.txt',
  };

  // common test file path
  const configFile: string = './__tests__/test-data/config.json';

  // reset the file before running each test case
  beforeEach(() => {
    fs.writeFileSync(configFile, '');
  });

  // Test for normal cases
  describe('Normal cases', () => {
    // Define test data containing [index, operation, custom config]
    const testData: [number, string, FileConfig][] = [
      [1, 'LIST', { ...commonConfig, operation: 'LIST' }],
      [2, 'ADD', { ...commonConfig, operation: 'ADD' }],
      [3, 'READ', { ...commonConfig, operation: 'READ' }],
      [4, 'UPDATE', { ...commonConfig, operation: 'UPDATE' }],
      [5, 'DELETE', { ...commonConfig, operation: 'DELETE' }],
    ];
    // Test data and run tests dynamically
    test.each(testData)('[%i]. Should return 0 if %s operation file', async (index, operation, config) => {
      // write config data to file
      fs.writeFileSync(configFile, JSON.stringify(config));

      // Run the command specified in the file path
      const entry = await runCommand(configFile);

      // Execute the main function of the command
      const res = await entry.main();
      expect(res).toBe(0);
    });
  });

  // Test for error cases
  describe('Error cases', () => {
    // Test case for reading a failed file
    test('[1]. Should return 1 if read file failed', async () => {
      // Run the command with a file that fails to be read
      const entry = await runCommand('./__tests__/test-data/empty-file.json');
      // Execute the main function of the command
      const res = await entry.main();
      expect(res).toBe(1);
    });
  });
});
