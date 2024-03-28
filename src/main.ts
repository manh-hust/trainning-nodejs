import { FileConfig, Todo } from '@src/types';
import { readConfigFile, readInputFile } from '@src/utils/read-file';

import { OPERATION } from '@src/constants/operation';
import TodoController from '@src/controllers/todo.controller';
import { argv } from '@src/config/argv-config';
import { logger } from '@src/commons/logger';
import mysql from 'mysql2/promise';

export async function main(): Promise<number> {
  // Init SQL connection
  const conn = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456a',
    database: 'lab2-todo',
  });
  try {
    // Read config file
    const config: FileConfig | undefined = readConfigFile(argv.configFile);

    // Required input file if OPERATION is Add or Update
    let inputData: Todo | undefined = {};
    if (config?.operation === OPERATION.add || config?.operation === OPERATION.update) {
      if (argv.inputFile) {
        // Get input data from input file
        inputData = readInputFile(argv.inputFile);
      } else {
        logger.error('Input file is required');
        return 1;
      }
    }
    // Init todo controller
    const todoController = new TodoController(conn);
    // Handle operation cases
    switch (config?.operation) {
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
        logger.info(await todoController.add(inputData as Todo));
        break;
      case OPERATION.update:
        logger.info(await todoController.update(Number(config.id), inputData as Todo));
        break;
      default:
        return 1;
    }
  } catch (e) {
    logger.error(e);
    return 1;
  } finally {
    // End SQL connection
    await conn.end();
  }
  return 0;
}

main();
