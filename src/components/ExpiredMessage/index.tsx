import { RouteComponentProps } from "@reach/router";
import React from "react";

export const ExpiredMessage: React.FunctionComponent<RouteComponentProps> =
  () => {
    return (
      <div className="container mx-auto text-center text-2xl font-bold mt-8">
        Der Link ist nicht mehr gültig !!
      </div>
    );
  };
