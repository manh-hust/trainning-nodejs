import { runCommand } from '@test/helper/run-command';

// Test for normal cases
describe('Normal cases', () => {
  // Define test data containing index, operation, and file path
  const testData: [number, string, string][] = [
    [1, 'LIST', './__tests__/test-data/list-config.json'],
    [2, 'ADD', './__tests__/test-data/add-config.json'],
    [3, 'READ', './__tests__/test-data/read-config.json'],
    [4, 'UPDATE', './__tests__/test-data/update-config.json'],
    [5, 'DELETE', './__tests__/test-data/delete-config.json'],
  ];
  // Test data and run tests dynamically
  test.each(testData)('[%i]. Should return 0 if %s operation file', async (index, operation, filePath) => {
    // Run the command specified in the file path
    const entry = await runCommand(filePath);
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
