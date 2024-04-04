import { Option, Todo } from '@src/types';

import { connection } from '@src/database';
import { writeFile } from '@src/utils/write-file';

/**
 * Handle todo controller logic.
 */
export default class TodoService {
  /**
   * Retrieve a list of todo based on the provided options.
   * @param option An optional object containing sorting or filtering options.
   * @returns A Promise that resolves to an array of Todo objects.
   */
  static async getList(option?: Option): Promise<Todo[]> {
    let query: string = 'SELECT * FROM todos';

    // Build query based on options
    switch (option?.type) {
      case 'sort':
        query = this.addSortQuery(query, option.field, option.value);
        break;
      case 'filter':
        if (option.field === 'name') {
          query = this.addFilterByNameQuery(query, option.value);
        } else {
          query = this.addFilterQuery(query, option.field, option.value);
        }
        break;
      default:
        break;
    }

    // Execute query and retrieve rows
    const [row] = await connection.execute(query);
    return row as Todo[];
  }

  /**
   * Retrieve a single todo by its ID.
   * @param id The ID of the todo to retrieve.
   * @returns A Promise that resolves to a single Todo object.
   */
  static async getOne(id: number): Promise<Todo> {
    // Execute query to retrieve todo with specific ID
    const [row] = await connection.execute(`SELECT * FROM todos WHERE id = ?`, [id]);
    return row as Todo;
  }

  /**
   * Add multiple todos to the database.
   * @param todos An array of Todo objects to add.
   * @returns A Promise that resolves to an array of added Todo objects.
   */
  static async addTodo(todos: Todo[]): Promise<Todo[]> {
    // Extract titles from todos array
    const titles = todos.map((todo) => todo.title);

    // Construct the query with multiple value placeholders
    const placeholders = todos.map(() => '(?)').join(',');

    // Execute the single insert query with multiple values
    const [rows] = await connection.execute(`INSERT INTO todos (title) VALUES ${placeholders}`, titles);

    return rows as Todo[];
  }

  /**
   * Update a todo with the provided ID.
   * @param id The ID of the todo to update.
   * @param todo An object representing the updated todo.
   * @returns A Promise that resolves to the updated Todo object.
   */
  static async updateTodo(id: number, todo: Todo): Promise<Todo> {
    // Check if the todo with the provided ID exists
    if (!(await this.isExists(id))) {
      throw new Error('Todo ID does not exist');
    }

    // Construct the SQL command to update the database
    let query = `UPDATE todos SET`;
    const values: unknown[] = [];
    if (todo.title !== undefined) {
      query += ' title = ?,';
      values.push(todo.title);
    }
    if (todo.status !== undefined) {
      query += ' status = ?,';
      values.push(todo.status);
    }
    // Remove trailing comma and add WHERE clause
    query = query.slice(0, -1) + ' WHERE id = ?;';
    values.push(id);

    // Execute the SQL command
    const [row] = await connection.execute(query, values);
    return row as Todo;
  }

  /**
   * Delete a todo with the provided ID.
   * @param id The ID of the todo to delete.
   * @returns A Promise that resolves to a boolean indicating whether the deletion was successful.
   */
  static async deleteTodo(id: number): Promise<boolean> {
    // Check if the todo with the provided ID exists
    if (!(await this.isExists(id))) {
      throw new Error('Record not found!');
    }

    // Execute SQL command to delete the todo
    await connection.execute(`DELETE FROM todos WHERE id = ?`, [id]);

    return true;
  }

  /**
   * Writes data to a file with a timestamp and action description.
   * @param action Action description to be logged.
   * @param file File path to write data to.
   * @param data Data to be written.
   */
  static writeDataToFile<T>(action: string, file: string, data: T): void {
    // Create a timestamp with current date and time
    const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');

    // Format the log entry with timestamp, action description, and data
    const logEntry = `${timestamp}  ${action} ${JSON.stringify(data)}`;

    // Write the log entry to the specified file
    writeFile(file, logEntry);
  }

  /**
   * Check if a todo with the provided ID exists in the database.
   * @param id The ID of the todo to check for existence.
   * @returns A Promise that resolves to a boolean indicating whether the todo exists.
   */
  private static async isExists(id: number): Promise<boolean> {
    // Execute SQL command to check if the todo with the provided ID exists
    const [result] = await connection.execute('SELECT id FROM todos WHERE id = ?;', [id]);

    // Return true if the result contains any rows, indicating existence of the todo
    return Object.values(result).length !== 0;
  }

  /**
   * Add sorting condition to the SQL query.
   * @param query The SQL query to which the sorting condition will be added.
   * @param field The field by which to sort.
   * @param value The sorting order (ASC or DESC).
   * @returns The updated SQL query with the sorting condition.
   */
  private static addSortQuery(query: string, field: string, value: string): string {
    return query + ` ORDER BY ${field} ${value}`;
  }

  /**
   * Add filtering condition to the SQL query.
   * @param query The SQL query to which the filtering condition will be added.
   * @param field The field by which to filter.
   * @param value The value to filter by.
   * @returns The updated SQL query with the filtering condition.
   */
  private static addFilterQuery(query: string, field: string, value: string): string {
    return query + ` WHERE ${field} = ${value}`;
  }

  /**
   * Add filtering condition by name to the SQL query.
   * @param query The SQL query to which the filtering condition will be added.
   * @param value The value to filter by name.
   * @returns The updated SQL query with the filtering condition by name.
   */
  private static addFilterByNameQuery(query: string, value: string): string {
    return query + ` WHERE name LIKE '%${value}%'`;
  }
}
