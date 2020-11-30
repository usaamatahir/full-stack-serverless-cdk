exports.handler = async function (event: any) {
  console.log("request: ", JSON.stringify(event, undefined, 2));
  return {
    statusCode: 200,
    headers: { "Content-type": "text/plain" },
    body: `Hello, CDK you have hit ${event.path}\n`,
  };
};
