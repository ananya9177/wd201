const todoList = require("../todo");

const {
  all,
  markAsComplete,
  add,
  overdue,
  dueToday,
  dueLater,
} = todoList();

describe("Todo List Test Suite", () => {
  beforeEach(() => {
    const currentDate = new Date();
    const oneDayInMilliseconds = 60 * 60 * 24 * 1000;

    const todos = [
      {
        title: "do pupil 4th level",
        completed: false,
        dueDate: new Date(currentDate.getTime() - 4 * oneDayInMilliseconds).toLocaleDateString("en-CA"),
      },
      {
        title: "make christmas presents",
        completed: false,
        dueDate: new Date(currentDate.getTime() - 3 * oneDayInMilliseconds).toLocaleDateString("en-CA"),
      },
      {
        title: "complete javascript course",
        completed: false,
        dueDate: currentDate.toLocaleDateString("en-CA"),
      },
      {
        title: "make a website from scratch",
        completed: false,
        dueDate: new Date(currentDate.getTime() + 3 * oneDayInMilliseconds).toLocaleDateString("en-CA"),
      },
    ];

    todos.forEach(add);
  });

  test("Should add a new todo", () => {
    expect(all.length).toEqual(4);

    add({
      title: "A items testcase",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });

    expect(all.length).toEqual(5);
  });

  test("Should mark a todo as complete", () => {
    expect(all[1].completed).toEqual(false);
    markAsComplete(1);
    expect(all[1].completed).toEqual(true);
  });

  test("Should retrieve overdue items", () => {
    expect(overdue().length).toEqual(2);
  });

  test("Should retrieve due today items", () => {
    expect(dueToday().length).toEqual(2);
  });

  test("Should retrieve due later items", () => {
    expect(dueLater().length).toEqual(1);
  });
});
