const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware для парсингу JSON (щоб сервер розумів req.body)
app.use(express.json());
const path = require('path');

// Робимо папку uploads доступною за адресою http://localhost:3000/uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);
app.use(errorHandler);

// Тимчасовий обробник помилок (поки не написали повний)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message || 'Server Error' });
});

module.exports = app;

