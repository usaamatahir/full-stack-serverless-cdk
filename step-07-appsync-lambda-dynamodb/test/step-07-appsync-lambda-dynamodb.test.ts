import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as Step07AppsyncLambdaDynamodb from '../lib/step-07-appsync-lambda-dynamodb-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new Step07AppsyncLambdaDynamodb.Step07AppsyncLambdaDynamodbStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
