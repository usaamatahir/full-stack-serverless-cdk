import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as Step02CiCdPipelineUpdateCdkTemplate from '../lib/step-02-ci_cd-pipeline-update-cdk_template-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new Step02CiCdPipelineUpdateCdkTemplate.Step02CiCdPipelineUpdateCdkTemplateStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
