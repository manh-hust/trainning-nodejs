import yargs from 'yargs';

/**
 * Configures input arguments using yargs.
 *
 * Supported options:
 * - 'config-file' (-c): Path to the config file. Required.
 * - 'input-file' (-i): Path to the input data file. Optional.
 * - 'output-file' (-o): Path to the output file. Optional.
 * - 'log-file' (-l): Path to the logs file. Optional.
 *
 * @returns {yargs.Arguments} Parsed command-line arguments
 */
export const argv = yargs
  .options({
    'config-file': {
      alias: 'c',
      type: 'string',
      demandOption: true,
      description: 'Config file',
    },
    'input-file': {
      alias: 'i',
      type: 'string',
      demandOption: false,
      description: 'Input data file',
    },
    'log-file': {
      alias: 'l',
      type: 'string',
      demandOption: false,
      description: 'Log file',
    },
    'output-file': {
      alias: 'o',
      type: 'string',
      demandOption: false,
      description: 'Output file',
    },
  })
  .parseSync();
