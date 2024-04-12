import { FileConfig } from '@src/types';
import { overwriteConfigFile } from '@src/utils/overwrite-config-file';

// Test cases for normal cases
describe('Normal cases', () => {
  // Test case for overwriting the config file.
  test('[overwriteConfigFile-1]. Should return the overwritten config if the config is correct.', () => {
    // Define a sample config object with various properties.
    const config: FileConfig = {
      operation: 'LIST',
      id: 5,
      option: {
        type: 'filter',
        value: '0',
        field: 'status',
      },
      inputFile: 'input.txt',
      outputFile: 'output.txt',
      logFile: 'log.txt',
    };
    // Expect the overwriteConfigFile function to return the result of overwriting the config file.
    expect(
      overwriteConfigFile(config, {
        configFile: 'config.json',
        inputFile: 'input.json',
        logFile: 'logs.json',
        outputFile: 'output.json',
        _: [],
        $0: '',
      }),
    ).toMatchObject({
      operation: 'LIST',
      id: 5,
      option: {
        type: 'filter',
        value: '0',
        field: 'status',
      },
      inputFile: 'input.json',
      outputFile: 'output.json',
      logFile: 'logs.json',
    });
  });
});
