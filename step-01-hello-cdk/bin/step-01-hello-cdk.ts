#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { Step01HelloCdkStack } from "../lib/step-01-hello-cdk-stack";

const app = new cdk.App();
new Step01HelloCdkStack(app, "Step01HelloCdkStack");
