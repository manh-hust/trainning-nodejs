// import { FileConfig, Todo, User } from '@src/types';
// import { readConfigFile, readInputFile, readUserDataFile } from '@src/utils/read-file';

// // Test cases for readUserDataFile function
// describe('readUserDataFile', () => {
//   describe('Normal cases', () => {
//     {
//       test('[1]. Should return list of users when file content is correct', () => {
//         const expectData: User[] = [
//           {
//             name: 'Nguyen',
//             phone: '0944324560',
//             address: 'Thanh-Xuan',
//           },
//           {
//             name: 'Toan',
//             phone: '0324324400',
//             address: 'Nam-Tu-Liem',
//           },
//         ];
//         // Verify extracted user data from data file is correct
//         expect(readUserDataFile('./__tests__/test-data/test-data.txt')).toStrictEqual(expectData);
//       });
//     }
//   });

//   describe('Error cases', () => {
//     test.each([
//       // Prepare empty file
//       {
//         index: 1,
//         fileName: 'empty-file.txt',
//         reason: 'file is empty',
//       },
//       // Prepare incorrect data file
//       {
//         index: 2,
//         fileName: 'incorrect-format.txt',
//         reason: 'data is incorrect format',
//       },
//       // Prepare incorrect name file
//       {
//         index: 3,
//         fileName: 'not-found.txt',
//         reason: 'file name not found',
//       },
//     ])('[$index]. Should return undefined if $reason', ({ fileName }) => {
//       // Expect undefined value
//       expect(readUserDataFile(`./__tests__/test-data/${fileName}`)).toStrictEqual(undefined);
//     });
//   });
// });

// // Test cases for readConfigFile function
// describe('readConfigFile', () => {
//   // Test cases for normal case
//   describe('Normal cases', () => {
//     const testData: [number, string][] = [
//       [1, './__tests__/test-data/read-file/config-file-correct.json'], // Test correct file
//     ];
//     // Iterate over each test case expect FileConfig data
//     test.each(testData)('[%i]. Should return FileConfig data if file is correct', (index, filePath) => {
//       const expectData: FileConfig = {
//         operation: 'LIST',
//         id: 5,
//         option: {
//           type: 'filter',
//           value: '0',
//           field: 'status',
//         },
//         inputFile: 'input.txt',
//         outputFile: 'output.txt',
//         logFile: 'log.txt',
//       };
//       expect(readConfigFile(filePath)).toEqual(expectData);
//     });
//   });
//   // Test cases for error case
//   describe('Error cases', () => {
//     const testData: [number, string][] = [
//       [1, './__tests__/test-data/file-config/error-case/miss-operation.json'], // Test miss operation file
//       [2, './__tests__/test-data/empty-file.json'], // Test empty file
//       [3, './incorrect-path/data.json'], // Test not found file
//     ];
//     // Iterate over each test case expect FileConfig data
//     test.each(testData)('[%i]. Should return undefined data if file invalid or incorrect format', (index, filePath) => {
//       expect(readConfigFile(filePath)).toBeUndefined();
//     });
//   });
// });

// // Test cases for readInputFile function
// describe('readInputFile', () => {
//   // Test cases for normal case
//   describe('Normal cases', () => {
//     const testData: [number, string][] = [
//       [1, './__tests__/test-data/file-input/full-field.json'], // Test correct file
//     ];
//     // Iterate over each test case expect update todo data
//     test.each(testData)('[%i]. Should return update todo data if file is correct', (index, filePath) => {
//       const expectData: Todo = {
//         title: 'Task 199',
//         status: 1,
//       };
//       expect(readInputFile(filePath)).toEqual(expectData);
//     });
//   });
//   // Test cases for error case
//   describe('Error cases', () => {
//     const testData: [number, string][] = [
//       [1, './__tests__/test-data/file-input/incorrect-field.json'], // Test incorrect field file
//       [2, './__tests__/test-data/empty-file.json'], // Test empty file
//       [3, './incorrect-path/data.json'], // Test not found file
//     ];
//     // Iterate over each test case expect FileConfig data
//     test.each(testData)('[%i]. Should return undefined data if file invalid or incorrect format', (index, filePath) => {
//       expect(readInputFile(filePath)).toBeUndefined();
//     });
//   });
// });
