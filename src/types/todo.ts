/**
 * Interface representing a Todo item.
 * @interface Todo
 * @property {number} [id] - The unique identifier of the Todo item.
 * @property {string} [title] - The title of the Todo item.
 * @property {number} [status] - The status of the Todo item.
 * @property {Date} [created_at] - The date and time when the Todo item was created.
 * @property {Date} [updated_at] - The date and time when the Todo item was last updated.
 */
export default interface Todo {
  id?: number;
  title?: string;
  status?: number;
  created_at?: Date;
  updated_at?: Date;
}
