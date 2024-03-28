import { Option, Todo } from '@src/types';

import { logger } from '@src/commons/logger';
import mysql from 'mysql2/promise';

/**
 * Controller class for handling todo operations.
 */
export default class TodoController {
  private conn;

  /**
   * Constructs a new TodoController instance.
   * @param {mysql.Connection} conn MySQL connection
   */
  public constructor(conn: mysql.Connection) {
    this.conn = conn;
  }

  /**
   * Retrieves all todo items.
   * @param {Option} option Sorting or filtering options (optional)
   * @returns {Promise<Todo[]>} List of todo items
   */
  public async list(option?: Option): Promise<Todo[]> {
    // Default query
    let query: string = 'SELECT * FROM todos';
    switch (option?.type) {
      // Sort by option
      case 'sort':
        query = query + ` ORDER BY ${option.field} ${option.value}`;
        break;
      // Filter by option
      case 'filter':
        query = query + ` WHERE ${option.field} = ${option.value}`;
        break;
      default:
        break;
    }
    const [row] = await this.conn.execute(query);
    return row as Todo[];
  }

  /**
   * Retrieves a todo item by its ID.
   * @param {number} id Todo ID
   * @returns {Promise<Todo>} Todo item
   */
  public async read(id: number): Promise<Todo> {
    const [row] = await this.conn.execute(`SELECT * FROM todos WHERE id = ${id}`);
    return row as Todo;
  }

  /**
   * Adds a new todo item.
   * @param {Todo} todo New todo item data
   * @returns {Promise<Todo>} Newly added todo item
   */
  public async add(todo: Todo): Promise<Todo> {
    // Format current date as MySQL DATETIME
    const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
    // Add new content
    const [row] = await this.conn.execute(`INSERT INTO todos (title, created_at, updated_at) VALUES (?, ?, ?)`, [
      todo?.title,
      currentDate,
      currentDate,
    ]);
    return row as Todo;
  }

  /**
   * Updates an existing todo item.
   * @param {number} id Todo ID
   * @param {Todo} todo Todo data to update
   * @returns {Promise<Todo>} Updated todo item
   */
  public async update(id: number, todo: Todo): Promise<Todo> {
    // Check if the todo with the provided ID exists
    if (!(await this.todoExists(id))) {
      logger.error('Todo ID does not exist.');
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
    // Format current date as MySQL DATETIME
    const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
    // Add updated_at field
    query += ' updated_at = ?,';
    values.push(currentDate);

    // Remove trailing comma and add WHERE clause
    query = query.slice(0, -1) + ' WHERE id = ?;';
    values.push(id);

    // Execute the SQL command
    const [row] = await this.conn.execute(query, values);
    return row as Todo;
  }

  /**
   * Deletes a todo item by its ID.
   * @param {number} id Todo ID
   * @returns {Promise<string>} Notification message
   */
  public async delete(id: number): Promise<string> {
    // Check if the todo with the provided ID exists
    if (!(await this.todoExists(id))) {
      logger.error('Record not found!');
      throw new Error('Record not found!');
    }

    await this.conn.execute(`DELETE FROM todos WHERE id = ${id}`);
    return 'Delete success!';
  }

  /**
   * Checks if a todo with the provided ID exists.
   * @param {number} id Todo ID
   * @returns {Promise<boolean>} Returns true if the todo exists, otherwise false.
   */
  private async todoExists(id: number): Promise<boolean> {
    // Find todo id
    const [result] = await this.conn.execute('SELECT id FROM todos WHERE id = ?;', [id]);
    return Object.values(result).length !== 0;
  }
}
