import React from "react";
import AmplifyClient from "../amplifyContext/client";

export const wrapRootElement = ({ element }) => (
  <AmplifyClient>{element}</AmplifyClient>
);
