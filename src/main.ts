import { FileConfig, Todo } from '@src/types';
import { loadConfig, loadInputData } from '@src/utils/read-file';

import { OPERATION } from '@src/constants/operation';
import TodoController from '@src/controllers/todo.controller';
import { appendFileSync } from 'fs';
import { argv } from '@src/config/argv-config';
import { closeConnection } from '@src/database';
import { initializeConnection } from '@src/database';
import { logger } from '@src/commons/logger';

export async function main(): Promise<number> {
  try {
    // Init SQL connection
    await initializeConnection();

    // Read config file and overwrite argv
    const config: FileConfig = loadConfig(argv);

    // Append log file
    logger.attachTransport((logObj) => {
      appendFileSync(String(config.logFile), JSON.stringify(logObj) + '\n');
    });
    // Read data from input file
    const data: Todo[] = loadInputData(String(config.inputFile));

    // Init todo controller
    const todoController = new TodoController(String(config.outputFile));

    // Handle operation cases
    switch (config.operation) {
      case OPERATION.list:
        logger.info(await todoController.list(config.option));
        break;
      case OPERATION.read:
        logger.info(await todoController.read(Number(config.id)));
        break;
      case OPERATION.delete:
        logger.info(await todoController.delete(Number(config.id)));
        break;
      case OPERATION.add:
        logger.info(await todoController.add(data));
        break;
      case OPERATION.update:
        logger.info(await todoController.update(Number(config.id), data[0]));
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
