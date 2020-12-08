#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { Step02CiCdPipelineUpdateCdkTemplateStack } from '../lib/step-02-ci_cd-pipeline-update-cdk_template-stack';

const app = new cdk.App();
new Step02CiCdPipelineUpdateCdkTemplateStack(app, 'Step02CiCdPipelineUpdateCdkTemplateStack');
