const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient();

async function todos() {
  const params = {
    TableName: process.env.TODO_TABLE,
  };
  try {
    const data = await documentClient.scan(params).promise();
    return data.Items;
  } catch (error) {
    console.log("DynamoDB Error: ", error);
    return null;
  }
}

export default todos;
