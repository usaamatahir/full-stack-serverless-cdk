#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { Step05HelloWebsiteStack } from '../lib/step-05-hello-website-stack';

const app = new cdk.App();
new Step05HelloWebsiteStack(app, 'Step05HelloWebsiteStack');
