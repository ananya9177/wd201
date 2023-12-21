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
        dueDate: new Date(todays_.getTime() - 4 * days_).toLocaleDateString("en-CA"),
      },
      {
        title: "do laundry",
        completed: false,
        dueDate: new Date(todays_.getTime() - 3 * days_).toLocaleDateString("en-CA"),
      },
      {
        title: "complete javascript course",
        completed: false,
        dueDate: new Date().toLocaleDateString("en-CA"),
      },
      {
        title: "make a website from scratch",
        completed: false,
        dueDate: new Date(todays_.getTime() + 3 * days_).toLocaleDateString(
          "en-CA"
        ),
      },
      
    ].forEach(add);
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
});
