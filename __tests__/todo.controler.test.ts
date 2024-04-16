import { Todo } from '@src/types';
import TodoController from '@src/controllers/todo.controller';
import TodoService from '@src/services/todo.service';

// Mock todo service
jest.mock('@src/services/todo.service', () => ({
  getList: jest.fn(),
  getOne: jest.fn(),
  addTodo: jest.fn(),
  updateTodo: jest.fn(),
  deleteTodo: jest.fn(),
  isExists: jest.fn(),
}));
// Provide mock types for mocked methods
const mockTodoService = TodoService as jest.Mocked<typeof TodoService>;
// Init TodoController
const todoController = new TodoController();

// Test case for Todo controller
describe('TodoController', () => {
  // Test case for list method
  describe('list', () => {
    test('[1]. Should return a list of todo', async () => {
      // Mock data result for list test case
      const expectData = [
        {
          id: 8,
          title: 'Homework',
          status: 0,
          created_at: new Date('2024-04-04 03:44:18.000Z'),
          updated_at: new Date('2024-04-04 03:44:18.000Z'),
        },
        {
          id: 10,
          title: 'Task 138',
          status: 1,
          created_at: new Date('2024-04-03T21:24:43.000Z'),
          updated_at: new Date('2024-04-03T21:24:43.000Z'),
        },
      ];
      mockTodoService.getList.mockResolvedValue(expectData);

      const result = await todoController.list();
      expect(result).toEqual(expectData);
    });
  });
  // Test case for read method
  describe('read', () => {
    test('[1]. Should return a todo', async () => {
      // Mock data result for read test case
      const expectData = {
        id: 8,
        title: 'Homework',
        status: 0,
        created_at: new Date('2024-04-04 03:44:18.000Z'),
        updated_at: new Date('2024-04-04 03:44:18.000Z'),
      };
      mockTodoService.getOne.mockResolvedValue(expectData);

      const result = await todoController.read(8);
      expect(result).toEqual(expectData);
    });
  });
  // Test case for add method
  describe('add', () => {
    test('[1]. Should return new todo id', async () => {
      // Mock data result for list test case
      const expectData = 100;
      mockTodoService.addTodo.mockResolvedValue(expectData);

      const todo: Todo[] = [{ title: 'Football' }];
      const result = await todoController.add(todo);
      expect(result).toEqual(expectData);
    });
  });
  // Test case for update method
  describe('update', () => {
    test('[1]. Should return todo id', async () => {
      // Mock data result for list test case
      const expectData = 100;
      mockTodoService.updateTodo.mockResolvedValue(expectData);

      const todo: Todo = { title: 'Football', status: 2 };
      const result = await todoController.update(100, todo);
      expect(result).toEqual(expectData);
    });
  });
  // Test case for list method
  describe('delete', () => {
    test('[1]. Should return boolean if delete success', async () => {
      // Mock data result for list test case
      mockTodoService.deleteTodo.mockResolvedValue(true);

      const result = await todoController.delete(100);
      expect(result).toBeTruthy();
    });
  });
});
