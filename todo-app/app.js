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
    // Find the Todo by ID
    const todo = await Todo.findByPk(request.params.id);

    // If the Todo is found, delete it
    if (todo) {
      await todo.destroy();
      return response.json({ success: true, message: "Todo deleted successfully" });
    } else {
      // If the Todo with the specified ID is not found
      return response.status(404).json({ success: false, message: "Todo not found" });
    }
  } catch (error) {
    console.log(error);
    return response.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = app;
