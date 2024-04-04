// import { validateJsonFileConfig, validateJsonInputFile } from '@src/utils/validate-json';

// import { parseJsonData } from '@test/helper/parse-json-data';

// // Test cases for validateJsonFileConfig function
// describe('validateJsonFileConfig', () => {
//   // Test cases for normal cases
//   describe('Normal cases', () => {
//     const testData: [number, string][] = [
//       [1, './__tests__/test-data/file-config/normal-case/read-operation.json'], // Test data for read operation
//       [2, './__tests__/test-data/file-config/normal-case/list-operation.json'], // Test data for list operation
//       [3, './__tests__/test-data/file-config/normal-case/add-operation.json'], // Test data for add operation
//       [4, './__tests__/test-data/file-config/normal-case/update-operation.json'], // Test data for update operation
//       [5, './__tests__/test-data/file-config/normal-case/delete-operation.json'], // Test data for delete operation
//     ];

//     // Iterate over each test case expect true
//     test.each(testData)('[%i]. Should return true if file config is correct', (index, filePath) => {
//       expect(validateJsonFileConfig(parseJsonData(filePath))).toBeTruthy();
//     });
//   });

//   // Test cases for error cases
//   describe('Error cases', () => {
//     const testData: [number, string][] = [
//       [1, './__tests__/test-data/file-config/error-case/miss-operation.json'], // Test data for missing operation
//       [2, './__tests__/test-data/file-config/error-case/update-operation-miss-id.json'], // Test data for update operation with missing ID
//       [3, './__tests__/test-data/file-config/error-case/read-operation-miss-id.json'], // Test data for read operation with missing ID
//       [4, './__tests__/test-data/file-config/error-case/delete-operation-miss-id.json'], // Test data for delete operation with missing ID
//     ];

//     // Iterate over each test case expect false
//     test.each(testData)('[%i]. Should return false if file config is incorrect format', (index, filePath) => {
//       expect(validateJsonFileConfig(parseJsonData(filePath))).toBeFalsy();
//     });
//   });
// });

// // Test cases for validateJsonInputFile function
// describe('validateJsonInputFile', () => {
//   // Test cases for normal cases
//   describe('Normal cases', () => {
//     const testData: [number, string][] = [
//       [1, './__tests__/test-data/file-input/full-field.json'], // Test data for full field
//       [2, './__tests__/test-data/file-input/miss-status-field.json'], // Test data for missing status
//       [3, './__tests__/test-data/file-input/miss-title-field.json'], // Test data for missing title
//     ];
//     // Iterate over each test case expect true
//     test.each(testData)('[%i]. Should return true if file input is correct', (index, filePath) => {
//       expect(validateJsonInputFile(parseJsonData(filePath))).toBeTruthy();
//     });
//   });

//   // Test cases for error cases
//   describe('Error cases', () => {
//     const testData: [number, string][] = [
//       [1, './__tests__/test-data/file-input/incorrect-field.json'], // Test data for incorrect field
//     ];

//     // Iterate over each test case expect false
//     test.each(testData)('[%i]. Should return false if file input is incorrect format', (index, filePath) => {
//       expect(validateJsonInputFile(parseJsonData(filePath))).toBeFalsy();
//     });
//   });
// });
