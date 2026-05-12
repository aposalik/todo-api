const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,        // what JS type maps to text?
      required: [true, 'Title is required'],
      trim: true,            // removes whitespace from both ends
    },
    completed: {
      type: Boolean,        // done or not done — two states
      default: false,     // a new todo is finished or not finished by default?
    },
  },
  {
    timestamps: true,        // ← what do you think this does automatically?
  }
);

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;