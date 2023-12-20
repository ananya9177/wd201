"use strict";
const { Model, Op } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static async addTask(params) {
      return Todo.create(params);
    }

    static async showList() {
      console.log("My Todo list \n");

      console.log("Overdue");
      const overdueTodo = await Todo.overdue();
      const formattedOverdueTodo = overdueTodo
        .map((todo) => todo.displayableString())
        .join("\n")
        .trim();
      console.log(formattedOverdueTodo);
      console.log("\n");

      console.log("Due Today");
      const dueTodayTodo = await Todo.dueToday();
      const formattedDueTodayTodo = dueTodayTodo
        .map((todo) => todo.displayableString())
        .join("\n")
        .trim();
      console.log(formattedDueTodayTodo);
      console.log("\n");

      console.log("Due Later");
      const dueLaterTodo = await Todo.dueLater();
      const formattedDueLaterTodo = dueLaterTodo
        .map((todo) => todo.displayableString())
        .join("\n")
        .trim();
      console.log(formattedDueLaterTodo);
    }

    static async overdue() {
      const overdueTodo = await Todo.findAll({
        where: {
          dueDate: { [Op.lt]: new Date() },
        },
      });

      return overdueTodo;
    }

    static async dueToday() {
      const dueTodayTodo = await Todo.findAll({
        where: {
          dueDate: { [Op.eq]: new Date() },
        },
      });

      return dueTodayTodo;
    }

    static async dueLater() {
      const dueLaterTodo = await Todo.findAll({
        where: {
          dueDate: { [Op.gt]: new Date() },
        },
      });

      return dueLaterTodo;
    }

    static async markAsComplete(id) {
      await Todo.update(
        {
          completed: true,
        },
        {
          // eslint-disable-next-line object-shorthand
          where: { id: id },
        }
      );
    }

    displayableString() {
      const checkbox = this.completed ? "[x]" : "[ ]";
      
      return `${this.id}. ${checkbox} ${this.title}${
        String(this.dueDate) === new Date().toISOString().slice(0, 10)
          ? ""
          : " " + this.dueDate
      }`;
    }
    
    static associate(models) {
    }
  }
  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};
