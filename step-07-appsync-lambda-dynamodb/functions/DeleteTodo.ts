const { DynamoDB } = require("aws-sdk");
const documentClient = new DynamoDB.DocumentClient();

async function deleteTodo(todoId: string) {
  const params = {
    TableName: process.env.TODO_TABLE,
    Key: {
      id: todoId,
    },
  };
  try {
    await documentClient.delete(params).promise();
    return todoId;
  } catch (error) {
    console.log("DynamoDB Error: ", error);
    return null;
  }
}

export default deleteTodo;
