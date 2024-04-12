import { Option, Todo } from '@src/types';

import TodoService from '@src/services/todo.service';
import { connection } from '@src/database';

// Mock database module
jest.mock('@src/database', () => ({
  initializeConnection: jest.fn(),
  closeConnection: jest.fn(),
  connection: {
    execute: jest.fn(),
  },
}));

// Test case for Todo service
describe('TodoService', () => {
  describe('Normal cases', () => {
    test('[getList-1]. Should return a list of todo with options if filter status option are provided', async () => {
      // Mock database query result for test case 1
      (connection.execute as jest.Mock).mockResolvedValueOnce([
        [
          {
            id: 10,
            title: 'Task 138',
            status: 1,
            created_at: new Date('2024-04-03T21:24:43.000Z'),
            updated_at: new Date('2024-04-03T21:24:43.000Z'),
          },
        ],
      ]);
      // Filter option
      const option: Option = {
        type: 'filter',
        field: 'status',
        value: '1',
      };
      // Expect data with filter option
      const expectData = [
        {
          id: 10,
          title: 'Task 138',
          status: 1,
          created_at: new Date('2024-04-03T21:24:43.000Z'),
          updated_at: new Date('2024-04-03T21:24:43.000Z'),
        },
      ];
      const result = await TodoService.getList(option);
      expect(result).toEqual(expectData);
    });

    test('[getList-2]. Should return a list of todo with options if like query option are provided', async () => {
      // Mock database query result for test case 1
      (connection.execute as jest.Mock).mockResolvedValueOnce([
        [
          {
            id: 10,
            title: 'Task 138',
            status: 1,
            created_at: new Date('2024-04-03T21:24:43.000Z'),
            updated_at: new Date('2024-04-03T21:24:43.000Z'),
          },
        ],
      ]);
      // Filter option
      const option: Option = {
        type: 'filter',
        field: 'title',
        value: 'home',
      };
      // Expect data with filter option
      const expectData = [
        {
          id: 10,
          title: 'Task 138',
          status: 1,
          created_at: new Date('2024-04-03T21:24:43.000Z'),
          updated_at: new Date('2024-04-03T21:24:43.000Z'),
        },
      ];
      const result = await TodoService.getList(option);
      expect(result).toEqual(expectData);
    });

    test('[getList-3]. Should return a list of todo with options if sort option are provided', async () => {
      // Mock database query result for test case 2
      (connection.execute as jest.Mock).mockResolvedValueOnce([
        [
          {
            id: 8,
            title: 'Homework',
            status: 0,
            created_at: new Date('2024-04-04 03:44:18.000Z'),
            updated_at: new Date('2024-04-04 03:44:18.000Z'),
          },
          {
            id: 9,
            title: 'Football',
            status: 0,
            created_at: new Date('2024-04-05 03:44:18.000Z'),
            updated_at: new Date('2024-04-04 03:44:18.000Z'),
          },
        ],
      ]);

      // Filter file query option
      const option: Option = {
        type: 'sort',
        field: 'created_at',
        value: 'ASC',
      };
      // Expect data with filter option
      const expectData = [
        {
          id: 8,
          title: 'Homework',
          status: 0,
          created_at: new Date('2024-04-04 03:44:18.000Z'),
          updated_at: new Date('2024-04-04 03:44:18.000Z'),
        },
        {
          id: 9,
          title: 'Football',
          status: 0,
          created_at: new Date('2024-04-05 03:44:18.000Z'),
          updated_at: new Date('2024-04-04 03:44:18.000Z'),
        },
      ];
      const result = await TodoService.getList(option);
      expect(result).toEqual(expectData);
    });

    test('[getList-4]. Should return a list of todo without options if option are not provided', async () => {
      // Mock database query result for test case 2
      (connection.execute as jest.Mock).mockResolvedValueOnce([
        [
          {
            id: 8,
            title: 'Homework',
            status: 0,
            created_at: new Date('2024-04-04 03:44:18.000Z'),
            updated_at: new Date('2024-04-04 03:44:18.000Z'),
          },
          {
            id: 9,
            title: 'Football',
            status: 0,
            created_at: new Date('2024-04-05 03:44:18.000Z'),
            updated_at: new Date('2024-04-04 03:44:18.000Z'),
          },
        ],
      ]);

      // Expect data with filter option
      const expectData = [
        {
          id: 8,
          title: 'Homework',
          status: 0,
          created_at: new Date('2024-04-04 03:44:18.000Z'),
          updated_at: new Date('2024-04-04 03:44:18.000Z'),
        },
        {
          id: 9,
          title: 'Football',
          status: 0,
          created_at: new Date('2024-04-05 03:44:18.000Z'),
          updated_at: new Date('2024-04-04 03:44:18.000Z'),
        },
      ];
      const result = await TodoService.getList();
      expect(result).toEqual(expectData);
    });

    test('[getOne-1]. Should return a todo if provide todo id', async () => {
      // Mock database query result for test case get one todo
      (connection.execute as jest.Mock).mockResolvedValueOnce([
        {
          id: 10,
          title: 'Task 138',
          status: 1,
          created_at: new Date('2024-04-03T21:24:43.000Z'),
          updated_at: new Date('2024-04-03T21:24:43.000Z'),
        },
      ]);
      // Expect data with todo id = 10
      const expectData = {
        id: 10,
        title: 'Task 138',
        status: 1,
        created_at: new Date('2024-04-03T21:24:43.000Z'),
        updated_at: new Date('2024-04-03T21:24:43.000Z'),
      };
      const result = await TodoService.getOne(10);
      expect(result).toEqual(expectData);
    });

    test('[addTodo-1]. Should return new todo id if provide list todo title', async () => {
      // Mock database query result for test case add new todo
      (connection.execute as jest.Mock).mockResolvedValueOnce([
        {
          fieldCount: 0,
          affectedRows: 0,
          insertId: 100,
          info: '',
          serverStatus: 10,
          warningStatus: 0,
          changedRows: 0,
        },
      ]);
      // New list title todo
      const todo: Todo[] = [
        {
          title: 'Homework',
        },
        {
          title: 'Football',
        },
      ];

      const result = await TodoService.addTodo(todo);
      expect(result).toEqual(100);
    });

    test('[updateTodo-1]. Should return updated todo id if provide new todo info', async () => {
      // Mock database query result for test case update todo
      (connection.execute as jest.Mock).mockResolvedValue([
        {
          fieldCount: 0,
          affectedRows: 1,
          insertId: 0,
          info: 'Rows matched: 1  Changed: 0  Warnings: 0',
          serverStatus: 2,
          warningStatus: 0,
          changedRows: 0,
        },
      ]);
      // New todo info
      const todo: Todo = {
        title: 'Homework',
        status: 2,
      };

      const result = await TodoService.updateTodo(100, todo);
      expect(result).toEqual(100);
    });

    test('[deleteTodo-1]. Should return true if delete success', async () => {
      // Mock database query result for test case delete todo
      (connection.execute as jest.Mock).mockResolvedValueOnce([
        {
          fieldCount: 0,
          affectedRows: 1,
          insertId: 0,
          info: 'Rows matched: 1  Changed: 0  Warnings: 0',
          serverStatus: 2,
          warningStatus: 0,
          changedRows: 0,
        },
      ]);
      const result = await TodoService.deleteTodo(100);
      expect(result).toEqual(true);
    });

    test('[isExists-1]. Should return true if todo exist', async () => {
      // Mock database query result for test case check todo exist
      (connection.execute as jest.Mock).mockResolvedValueOnce([
        {
          id: 100,
        },
      ]);
      const result = await TodoService.isExists(100);
      expect(result).toBeTruthy();
    });
  });

  describe('Error cases', () => {
    test('[updateTodo-1]. Should throw error if todo not exist', async () => {
      // Mock database query result for test case update todo
      (connection.execute as jest.Mock).mockResolvedValue([[]]);
      // New todo info
      const todo: Todo = {
        title: 'Homework',
        status: 2,
      };
      await expect(TodoService.updateTodo(100, todo)).rejects.toThrow('Todo ID does not exist');
    });

    test('[updateTodo-2]. Should throw error if update error occurred', async () => {
      // Mock database query result for test case update todo
      (connection.execute as jest.Mock).mockResolvedValue([
        {
          fieldCount: 0,
          affectedRows: 0,
          insertId: 0,
          info: 'Rows matched: 1  Changed: 0  Warnings: 0',
          serverStatus: 2,
          warningStatus: 0,
          changedRows: 0,
        },
      ]);
      // New todo info
      const todo: Todo = {
        title: 'Homework',
        status: 2,
      };
      await expect(TodoService.updateTodo(100, todo)).rejects.toThrow('Update todo failed');
    });

    test('[deleteTodo-1]. Should throw error if todo not exist', async () => {
      // Mock database query result for test case delete todo
      (connection.execute as jest.Mock).mockResolvedValueOnce([[]]);
      await expect(TodoService.deleteTodo(100)).rejects.toThrow('Record not found!');
    });

    test('[isExists-1]. Should return false if todo not exist', async () => {
      // Mock database query result for test case check todo exist
      (connection.execute as jest.Mock).mockResolvedValueOnce([[]]);
      const result = await TodoService.isExists(100);
      expect(result).toBeFalsy();
    });
  });
});
