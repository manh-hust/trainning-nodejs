import { Todo } from '@src/types';
import { readFile } from '@src/utils/validate-file';
import fs from 'fs';

describe('validate-file', () => {
  // common test file path
  const validateJsonFile: string = './__tests__/test-data/valid-file.json';

  // reset the file before running each test case
  beforeEach(() => {
    fs.writeFileSync('./__tests__/test-data/config.json', '');
  });

  // Test cases for normal cases
  describe('Normal cases', () => {
    test('[1]. Should return string data if file config is correct', () => {
      // init expect data
      const expectData: Todo = { title: 'Do do' };
      // write expect data to file
      fs.writeFileSync(validateJsonFile, JSON.stringify(expectData));

      expect(JSON.parse(readFile(validateJsonFile))).toMatchObject(expectData);
    });
  });

  // Test cases for error cases
  describe('Error cases', () => {
    test('[1]. Should throw error if file is empty', () => {
      // write expect data to file
      fs.writeFileSync(validateJsonFile, '');

      expect(() => readFile(validateJsonFile)).toThrow('File empty!');
    });

    test('[2]. Should throw error if file not found', () => {
      expect(() => readFile('./incorrect-path/data.json')).toThrow('File not found!');
    });
  });
});
