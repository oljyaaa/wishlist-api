const taskService = require('../services/taskService');
const { createTaskSchema } = require('../utils/validators');
const attachmentService = require('../services/attachmentService');

class TaskController {
  
  async create(req, res, next) {
    try {
      const validatedData = createTaskSchema.parse(req.body);
      const task = await taskService.create(validatedData);
      res.status(201).json(task);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const result = await taskService.findAll(req.query);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  // Залишаємо тільки цей метод getOne, бо він розширений (з картинками)
  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const task = await taskService.findById(id);
      
      if (!task) {
        const error = new Error('Бажання не знайдено');
        error.status = 404; // Обов'язково додаємо статус для errorHandler
        throw error;
      }
      
      const attachments = await attachmentService.getByTaskId(id);
      
      // Повертаємо об'єкт задачі разом з масивом вкладень
      res.json({ 
        ...task.toJSON(), 
        attachments 
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const updatedTask = await taskService.update(id, req.body);

      if (!updatedTask) {
        const error = new Error('Бажання не знайдено');
        error.status = 404;
        throw error;
      }

      res.json(updatedTask);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const result = await taskService.delete(id);

      if (!result) {
        const error = new Error('Бажання не знайдено');
        error.status = 404;
        throw error;
      }

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async uploadAttachments(req, res, next) {
  try {
    const { id } = req.params;
    console.log("Шукаємо задачу з ID:", id); // ДЕТЕКТОР 1

    // taskController.js
const task = await taskService.findById(id); // Це шукає запис у таблиці TASKS
    
    if (!task) {
      console.log("ЗАДАЧУ НЕ ЗНАЙДЕНО В БД!"); // ДЕТЕКТОР 2
      const error = new Error('Бажання не знайдено');
      error.status = 404;
      throw error;
    }

    console.log("Завантажені файли:", req.files); // ДЕТЕКТОР 3

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'Файли не завантажено' });
    }

    const attachments = await attachmentService.bulkCreate(req.files, id);
    res.status(201).json({ message: 'ОК', data: attachments });
  } catch (error) {
    next(error);
  }
}
}

module.exports = new TaskController();