import { FileConfig, Todo } from '@src/types';

import { JSONSchemaType } from 'ajv';
import { OPERATION } from './operation';

// Define JSON schema for the configuration
export const fileConfigSchema: JSONSchemaType<FileConfig> = {
  type: 'object',
  properties: {
    operation: {
      type: 'string',
      enum: [OPERATION.add, OPERATION.read, OPERATION.list, OPERATION.delete, OPERATION.update],
    },
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

// Define schema for validating input data
export const fileInputSchema: JSONSchemaType<Pick<Todo, 'status' | 'title'>[]> = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      title: { type: 'string', nullable: true },
      status: { type: 'number', nullable: true },
      // Additional properties are not allowed
      additionalProperties: false,
    },
  },
};
