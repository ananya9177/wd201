const todoList = require("../todo");

const { all, markAsComplete, add, overdue, dueToday, dueLater, remove } = todoList();

describe("Todo List Test Suite", () => {
  beforeAll(() => {
    const todaysDate = new Date();
    const oneDayInMilliseconds = 60 * 60 * 24 * 1000;

    const todos = [
      {
        title: "do pupil 4th level",
        completed: false,
        dueDate: new Date(todaysDate.getTime() - 4 * oneDayInMilliseconds).toLocaleDateString("en-CA"),
      },
      {
        title: "do laundry",
        completed: false,
        dueDate: new Date(todaysDate.getTime() - 3 * oneDayInMilliseconds).toLocaleDateString("en-CA"),
      },
      {
        title: "complete javascript course",
        completed: false,
        dueDate: todaysDate.toLocaleDateString("en-CA"),
      },
      {
        title: "make a website from scratch",
        completed: false,
        dueDate: new Date(todaysDate.getTime() + 3 * oneDayInMilliseconds).toLocaleDateString("en-CA"),
      },
    ];

    todos.forEach(add);
  });

  test("Should add a new todo", () => {
    expect(all.length).toEqual(4);

    add({
      title: "A testcase",
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

  test("Should remove a todo", () => {
    const initialLength = all.length;
    remove(0); // Removing the first todo
    expect(all.length).toEqual(initialLength - 1);
  });
});
