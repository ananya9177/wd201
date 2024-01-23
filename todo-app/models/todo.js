"use strict";
const { Model } = require("sequelize");
const { Op } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    static addTodo({ title, dueDate }) {
      return this.create({ title: title, dueDate: dueDate, completed: false });
    }

    static getTodos(){
      return this.findAll();
    }

       static async remove(id) {
      return this.destroy({
        where: {
          id,
        },
      });
    }

    setCompletionStatus(complete) {
      const status_ = !complete;
      return this.update({ completed: status_ });
    }

    static async overdue() {
      const d = new Date();
      return await Todo.findAll({
        where: {
          dueDate: { [Op.lt]: d, },
          completed: false,
        },
      })
    }

    static async dueToday() {
      const d = new Date()
      return await Todo.findAll({
        where: {
          dueDate: { [Op.eq]: d, },
          completed: false,
        }
      })
    }

    static async dueLater() {
      return await Todo.findAll({
        where: {
          dueDate: { [Op.gt]: new Date(), },
          completed: false,
        }
      })
    }

    static async completed() {
      return this.findAll({
        where: {
          completed: true,
        }
      })
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
