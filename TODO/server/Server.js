// import required modules
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

// create an instance of express application object
const app = express();

// set up middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'public')));

// define database connection
mongoose.connect('mongodb://0.0.0.0:27017/todo-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// create schema for todo items
const todoSchema = new mongoose.Schema({
  task: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

// create a mongoose model for todo items
const Todo = mongoose.model('Todo', todoSchema);

// define routes
// serve the index.html file
// app.get('/', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
// });

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'my-app',"public", 'index.html'));
});

// GET request to fetch all todo items
app.get('/api/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// POST request to add a new todo item
app.post('/api/todos', async (req, res) => {
  try {
    const { task } = req.body;
    const todo = new Todo({
      task,
      completed: false,
    });
    await todo.save();
    res.json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// POST request to update an existing todo item
app.put('/api/todos/:id', async (req, res) => {
  try {
   
    const me = req.body;
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      me
    );
    res.json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// listen for incoming connections from client
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
