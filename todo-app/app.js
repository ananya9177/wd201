const express = require("express");
const app = express();
const { Todo } = require("./models");
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get("/", function (request, response) {
  response.send("Hello World");
});

// Route to get all todos
app.get("/todos", async function (_request, response) {
  try {
    // Query the database to get a list of all Todos
    const todos = await Todo.findAll();
    return response.json(todos);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to get a todo by ID
app.get("/todos/:id", async function (request, response) {
  try {
    const todo = await Todo.findByPk(request.params.id);
    return response.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

// Route to add a new todo
app.post("/todos", async function (request, response) {
  try {
    const todo = await Todo.addTodo(request.body);
    return response.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

// Route to mark a todo as completed
app.put("/todos/:id/markAsCompleted", async function (request, response) {
  const todo = await Todo.findByPk(request.params.id);
  try {
    const updatedTodo = await todo.markAsCompleted();
    return response.json(updatedTodo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

// Route to delete a todo by ID
app.delete("/todos/:id", async function (request, response) {
  try {
    const todo = await Todo.findByPk(request.params.id);

    if (todo) {
      await todo.destroy();
      // Todo deleted successfully, respond with boolean true
      return response.json(true);
    } else {
      // Todo not found, respond with boolean false
      return response.json(false);
    }
  } catch (error) {
    console.log(error);
    return response.status(500).json(false); // Internal Server Error, respond with boolean false
  }
});



module.exports = app;
