const express = require('express');
const path = require('path');
const { open } = require('sqlite');
const sqlite3 = require('sqlite3');
const cors = require('cors');

const app = express();
const dbPath = path.join(__dirname, 'taskManager.db');

let db = null;

const initializeDbAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database
    });

    app.listen(3000, () => {
      console.log('Server is running at http://localhost:3000');
    });
  } catch (e) {
    console.error(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

app.use(cors());  
app.use(express.json());

// Get all tasks
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await db.all('SELECT * FROM tasks');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a task by ID
app.get('/tasks/:id', async (req, res) => {
  try {
    const task = await db.get('SELECT * FROM tasks WHERE id = ?', [req.params.id]);
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new task
app.post('/tasks', async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;
    const result = await db.run('INSERT INTO tasks (title, description, dueDate) VALUES (?, ?, ?)', [title, description, dueDate]);
    const newTask = { id: result.lastID, title, description, dueDate };
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ error: 'Bad Request' });
  }
});

// Update a task
app.put('/tasks/:id', async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;
    const result = await db.run('UPDATE tasks SET title = ?, description = ?, dueDate = ? WHERE id = ?', [title, description, dueDate, req.params.id]);
    if (result.changes > 0) {
      const updatedTask = await db.get('SELECT * FROM tasks WHERE id = ?', [req.params.id]);
      res.json(updatedTask);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Bad Request' });
  }
});

// Delete a task
app.delete('/tasks/:id', async (req, res) => {
  try {
    const result = await db.run('DELETE FROM tasks WHERE id = ?', [req.params.id]);
    if (result.changes > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

initializeDbAndServer();
