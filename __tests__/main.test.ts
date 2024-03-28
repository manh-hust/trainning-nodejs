import { runCommand } from '@test/helper/run-command';
import { readUserDataFile } from '@src/utils/read-file';

describe('Normal cases', () => {
  {
    test('[1]. Should return 0 if read file success', async () => {
      const entry = await runCommand('test-data.txt');
      const res = await entry.main(readUserDataFile);
      expect(res).toBe(0);
    });
  }
});

describe('Error cases', () => {
  {
    test('[1]. Should return 1 if read file failed', async () => {
      // Mock read file error function
      const mockFunction = jest.fn(() => {
        throw new Error();
      });
      const entry = await runCommand('test-data.txt');
      const res = await entry.main(mockFunction);
      expect(res).toBe(1);
    });
  }
});
