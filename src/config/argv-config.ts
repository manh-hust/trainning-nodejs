import yargs from "yargs";

/**
 * Config input argument by yargs
 * -p, --path Path name of data file
 */
export const argv = yargs
  .options({
    path: {
      alias: "p",
      type: "string",
      demandOption: true,
      description: "file path",
    },
  })
  .parseSync();
