const { z } = require('zod');

const createTaskSchema = z.object({
  title: z.string().min(3, "Назва має бути довшою за 3 символи"),
  description: z.string().optional(),
  priority: z.number().int().min(1).max(5).default(1),
  userId: z.number().int().positive() // Тимчасово передаємо вручну, поки немає авторизації
});

module.exports = { createTaskSchema };