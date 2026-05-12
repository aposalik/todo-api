const express = require('express');
const router = express.Router();
const { getTodoById,getAllTodos, createTodo, updateTodo, deleteTodo } = require('../controllers/todo.controller');


router.get('/', getAllTodos);
router.get('/:id', getTodoById);
router.post('/', createTodo);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);

module.exports = router;
