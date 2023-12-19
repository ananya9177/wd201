/* eslint-disable no-undef */
const { describe } = require("../TodoModel");
const db = require("../models");

const Jsdate_ = (days) => {
  if(!Number.isInteger(days)){
    throw new Error("pass an integer as days");
  }
  const tod_ = new Date();
  const OneDay_ = 60*60*24*1000;
  return new Date(tod_.getTime() + days *OneDay_);
};

describe("testing",function(){
  beforeAll(async () => {
    await db.sequelize.sync({force:true});
  });

  test("Todo.overdue",async() => {
    await db.Todo.addTask({
      title: "Sample Item",
      dueDate: Jsdate_(-2),
      completed:false
    });
    const items_ = await db.Todo.overdue();
    expect(items_.length).toBe(1);
  });
  
  test("Todo.dueToday",async() => {
    const dueTodayItems_ = await db.Todo.addTask({
      title: "Sample Title",
      dueDate: Jsdate_(0),
      completed:false,
    });
    const items_ = await db.Todo.dueToday();
    expect(items_.length).toBe(dueTodayItems_.length + 1);
  });

  test("Todo.dueLater", async () => {
    const dueLaterItems_ = await db.Todo.dueLater();
    await db.Todo.addTask({
      title: "This is a sample item",
      dueDate: getJSDate(2),
      completed: false,
    });
    const items_ = await db.Todo.dueLater();
    expect(items_.length).toBe(dueLaterItems_.length + 1);
  });

  test("Todo.markAsComplete", async () => {
    const overdueItems_ = await db.Todo.overdue();
    const aTodo_ = overdueItems_[0];
    expect(aTodo_.completed).toBe(false);
    await db.Todo.markAsComplete(aTodo_.id);
    await aTodo_.reload();

    expect(aTodo_.completed).toBe(true);
  });

  test("For a completed past-due item", async () => {
    const overdueItems_ = await db.Todo.overdue();
    const aTodo_ = overdueItems_[0];
    expect(aTodo_.completed).toBe(true);
    const displayValue_ = aTodo_.displayableString();
    expect(displayValue_).toBe(
      `${aTodo_.id}. [x] ${aTodo_.title} ${aTodo_.dueDate}`,
    );
  });

  test("For an incomplete todo in the future", async () => {
    const dueLaterItems_ = await db.Todo.dueLater();
    const aTodo_ = dueLaterItems_[0];
    expect(aTodo_.completed).toBe(false);
    const displayValue_ = aTodo_.displayableString();
    expect(displayValue_).toBe(
      `${aTodo_.id}. [ ] ${aTodo_.title} ${aTodo_.dueDate}`,
    );
  });
  test("For an incomplete todo due today,", async () => {
    const dueTodayItems_ = await db.Todo.dueToday();
    const aTodo_ = dueTodayItems_[0];
    expect(aTodo_.completed).toBe(false);
    const displayValue_ = aTodo_.displayableString();
    expect(displayValue_).toBe(`${aTodo_.id}. [ ] ${aTodo_.title}`);
  });

  test("For a complete todo due today", async () => {
    const dueTodayItems_ = await db.Todo.dueToday();
    const aTodo_ = dueTodayItems_[0];
    expect(aTodo_.completed).toBe(false);
    await db.Todo.markAsComplete(aTodo_.id);
    await aTodo_.reload();
    const displayValue_ = aTodo.displayableString();
    expect(displayValue_).toBe(`${aTodo_.id}. [x] ${aTodo_.title}`);
  });
})
