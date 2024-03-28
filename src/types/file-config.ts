/**
 * Option to filter/sort if list tasks
 * @prop {type} type is filter or sort
 * @prop {field} field needs sort or filter
 * @prop {value} implementation value
 */
export interface Option {
  type: string;
  field: string;
  value: string;
}

/**
 * Define config file
 * @prop {operation}
 * @prop {id} todo task id (read/delete)
 * @prop {inputFile} input file (task content that needs to be add/update)
 * @prop {option} option to filter/sort if list tasks
 * @prop {outputFile} output path (if specified, export result to file)
 * @prop {logFile} path run log/error log
 */
export default interface FileConfig {
  operation: string;
  id?: number;
  inputFile?: string;
  option?: Option;
  outputFile?: string;
  logFile?: string;
}
