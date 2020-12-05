import * as cdk from "@aws-cdk/core";
import * as appsync from "@aws-cdk/aws-appsync";
import * as db from "@aws-cdk/aws-dynamodb";
import * as lambda from "@aws-cdk/aws-lambda";
import * as s3 from "@aws-cdk/aws-s3";
import * as s3deploy from "@aws-cdk/aws-s3-deployment";
import * as cloudfront from "@aws-cdk/aws-cloudfront";
import * as origins from "@aws-cdk/aws-cloudfront-origins";

export class AppsyncBackendStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // =============================================================================================
    // DEFINING APPSYNC API CONSTRUCT
    // =============================================================================================

    const api = new appsync.GraphqlApi(this, "Api", {
      name: "cdk-todos-appsync-api",
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

    const todosLambda = new lambda.Function(this, "AppSyncNotesHandler", {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: "main.handler",
      code: lambda.Code.fromAsset("functions"),
      memorySize: 1024,
    });
    const lambdaDs = api.addLambdaDataSource("lambdaDatasource", todosLambda);

    lambdaDs.createResolver({
      typeName: "Query",
      fieldName: "getTodos",
    });

    lambdaDs.createResolver({
      typeName: "Mutation",
      fieldName: "addTodo",
    });

    lambdaDs.createResolver({
      typeName: "Mutation",
      fieldName: "deleteTodo",
    });

    lambdaDs.createResolver({
      typeName: "Mutation",
      fieldName: "updateTodo",
    });
    const todosTable = new db.Table(this, "CDKTodosTable", {
      partitionKey: {
        name: "id",
        type: db.AttributeType.STRING,
      },
    });
    todosTable.grantFullAccess(todosLambda);
    todosLambda.addEnvironment("TODOS_TABLE", todosTable.tableName);

    // =============================================================================================
    // S3 BUCKET AND DEPLOYMENT IN CLOUDFRONT
    // =============================================================================================

    const webBucket = new s3.Bucket(this, "WebsiteBucker", {
      publicReadAccess: true,
      websiteIndexDocument: "index.html",
      versioned: true,
    });

    // =============================================================================================
    // Speeds up distribution of your static and dynamic web content to your users.
    // =============================================================================================

    const distribution = new cloudfront.Distribution(
      this,
      "CloudDistribution",
      {
        defaultBehavior: { origin: new origins.S3Origin(webBucket) },
      }
    );

    // =============================================================================================
    // Deploy S3 bucketss
    // =============================================================================================

    const webDeployment = new s3deploy.BucketDeployment(this, "DeployWebsite", {
      sources: [s3deploy.Source.asset("../gatby-frontend/public")],
      destinationBucket: webBucket,
      distribution: distribution,
    });

    // =============================================================================================
    // Show Output
    // =============================================================================================
    new cdk.CfnOutput(this, "DistributionDomainName", {
      value: distribution.domainName,
    });

    // =============================================================================================
    // SHOWING OUTPUTS IN CONSOLE
    // =============================================================================================

    new cdk.CfnOutput(this, "GraphQLAPIURL", {
      value: api.graphqlUrl,
    });

    new cdk.CfnOutput(this, "GraphQLAPIKEY", {
      value: api.apiKey || "",
    });

    new cdk.CfnOutput(this, "RegionName", {
      value: this.region,
    });

  }
}
