import {
  expect as expectCDK,
  matchTemplate,
  MatchStyle,
} from "@aws-cdk/assert";
import * as cdk from "@aws-cdk/core";
import * as Step01HelloCdk from "../lib/step-01-hello-cdk-stack";

test("Empty Stack", () => {
  const app = new cdk.App();
  // WHEN
  const stack = new Step01HelloCdk.Step01HelloCdkStack(app, "MyTestStack");
  // THEN
  expectCDK(stack).to(
    matchTemplate(
      {
        Resources: {},
      },
      MatchStyle.EXACT
    )
  );
});
