const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// 1. Import your todo router here
const todoRouter = require('./routes/todo.routes');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Todo API running' });
});

// 2. Mount the router — all todo routes will be prefixed with?
app.use('/todos', todoRouter);

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/todos';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('Connection failed:', err);
    process.exit(1);
  });

module.exports = app;