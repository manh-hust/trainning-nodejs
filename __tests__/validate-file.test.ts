import { isValidFile } from '@src/utils/validate-file';

// Test cases for normal cases
describe('Normal cases', () => {
  const testData: [number, string][] = [
    [1, './__tests__/test-data/valid-file.json'], // Test valid file
  ];
  // Iterate over each test case expect string data
  test.each(testData)('[%i]. Should return string data if file config is correct', (index, filePath) => {
    expect(isValidFile(filePath)).toContain('title');
  });
});

// Test cases for error cases
describe('Error cases', () => {
  const testData: [number, string][] = [
    [1, './__tests__/test-data/empty-file.json'], // Test empty file
    [2, './incorrect-path/data.json'], // Test not found file
  ];
  // Iterate over each test case expect undefined
  test.each(testData)('[%i]. Should return false if file config is incorrect format', (index, filePath) => {
    expect(isValidFile(filePath)).toBeUndefined();
  });
});
