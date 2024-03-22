import { Logger, ILogObj } from "tslog";
import yargs from "yargs";
import { readUserDataFile } from "./utils";

const log: Logger<ILogObj> = new Logger();

const argv = yargs
  .options({
    path: {
      alias: "p",
      type: "string",
      demandOption: true,
      description: "file path",
    },
  })
  .parseSync();

log.info(readUserDataFile(argv.path));
