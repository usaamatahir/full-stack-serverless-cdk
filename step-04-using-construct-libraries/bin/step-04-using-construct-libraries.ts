#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { Step04UsingConstructLibrariesStack } from '../lib/step-04-using-construct-libraries-stack';

const app = new cdk.App();
new Step04UsingConstructLibrariesStack(app, 'Step04UsingConstructLibrariesStack');
