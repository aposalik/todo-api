const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,        // what JS type maps to text?
      required: [true, 'Title is required'],
      trim: true,            // removes whitespace from both ends
    },
    completed: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
  },
  {
    timestamps: true,        // ← what do you think this does automatically?
  }
);

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;