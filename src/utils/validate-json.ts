import Ajv, { JSONSchemaType } from 'ajv';

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
  if (!validate(jsonObject)) {
    return false;
  }

  return true;
}
