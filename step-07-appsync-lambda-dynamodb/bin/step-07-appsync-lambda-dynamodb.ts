#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { Step07AppsyncLambdaDynamodbStack } from '../lib/step-07-appsync-lambda-dynamodb-stack';

const app = new cdk.App();
new Step07AppsyncLambdaDynamodbStack(app, 'Step07AppsyncLambdaDynamodbStack');
