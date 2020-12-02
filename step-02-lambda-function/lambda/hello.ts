import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";

exports.handler = async function (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  console.log("request: ", JSON.stringify(event, undefined, 2));
  return {
    statusCode: 200,
    headers: { "Content-type": "text/plain" },
    body: `Hello, CDK you have hit ${event.path}\n`,
  };
};
