const todoList = () => {
		all = []
		const add = (todoItem) => {
		all.push(todoItem)
		}
		const markAsCompleted = (index) => {
		all[index].completed = true
		}
		
		const overdue = () => {
		return all.filter((item) => item.dueDate < new Date().toLocaleDateString("en-CA")
		);
		};
		
		const dueToday = () => {
		return all.filter(
		(item) => item.dueDate === new Date().toLocaleDateString("en-CA") 
		);
		};
		
		const dueLater = () => {
		return all.filter(
		(item) => item.dueDate > new Date().toLocaleDateString("en-CA")
		);
		};
		return {
		all,
		add,
		markAsCompleted,
		overdue,
		dueToday,
		dueLater,
		};
		};
		
		module.exports = todoList;

