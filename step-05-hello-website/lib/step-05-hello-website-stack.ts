import * as cdk from "@aws-cdk/core";
import * as s3 from "@aws-cdk/aws-s3";
import * as s3deploy from "@aws-cdk/aws-s3-deployment";
import * as cloudfront from "@aws-cdk/aws-cloudfront";
import * as origins from "@aws-cdk/aws-cloudfront-origins";

export class Step05HelloWebsiteStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    const webBucket = new s3.Bucket(this, "WebBucker", {
      publicReadAccess: true,
      websiteIndexDocument: "index.html",
      versioned: true,
    });

    // =============================================================================================
    // Speeds up distribution of your static and dynamic web content to your users.
    // =============================================================================================
    const distribution = new cloudfront.Distribution(this, "MyDistribution", {
      defaultBehavior: { origin: new origins.S3Origin(webBucket) },
    });

    // =============================================================================================
    // Show Output
    // =============================================================================================
    new cdk.CfnOutput(this, "DistributionDomainName", {
      value: distribution.domainName,
    });

    // =============================================================================================
    // Deploy S3 bucketss
    // =============================================================================================
    const webDeployment = new s3deploy.BucketDeployment(this, "DeployWebsite", {
      sources: [s3deploy.Source.asset("./website")],
      destinationBucket: webBucket,
      distribution: distribution,
    });
  }
}
