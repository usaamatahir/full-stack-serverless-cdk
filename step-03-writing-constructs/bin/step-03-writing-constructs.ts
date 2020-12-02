#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { Step03WritingConstructsStack } from "../lib/step-03-writing-constructs-stack";

const app = new cdk.App();
new Step03WritingConstructsStack(app, "Step03WritingConstructsStack");
