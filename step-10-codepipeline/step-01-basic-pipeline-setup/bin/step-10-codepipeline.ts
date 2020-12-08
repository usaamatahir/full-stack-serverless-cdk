#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { Step10CodepipelineStack } from '../lib/step-10-codepipeline-stack';

const app = new cdk.App();
new Step10CodepipelineStack(app, 'Step10CodepipelineStack');
