#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { Step06AppAsyncLambdaAsDatasourceStack } from '../lib/step-06-app_async-lambda-as-datasource-stack';

const app = new cdk.App();
new Step06AppAsyncLambdaAsDatasourceStack(app, 'Step06AppAsyncLambdaAsDatasourceStack');
