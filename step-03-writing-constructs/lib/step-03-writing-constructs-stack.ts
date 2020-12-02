import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as apigw from "@aws-cdk/aws-apigateway";
import { HitCounter } from "./hitcounter";

export class Step03WritingConstructsStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // =============================================================================================
    // DEFINE AN AWS LAMBDA RESOURCE
    // =============================================================================================

    const hello = new lambda.Function(this, "HelloHandler", {
      runtime: lambda.Runtime.NODEJS_10_X,
      handler: "hello.handler",
      code: lambda.Code.fromAsset("lambda"),
    });

    const helloCounter = new HitCounter(this, "HelloCounter", {
      streamdowm: hello,
    });

    new apigw.LambdaRestApi(this, "Endpoint", {
      handler: helloCounter.handler,
    });
  }
}
