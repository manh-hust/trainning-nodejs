import Ajv, { JSONSchemaType } from 'ajv';
import { FileConfig, Todo } from '@src/types';

import { logger } from '@src/commons/logger';

/**
 * Validate JSON file configuration.
 * @param {FileConfig} jsonConfig JSON configuration data.
 * @returns {boolean} Returns a boolean value indicating whether the configuration is valid.
 */
export function validateJsonFileConfig(jsonConfig: FileConfig): boolean {
  const ajv = new Ajv();

  // Define JSON schema for the configuration
  const schema: JSONSchemaType<FileConfig> = {
    type: 'object',
    properties: {
      operation: { type: 'string' },
      id: { type: 'number', nullable: true },
      inputFile: { type: 'string', nullable: true },
      option: {
        type: 'object',
        properties: {
          type: { type: 'string' },
          value: { type: 'string' },
          field: { type: 'string' },
        },
        nullable: true,
        required: ['field', 'value', 'type'],
      },
      outputFile: { type: 'string', nullable: true },
      logFile: { type: 'string', nullable: true },
    },
    // Require the "operation" field
    required: ['operation'],
    additionalProperties: false,
    // Require "id" when operation is DELETE, UPDATE, or READ
    if: {
      anyOf: [
        { properties: { operation: { const: 'DELETE' } } },
        { properties: { operation: { const: 'UPDATE' } } },
        { properties: { operation: { const: 'READ' } } },
      ],
    },
    then: {
      required: ['id'],
    },
    // "id" is not required for other operations
    else: {
      required: [],
    },
  };

  const validate = ajv.compile(schema);

  // Check if the JSON config is valid according to the schema
  if (validate(jsonConfig)) {
    logger.info(jsonConfig);
  } else {
    logger.error(validate.errors);
    return false;
  }

  return true;
}

/**
 * Validates input data for a Todo item.
 * @param {Todo} jsonTodo JSON input data representing a Todo item.
 * @returns {boolean} Returns true if the input data is valid, otherwise false.
 */
export function validateJsonInputFile(jsonTodo: Todo): boolean {
  const ajv = new Ajv();

  // Define schema for validating input data
  const schema: JSONSchemaType<Pick<Todo, 'status' | 'title'>> = {
    type: 'object',
    properties: {
      title: { type: 'string', nullable: true },
      status: { type: 'number', nullable: true },
    },
    // Additional properties are not allowed
    additionalProperties: false,
  };

  const validate = ajv.compile(schema);

  // Check if the input data is valid according to the schema
  if (validate(jsonTodo)) {
    logger.info(jsonTodo);
  } else {
    logger.error(validate.errors);
    return false;
  }

  return true;
}
