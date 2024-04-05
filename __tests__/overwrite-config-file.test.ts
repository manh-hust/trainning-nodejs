import { FileConfig } from '@src/types';
import { overwriteConfigFile } from '@src/utils/overwrite-config-file';

// Test cases for normal case
describe('Normal cases', () => {
  test('[1]. Should return overwrote config if config is correct ', () => {
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
    expect(
      overwriteConfigFile(config, {
        configFile: 'config.json',
        inputFile: 'input.json',
        logFile: 'logs.json',
        outputFile: 'output.json',
        _: [],
        $0: '',
      }),
    );
  });
});
