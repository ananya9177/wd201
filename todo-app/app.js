const express = require("express");
const app = express();
const { Todo } = require("./models");
var cookieparser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieparser("shh! some secret string"));
app.use(csrf("this_should_be_32_character_long",["POST", "PUT", "DELETE"]));

app.set("view engine","ejs");
app.get("/", async (request, response) =>{
  const allTodos = await Todo.getTodos();
   const overdue_ = await Todo.overdue();
  const dueToday_ = await Todo.dueToday();
  const dueLater_ = await Todo.dueLater();
  const completed_ = await Todo.completed();
  if( request.accepts("html")) {
    response.render("index",{
      allTodos,
      overdue_,
      dueToday_,
      dueLater_,
      completed_,
      csrfToken: request.csrfToken(),
    });
  }else{
    response.json({
      
      allTodos,
      overdue_,
      dueToday_,
      dueLater_,
      completed_
    })
  }
  
});
app.use(express.static(path.join(__dirname,'public')));
app.get("/todos", async function (_request, response) {
  console.log("Processing list of all Todos ...");
  const allTodos = await Todo.getTodos();
  const overdue_ = await Todo.overdue();
  const dueToday_ = await Todo.dueToday();
  const dueLater_ = await Todo.dueLater();
  const completed_ = await Todo.completed();
  if( request.accepts("html")) {
    response.render("index", {
      allTodos,
      overdue_,
      dueToday_,
      dueLater_,
      completed_,
      csrfToken: request.csrfToken(),
    });
  } else {
    response.json({
      allTodos,
      overdue_,
      dueToday_,
      dueLater_,
      completed_
    })
  }
  // FILL IN YOUR CODE HERE
 
});

app.get("/todos/:id", async function (request, response) {
  try {
    const todo = await Todo.findByPk(request.params.id);
    return response.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.post("/todos", async  (request, response) {
  try {
    await Todo.addTodo({
      title: request.body.title,
      dueDate: request.body.dueDate,
    });
    return response.redirect("/");
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.put("/todos/:id", async (request, response) => {
  const todo = await Todo.findByPk(request.params.id);
  try {
    const updatedTodo = await todo.setCompletionStatus(request.body.completed);
    return response.json(updatedTodo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.delete("/todos/:id", async function (request, response) {
  console.log("We have to delete a Todo with ID: ", request.params.id);
  
  // FILL IN YOUR CODE HERE
  try {
    await Todo.remove(request.params.id);
    return response.json({ success: true });
  } catch (error) {
    return response.status(422).json(error);
  }
    

   /* if (todo) {
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
  */

  // First, we have to query our database to delete a Todo by ID.
  // Then, we have to respond back with true/false based on whether the Todo was deleted or not.
  // response.send(true)
});

module.exports = app;
