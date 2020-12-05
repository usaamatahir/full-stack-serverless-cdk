const { DynamoDB } = require("aws-sdk");
const documentClient = new DynamoDB.DocumentClient();
import Todo from "./Todo";

type Params = {
  TableName: string | undefined;
  Key: string | {};
  ExpressionAttributeValues: any;
  UpdateExpression: string;
  ReturnValues: string;
};

async function checkedTodo(todo: Todo) {
  const params: Params = {
    TableName: process.env.TODO_TABLE,
    Key: {
      id: todo.id,
      task: todo.task,
    },
    ExpressionAttributeValues: {
      ":d": !todo.done,
    },
    UpdateExpression: "set done = :d",
    ReturnValues: "Updated_New",
  };

  try {
    await documentClient.update(params).promise();
    return todo;
  } catch (error) {
    console.log("DynamoDB Error: ", error);
    return null;
  }
}

export default checkedTodo;
