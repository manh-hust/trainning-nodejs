import { FileConfig } from '@src/types';
import yargs from 'yargs';

/**
 * @description Overwrites the provided configuration file with new values based on the command line arguments.
 * @param {FileConfig} config - The original configuration object.
 * @param {yargs.Arguments<{ configFile: string; inputFile?: string; logFile?: string; outputFile?: string; }>} argv - The command line arguments.
 * @returns {FileConfig} The updated configuration object.
 */
export function overwriteConfigFile(
  config: FileConfig,
  argv: yargs.Arguments<{
    configFile: string;
    inputFile?: string;
    logFile?: string;
    outputFile?: string;
  }>,
): FileConfig {
  // Create a copy of the original config object
  let newConfig: FileConfig = { ...config };

  // Check if inputFile argument is provided
  if (argv.inputFile) newConfig = { ...newConfig, inputFile: argv.inputFile };

  // Check if logFile argument is provided
  if (argv.logFile) newConfig = { ...newConfig, logFile: argv.logFile };

  // Check if outputFile argument is provided
  if (argv.outputFile) newConfig = { ...newConfig, outputFile: argv.outputFile };

  return newConfig;
}
