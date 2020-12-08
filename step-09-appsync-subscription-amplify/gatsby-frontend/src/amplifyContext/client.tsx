import React, { ReactNode } from "react";
import Amplify from "aws-amplify";
import awsmobile from "../aws-exports";

interface Props {
  children: ReactNode;
}

export default function ({ children }: Props) {
  Amplify.configure(awsmobile);
  return <div>{children}</div>;
}
