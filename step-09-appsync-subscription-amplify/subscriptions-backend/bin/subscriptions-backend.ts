#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { SubscriptionsBackendStack } from '../lib/subscriptions-backend-stack';

const app = new cdk.App();
new SubscriptionsBackendStack(app, 'SubscriptionsBackendStack');
