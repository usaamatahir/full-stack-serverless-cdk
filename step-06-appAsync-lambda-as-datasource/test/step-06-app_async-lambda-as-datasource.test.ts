import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as Step06AppAsyncLambdaAsDatasource from '../lib/step-06-app_async-lambda-as-datasource-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new Step06AppAsyncLambdaAsDatasource.Step06AppAsyncLambdaAsDatasourceStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
