const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient();
import Todo from "./Todo";

async function addTodo(todo: Todo) {
  const params = {
    TableName: process.env.TODO_TABLE,
    Item: todo,
  };
  try {
    await documentClient.put(params).promise();
    return todo;
  } catch (error) {
    console.log("DynamoDB Error: ", error);
    return null;
  }
}

export default addTodo;
