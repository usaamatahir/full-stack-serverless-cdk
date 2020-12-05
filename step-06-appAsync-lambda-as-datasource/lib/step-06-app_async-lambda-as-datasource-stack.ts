import * as cdk from "@aws-cdk/core";
import * as appsync from "@aws-cdk/aws-appsync";
import * as lambda from "@aws-cdk/aws-lambda";

export class Step06AppAsyncLambdaAsDatasourceStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // =============================================================================================
    // APPASYNC WILL YOU A GRAPHQL API WITH AN API KEY
    // =============================================================================================

    const api = new appsync.GraphqlApi(this, "Api", {
      name: "cdk-blog-appsync-api",
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

    new cdk.CfnOutput(this, "GraphQLURL", {
      value: api.graphqlUrl,
    });

    new cdk.CfnOutput(this, "GraphQLKey", {
      value: api.apiKey || "",
    });

    // =============================================================================================
    // DEFINE A LAMBDA CONSTRUCT
    // =============================================================================================

    const lambdaFunction = new lambda.Function(this, "LambdaFunction", {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset("lambda"),
      handler: "index.handler",
      timeout: cdk.Duration.seconds(10) || undefined,
    });

    // =============================================================================================
    // SET LAMBDA AS DATA SOURCE
    // =============================================================================================

    const dataSource = api.addLambdaDataSource("DataSource", lambdaFunction);

    dataSource.createResolver({
      typeName: "Query",
      fieldName: "records",
    });

    dataSource.createResolver({
      typeName: "Query",
      fieldName: "getRecordById",
    });
  }
}
