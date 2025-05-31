const express = require('express');
const app = express();

app.use(express.json());

let todos = [];
let id = 1;

// Get all todos
app.get('/todos', (req, res) => {
    res.json(todos);
});

// Add new todo
app.post('/todos', (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }
    const todo = { id: id++, title, completed: false };
    todos.push(todo);
    res.status(201).json(todo);
});

// Update todo
app.put('/todos/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    const { title, completed } = req.body;
    const todo = todos.find(t => t.id === todoId);
    if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    if (title !== undefined) todo.title = title;
    if (completed !== undefined) todo.completed = completed;
    res.json(todo);
});

// Delete todo
app.delete('/todos/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    const index = todos.findIndex(t => t.id === todoId);
    if (index === -1) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    todos.splice(index, 1);
    res.status(204).send();
});

module.exports = app;