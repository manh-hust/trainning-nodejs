import { runCommand } from "@src/helper/run-command";

describe("Normal cases", () => {
  {
    test("[1]. Should return 0 if read file success", async () => {
      const entry = await runCommand("test-data.txt");
      const res = await entry.main();
      expect(res).toBe(0);
    });
  }
});
