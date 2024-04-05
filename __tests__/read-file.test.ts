import { FileConfig, Todo, User } from '@src/types';
import { loadConfig, loadInputData, readJsonFile, readUserDataFile } from '@src/utils/read-file';

// Test cases for readUserDataFile function
describe('readUserDataFile', () => {
  describe('Normal cases', () => {
    {
      test('[1]. Should return list of users when file content is correct', () => {
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
        // Verify extracted user data from data file is correct
        expect(readUserDataFile('./__tests__/test-data/test-data.txt')).toStrictEqual(expectData);
      });
    }
  });

  describe('Error cases', () => {
    test.each([
      // Prepare empty file
      {
        index: 1,
        fileName: 'empty-file.txt',
        reason: 'file is empty',
      },
      // Prepare incorrect data file
      {
        index: 2,
        fileName: 'incorrect-format.txt',
        reason: 'data is incorrect format',
      },
      // Prepare incorrect name file
      {
        index: 3,
        fileName: 'not-found.txt',
        reason: 'file name not found',
      },
    ])('[$index]. Should return undefined if $reason', ({ fileName }) => {
      // Expect undefined value
      expect(readUserDataFile(`./__tests__/test-data/${fileName}`)).toStrictEqual(undefined);
    });
  });
});

// Test cases for readJsonFile function
describe('readJsonFile', () => {
  // Test cases for normal case
  describe('Normal cases', () => {
    const testData: [number, string][] = [
      [1, './__tests__/test-data/file-config/normal-case/add-operation.json'], // Test json file
    ];
    // Iterate over each test case expect config
    test.each(testData)('[%i]. Should return config if file config is correct format', (index, filePath) => {
      const expectData: FileConfig = {
        operation: 'ADD',
        id: 12,
        option: {
          type: 'filter',
          value: '0',
          field: 'status',
        },
        inputFile: 'input.json',
        outputFile: 'output.txt',
        logFile: 'log.txt',
      };

      expect(readJsonFile(filePath)).toMatchObject(expectData);
    });
  });
});

// Test cases for loadConfig function
describe('loadConfig', () => {
  // Test cases for normal case
  describe('Normal cases', () => {
    const testData: [number, string][] = [
      [1, './__tests__/test-data/file-config/normal-case/add-operation.json'], // Test json file
    ];
    // Iterate over each test case expect config
    test.each(testData)('[%i]. Should return config if file config is correct format', (index, filePath) => {
      const expectData: FileConfig = {
        operation: 'ADD',
        id: 12,
        option: {
          type: 'filter',
          value: '0',
          field: 'status',
        },
        inputFile: 'input.json',
        outputFile: 'output.txt',
        logFile: 'log.txt',
      };
      expect(
        loadConfig({
          configFile: filePath,
          inputFile: 'input.json',
          _: [],
          $0: '',
        }),
      ).toMatchObject(expectData);
    });
  });
  // Test cases for error case
  describe('Error cases', () => {
    const testData: [number, string][] = [
      [1, './__tests__/test-data/file-config/error-case/miss-operation.json'], // Test invalid schema  file
      [2, './__tests__/test-data/read-file/miss-input-field-add.json'], // Test missing input file ADD operation
      [3, './__tests__/test-data/read-file/miss-input-field-update.json'], // Test missing input file UPDATE operation
    ];
    test.each(testData)('[%i]. Should throw error if load file error', (index, filePath) => {
      expect(() =>
        loadConfig({
          configFile: filePath,
          _: [],
          $0: '',
        }),
      ).toThrow();
    });
  });
});

// Test cases for loadInputData function
describe('loadInputData', () => {
  // Test cases for normal case
  describe('Normal cases', () => {
    const testData: [number, string][] = [
      [1, './__tests__/test-data/read-file/input.json'], // Test valid input json file
    ];
    // Iterate over each test case expect list todo
    test.each(testData)('[%i]. Should return list todo if file input is correct format', (index, filePath) => {
      const expectData: Todo[] = [
        {
          title: 'Task 137',
          status: 2,
        },
        {
          title: 'Task 138',
        },
      ];
      expect(loadInputData(filePath)).toMatchObject(expectData);
    });
  });
  // Test cases for error case
  describe('Error cases', () => {
    const testData: [number, string][] = [
      [1, './__tests__/test-data/read-file/invalid-input.json'], // Test invalid schema  file
    ];
    test.each(testData)('[%i]. Should throw error if load file error', (index, filePath) => {
      expect(() => loadInputData(filePath)).toThrow();
    });
  });
});
