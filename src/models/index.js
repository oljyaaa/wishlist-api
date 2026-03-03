const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

// 1. Модель Користувача
const User = sequelize.define('User', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true }
});

// 2. Модель Бажання (Tasks)
const Task = sequelize.define('Task', {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  status: { 
    type: DataTypes.ENUM('open', 'done'), 
    defaultValue: 'open' 
  },
  priority: { 
    type: DataTypes.INTEGER, 
    validate: { min: 1, max: 5 } 
  }
});

// 3. Модель Файлів (Attachments)
const Attachment = sequelize.define('Attachment', {
  filename: { type: DataTypes.STRING },
  path: { type: DataTypes.STRING },
  mimetype: { type: DataTypes.STRING },
  size: { type: DataTypes.INTEGER }
});

// --- ЗВ'ЯЗКИ (Associations) ---

// User 1 — N Tasks
User.hasMany(Task, { foreignKey: 'userId', onDelete: 'CASCADE' });
Task.belongsTo(User, { foreignKey: 'userId' });

// Task 1 — N Attachments
Task.hasMany(Attachment, { foreignKey: 'taskId', onDelete: 'CASCADE' });
Attachment.belongsTo(Task, { foreignKey: 'taskId' });

module.exports = { sequelize, User, Task, Attachment };