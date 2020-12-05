import addTodo from "./AddTodo";
import deleteTodo from "./DeleteTodo";
import checkedTodo from "./UpdateTodo";
import todos from "./ReadTodo";
import Todo from "./Todo";

type AppsyncEvent = {
  info: {
    fieldName: string;
  };
  argument: {
    todoId: string;
    todo: Todo;
  };
};

exports.handler = async (event: AppsyncEvent) => {
  switch (event.info.fieldName) {
    case "addTodo":
      return await addTodo(event.argument.todo);
    case "deleteTodo":
      return await deleteTodo(event.argument.todo.id);
    case "checkedTodo":
      return await addTodo(event.argument.todo);
    case "todos":
      return await todos();
    default:
      return null;
  }
};
