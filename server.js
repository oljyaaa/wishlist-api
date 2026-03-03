require('dotenv').config();
const app = require('./src/app');
const { sequelize } = require('./src/models');

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    // sync({ alter: true }) оновлює таблиці, якщо ти змінив модель
    await sequelize.sync({ alter: true });
    // await sequelize.sync({ force: true });
    console.log('✅ База даних синхронізована');
    
    app.listen(PORT, () => {
      console.log(`🚀 Сервер запущено на порту ${PORT}`);
    });
  } catch (e) {
    console.error('❌ Помилка запуску:', e);
  }
};

start();