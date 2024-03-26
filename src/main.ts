import { readUserDataFile } from "@src/utils/read-file";
import { logger } from "@src/commons/logger";
import { argv } from "@src/config/argv-config";

export async function main(): Promise<number> {
  try {
    logger.info(readUserDataFile(argv.path));
  } catch (e) {
    logger.error(e);
    return 1;
  }
  return 0;
}

main();
