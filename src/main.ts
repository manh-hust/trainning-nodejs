import { loadConfig, loadInputData } from '@src/utils/read-file';

import { FileConfig } from '@src/types';
import { OPERATION } from '@src/constants/operation';
import TodoController from '@src/controllers/todo.controller';
import { appendFileSync } from 'fs';
import { argv } from '@src/config/argv-config';
import { closeConnection } from '@src/database';
import dotenv from 'dotenv';
import { initializeConnection } from '@src/database';
import { logger } from '@src/commons/logger';
import { writeFile } from '@src/utils/write-file';

// Load environment variables from .env file
dotenv.config();

export async function main(): Promise<number> {
  try {
    // Init SQL connection
    await initializeConnection();

    // Read config file and overwrite argv
    const config: FileConfig = loadConfig(argv);

    // Transport log to file If has logFile
    if (config.logFile)
      logger.attachTransport((logObj) => {
        appendFileSync(String(config.logFile), JSON.stringify(logObj) + '\n');
      });

    // Init todo controller
    const todoController = new TodoController();

    // Handle operation cases
    switch (config.operation) {
      case OPERATION.list:
        if (config.outputFile) {
          writeFile(config.outputFile, 'LIST', await todoController.list(config.option));
        } else {
          logger.info(await todoController.list(config.option));
        }
        break;
      case OPERATION.read:
        if (config.outputFile) {
          writeFile(config.outputFile, 'READ', await todoController.read(Number(config.id)));
        } else {
          // logger.info(await todoController.read(Number(config.id)));
        }
        break;
      case OPERATION.delete:
        (await todoController.delete(Number(config.id)))
          ? logger.info('Delete todo success')
          : logger.error('Error when delete todo');
        break;
      case OPERATION.add:
        // Read data from input file
        logger.info(await todoController.add(loadInputData(String(config.inputFile))));
        break;
      case OPERATION.update:
        // Read data from input file
        logger.info(await todoController.update(Number(config.id), loadInputData(String(config.inputFile))[0]));
        break;
      default:
        return 1;
    }
  } catch (e) {
    logger.error(e);
    return 1;
  } finally {
    // End db connection
    closeConnection();
  }

  return 0;
}

main();
