import Ajv, { JSONSchemaType } from 'ajv';

import { logger } from '@src/commons/logger';

/**
 * Validates a JSON object against a JSON schema using Ajv library.
 * @param schema The JSON schema to validate against.
 * @param jsonObject The JSON object to validate.
 * @returns True if the JSON object is valid according to the schema, otherwise false.
 */
export function validateJsonFile<T>(schema: JSONSchemaType<T>, jsonObject: T): boolean {
  const ajv = new Ajv();
  // Init schema validator
  const validate = ajv.compile(schema);
  // Validate the JSON object against the schema
  if (validate(jsonObject)) {
    // Log the validated JSON object if it passes validation
    logger.info(jsonObject);
  } else {
    // Log validation errors if the JSON object fails validation
    logger.error(validate.errors);
    return false;
  }

  return true;
}
