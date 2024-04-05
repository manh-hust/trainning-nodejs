import { runCommand } from '@test/helper/run-command';

describe('Normal cases', () => {
  const testData: [number, string, string][] = [
    [1, 'ADD', './__tests__/test-data/add-config.json'],
    [2, 'LIST', './__tests__/test-data/list-config.json'],
    // [3, 'READ', './__tests__/test-data/read-config.json'],
    // [4, 'UPDATE', './__tests__/test-data/update-config.json'],
    // [5, 'DELETE', './__tests__/test-data/delete-config.json'],
  ];
  test.each(testData)('[%i]. Should return 0 if %s operation file', async (index, operation, filePath) => {
    const entry = await runCommand(filePath);
    const res = await entry.main();
    expect(res).toBe(0);
  });
});

// describe('Error cases', () => {
//   {
//     test('[1]. Should return 1 if read file failed', async () => {
//       // Mock read file error function
//       const mockFunction = jest.fn(() => {
//         throw new Error();
//       });
//       const entry = await runCommand('test-data.txt');
//       const res = await entry.main(mockFunction);
//       expect(res).toBe(1);
//     });
//   }
// });
