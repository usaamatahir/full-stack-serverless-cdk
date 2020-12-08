import * as cdk from "@aws-cdk/core";
import * as CodePipeLine from "@aws-cdk/aws-codepipeline";
import * as CodePipeLineActions from "@aws-cdk/aws-codepipeline-actions";

export class Step10CodepipelineStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // Artifacts from Source Stage

    const sourceOutput = new CodePipeLine.Artifact();

    const pipeline = new CodePipeLine.Pipeline(this, "CDKPipeline", {
      crossAccountKeys: false,
      restartExecutionOnUpdate: true,
    });

    //Adding stages to pipeline

    pipeline.addStage({
      stageName: "Source",
      actions: [
        new CodePipeLineActions.GitHubSourceAction({
          actionName: "Pipeline",
          owner: "usaamatahir",
          repo
        }),
      ],
    });
  }
}
