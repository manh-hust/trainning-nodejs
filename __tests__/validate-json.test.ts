import { FileConfig } from '@src/types';
import { JSONSchemaType } from 'ajv';
import { fileConfigSchema } from '@src/constants/json-schema';
import { validateJsonFile } from '@src/utils/validate-json';

// Test cases for normal cases
describe('Normal cases', () => {
  test('[1]. Should return true if json data is valid schema', () => {
    // Define config data
    const config: FileConfig = {
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
    expect(validateJsonFile(fileConfigSchema, config)).toBeTruthy();
  });
});

// Test cases for error cases
describe('Error cases', () => {
  test('[1]. Should return false if json data is invalid schema', () => {
    // Define config data miss operation
    const config: unknown = {
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
    expect(validateJsonFile<unknown>(fileConfigSchema as JSONSchemaType<unknown>, config)).toBeFalsy();
  });
});
