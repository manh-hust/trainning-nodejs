import { FileConfig, Todo, User } from '@src/types';
import { loadConfig, loadInputData, readJsonFile, readUserDataFile } from '@src/utils/read-file';
import fs from 'fs';

describe('read-file', () => {
  // common config
  const commonConfig: FileConfig = {
    operation: 'OPERATION',
    id: 1,
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

  // Test cases for normal cases
  describe('Normal cases', () => {
    test('[readUserDataFile-1]. Should return list of users when file content is correct', () => {
      // data prerequisite
      const expectData: User[] = [
        {
          name: 'Nguyen',
          phone: '0944324560',
          address: 'Thanh-Xuan',
        },
        {
          name: 'Toan',
          phone: '0324324400',
          address: 'Nam-Tu-Liem',
        },
      ];
      expect(readUserDataFile('./__tests__/test-data/test-data.txt')).toStrictEqual(expectData);
    });

    test('[readJsonFile-1]. Should return config if file config is correct format', () => {
      // data prerequisite
      const expectData: FileConfig = { ...commonConfig, operation: 'ADD' };
      // write expect data to file
      fs.writeFileSync(configFile, JSON.stringify(expectData));
      expect(readJsonFile(configFile)).toMatchObject(expectData);
    });

    test('[loadConfig-1]. Should return config if file config is correct format', () => {
      // data prerequisite
      const expectData: FileConfig = {
        ...commonConfig,
        operation: 'ADD',
      };
      // write expect data to file
      fs.writeFileSync(configFile, JSON.stringify(expectData));

      expect(
        loadConfig({
          configFile: configFile,
          inputFile: 'input.json',
          _: [],
          $0: '',
        }),
      ).toMatchObject(expectData);
    });

    test('[loadInputData-1]. Should return list todo if file input is correct format', () => {
      // data prerequisite
      const expectData: Todo[] = [
        {
          title: 'Task 137',
          status: 2,
        },
        {
          title: 'Task 138',
        },
      ];
      // write expect data to file
      fs.writeFileSync(configFile, JSON.stringify(expectData));

      expect(loadInputData(configFile)).toMatchObject(expectData);
    });
  });

  // Test cases for error cases
  describe('Error cases', () => {
    describe('[readUserDataFile-1]. Should return undefined if read file error', () => {
      // data prerequisite
      test.each([
        // prepare empty file
        {
          index: 1,
          fileName: 'empty-file.txt',
          reason: 'file is empty',
        },
        // prepare incorrect data file
        {
          index: 2,
          fileName: 'incorrect-format.txt',
          reason: 'data is incorrect format',
        },
        // prepare incorrect name file
        {
          index: 3,
          fileName: 'not-found.txt',
          reason: 'file name not found',
        },
      ])('error $reason', ({ fileName }) => {
        expect(readUserDataFile(`./__tests__/test-data/${fileName}`)).toStrictEqual(undefined);
      });
    });

    describe('[loadConfig-1]. Should throw error if load file error', () => {
      // data prerequisite [error message, error data config][]
      const testData: [string, unknown][] = [
        ['Invalid JSON schema in the configuration file', { ...commonConfig, operation: undefined }],
        ['Missing input file for ADD/UPDATE operation', { ...commonConfig, inputFile: undefined, operation: 'UPDATE' }],
        ['Missing input file for ADD/UPDATE operation', { ...commonConfig, inputFile: undefined, operation: 'ADD' }],
      ];
      test.each(testData)('error %s', (message, config) => {
        // write expect data to file
        fs.writeFileSync(configFile, JSON.stringify(config));
        expect(() =>
          loadConfig({
            configFile: configFile,
            _: [],
            $0: '',
          }),
        ).toThrow(message);
      });
    });

    test('[loadInputData-1]. Should throw error if input file incorrect format', () => {
      // data prerequisite
      const todo: Todo = {
        title: 'Task 137',
        status: 2,
      };
      // write expect data to file
      fs.writeFileSync(configFile, JSON.stringify(todo));
      expect(() => loadInputData(configFile)).toThrow('Invalid json schema input file');
    });
  });
});
