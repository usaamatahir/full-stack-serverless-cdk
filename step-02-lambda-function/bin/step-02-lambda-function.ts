#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { Step02LambdaFunctionStack } from '../lib/step-02-lambda-function-stack';

const app = new cdk.App();
new Step02LambdaFunctionStack(app, 'Step02LambdaFunctionStack');
