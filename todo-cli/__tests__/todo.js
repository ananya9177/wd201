const todoList = require("../todo");

const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();
describe("Todo List Test Suite", () => {
  beforeAll(() => {
    const todays_ = new Date();
    const days_ = 60 * 60 * 24 * 1000;
    [
      {
        title: "do pupil 4th level",
        completed: false,
        dueDate: new Date(todays_.getTime() - 2 * days_).toLocaleDateString("en-CA"),
      },
      {
        title: "do laundry",
        completed: false,
        dueDate: new Date(todays_.getTime() - days_).toLocaleDateString("en-CA"),
      },
      {
        title: "complete javascript course",
        completed: false,
        dueDate: new Date().toLocaleDateString("en-CA"),
      },
      {
        title: "orderin lunch",
        completed: false,
        dueDate: new Date(todays_.getTime() + 2 * days_).toLocaleDateString(
          "en-CA"
        ),
      },
      
    ].forEach(add);
  });
  test("Should add a new todo", () => {
    expect(all.length).toEqual(3);

    add({
      title: "A test item",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });

    expect(all.length).toEqual(4);
  });

  test("Should mark a todo as complete", () => {
    expect(all[0].completed).toEqual(false);
    markAsComplete(0);
    expect(all[0].completed).toEqual(true);
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
