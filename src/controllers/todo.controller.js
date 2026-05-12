const Todo = require('../models/todo.model');

// GET /todos — get all todos
exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find(); 
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /todos — create a new todo
exports.createTodo = async (req, res) => {
  try {
    const todo = await Todo.create({
      title: req.body.title,    // what field are we expecting from the request?
    });
    res.status(201).json(todo); 
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET /todos/:id — get one todo
exports.getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id); // mongoose find by id method
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /todos/:id — update a todo
exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,  // what fields are we expecting from the request?
      { new: true, runValidators: true }  // new:true returns updated doc
    );
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    res.json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE /todos/:id — delete a todo
exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id); // mongoose delete by id method
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    res.status(200).json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};