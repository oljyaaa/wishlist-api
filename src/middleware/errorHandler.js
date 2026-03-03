const { ZodError } = require('zod');

const errorHandler = (err, req, res, next) => {
  console.error(err); // Логуємо в консоль для себе

  // 1. Помилка валідації Zod
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: 'Validation Error',
      details: err.errors.map(e => ({
        field: e.path.join('.'),
        message: e.message
      }))
    });
  }

  // 2. Помилка "Не знайдено" (яку ми кидали вручну)
  if (err.status === 404) {
    return res.status(404).json({ error: err.message });
  }

  // 3. Інші помилки (500)
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
};

module.exports = errorHandler;