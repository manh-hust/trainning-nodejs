import { Option, Todo } from '@src/types';

import TodoService from '@src/services/todo.service';

/**
 * Controller class for handling todo operations.
 */
export default class TodoController {
  private outputFile: string;
  /**
   * Constructs a new TodoController instance.
   * @param {string} outputFile - The path to the output file.
   */
  constructor(outputFile: string) {
    this.outputFile = outputFile;
  }

  /**
   * Retrieves all todo items.
   * @param {Option} option Sorting or filtering options (optional)
   * @returns {Promise<Todo[]>} List of todo items
   */
  public async list(option?: Option): Promise<Todo[]> {
    const items: Todo[] = await TodoService.getList(option);
    TodoService.writeDataToFile('LIST', this.outputFile, items);
    return items;
  }

  /**
   * Retrieves a todo item by its ID.
   * @param {number} id Todo ID
   * @returns {Promise<Todo>} Todo item
   */
  public async read(id: number): Promise<Todo> {
    const item: Todo = await TodoService.getOne(id);
    TodoService.writeDataToFile('READ', this.outputFile, item);
    return item;
  }

  /**
   * Adds a new todo item.
   * @param {Todo} todo New todo item data
   * @returns {Promise<Todo>} Newly added todo item
   */
  public async add(todos: Todo[]): Promise<Todo[]> {
    const newItems: Todo[] = await TodoService.addTodo(todos);
    TodoService.writeDataToFile('ADD', this.outputFile, newItems);

    return newItems;
  }

  /**
   * Updates an existing todo item.
   * @param {number} id Todo ID
   * @param {Todo} todo Todo data to update
   * @returns {Promise<Todo>} Updated todo item
   */
  public async update(id: number, todo: Todo): Promise<Todo> {
    const newItem: Todo = await TodoService.updateTodo(id, todo);
    TodoService.writeDataToFile('UPDATE', this.outputFile, newItem);

    return newItem;
  }

  /**
   * Deletes a todo item by its ID.
   * @param {number} id Todo ID
   * @returns {Promise<string>} Notification message
   */
  public async delete(id: number): Promise<string> {
    const isSuccess: boolean = await TodoService.deleteTodo(id);
    TodoService.writeDataToFile('DELETE', this.outputFile, 'Delete success !');
    return isSuccess ? 'Delete success !' : 'Error';
  }
}
