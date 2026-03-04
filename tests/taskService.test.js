const taskService = require('../src/services/taskService');
const { Task } = require('../src/models');

jest.mock('../src/models', () => ({
  Task: {
    create: jest.fn(),
    findAndCountAll: jest.fn(),
    findByPk: jest.fn(),
    update: jest.fn(),
  },
}));

describe('Unit-тести для TaskService', () => {

  test('Має успішно створити нове бажання', async () => {
    const mockData = { title: 'iPhone 17', userId: 1 };
    Task.create.mockResolvedValue({ id: 1, ...mockData });

    const result = await taskService.create(mockData);

    expect(result.title).toBe('iPhone 17');
    expect(Task.create).toHaveBeenCalledWith(mockData);
  });

  test('Має викликати findAll з правильними фільтрами', async () => {
    Task.findAndCountAll.mockResolvedValue({ count: 1, rows: [] });

    await taskService.findAll({ status: 'open', priority: 5 });
    expect(Task.findAndCountAll).toHaveBeenCalled();
  });

  test('Має повернути null, якщо бажання для оновлення не знайдено', async () => {
    Task.findByPk.mockResolvedValue(null);

    const result = await taskService.update(999, { status: 'done' });

    expect(result).toBeNull();
  });
});