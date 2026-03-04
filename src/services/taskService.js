const { Task, User } = require('../models');
const { Op } = require('sequelize');

class TaskService {
  
  // Створення бажання
  async create(data) {
    return await Task.create(data);
  }

  // Отримання з фільтрами, сортуванням та пагінацією
  async findAll(filters) {
    const { 
      status, priority, search, 
      sort = 'createdAt', order = 'DESC', 
      page = 1, limit = 10 
    } = filters;

    const where = {};
    
    if (status) where.status = status;
    if (priority) where.priority = priority;
    if (search) {
      where[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } }
      ];
    }

    // 2. Пагінація
    const offset = (page - 1) * limit;

    // 3. Запит до БД
    return await Task.findAndCountAll({
      where,
      order: [[sort, order.toUpperCase()]],
      limit: parseInt(limit),
      offset: parseInt(offset),
      // include: [{ model: User, attributes: ['name'] }] // Можна додати автора
    });
  }

  // Знайти одне за ID
  async findById(id) {
    return await Task.findByPk(id);
  }

  // Оновити
  async update(id, data) {
    const task = await this.findById(id);
    if (!task) return null; 
    
    return await task.update(data);
  }

  // Видалити
  async delete(id) {
    const task = await this.findById(id);
    if (!task) return null;

    await task.destroy();
    return true;
  }
}

module.exports = new TaskService();