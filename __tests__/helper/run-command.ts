/**
 * @param {string []} args - main function of arguments
 * @returns  main function with args
 */
export const runCommand = async (...args: string[]) => {
  process.argv = ["npm", "start", "-p", ...args];
  // Require the yargs CLI script
  /* eslint-disable global-require */
  return require("@src/main");
};
