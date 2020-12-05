import * as cdk from "@aws-cdk/core";
import * as appsync from "@aws-cdk/aws-appsync";
import * as db from "@aws-cdk/aws-dynamodb";
import * as lambda from "@aws-cdk/aws-lambda";

export class Step07AppsyncLambdaDynamodbStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // =============================================================================================
    // DEFINING APPSYNC API CONSTRUCT
    // =============================================================================================

    const todosApi = new appsync.GraphqlApi(this, "AppsyncGraphqlApi", {
      name: "todos_appsync_api",
      schema: appsync.Schema.fromAsset("graphql/schema.graphql"),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY,
          apiKeyConfig: {
            expires: cdk.Expiration.after(cdk.Duration.days(365)),
          },
        },
      },
      xrayEnabled: true,
    });

    // =============================================================================================
    // DEFINING LMABDA CONSTRUCT
    // =============================================================================================

    const todosLambda = new lambda.Function(this, "TodosLambda", {
      runtime: lambda.Runtime.NODEJS_10_X,
      handler: "main.handler",
      code: lambda.Code.fromAsset("functions"),
      memorySize: 1024,
    });

    // =============================================================================================
    // DEFINING DATASOURCE
    // =============================================================================================

    const dataSource = todosApi.addLambdaDataSource(
      "LambdaDataSource",
      todosLambda
    );

    // =============================================================================================
    // DEFINING RESOLVER
    // =============================================================================================

    dataSource.createResolver({
      typeName: "Query",
      fieldName: "todos",
    });

    dataSource.createResolver({
      typeName: "Mutation",
      fieldName: "addTodo",
    });

    dataSource.createResolver({
      typeName: "Mutation",
      fieldName: "checkedTodo",
    });

    dataSource.createResolver({
      typeName: "Mutation",
      fieldName: "deleteTodo",
    });

    // =============================================================================================
    // DEFINING DYNAMODB TABLE
    // =============================================================================================

    const todosTable = new db.Table(this, "TodosTable", {
      partitionKey: {
        name: "TODOS",
        type: db.AttributeType.STRING,
      },
    });

    todosTable.grantFullAccess(todosLambda);
    todosLambda.addEnvironment("TODO_TABLE", todosTable.tableName);

    // =============================================================================================
    // SHOWING OUTPUTS IN CONSOLE
    // =============================================================================================

    new cdk.CfnOutput(this, "GraphQLAPIURL", {
      value: todosApi.graphqlUrl,
    });

    new cdk.CfnOutput(this, "RegionName", {
      value: this.region,
    });
  }
}
