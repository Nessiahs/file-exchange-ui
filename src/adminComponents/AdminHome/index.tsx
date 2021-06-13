import { RouteComponentProps } from "@reach/router";
import React from "react";
import { HostDiskSpace } from "../HomeWidgets/HostDiskSpace";
import { JobSpaceChart } from "../HomeWidgets/JobSpaceChart";
import { PageHeader } from "../PageHeader";
export const AdminHome: React.FunctionComponent<RouteComponentProps> = () => {
  return (
    <div>
      <PageHeader title="Willkommen beim File-Exchange" />
      <div className="grid grid-cols-2 gap-2 mt-2">
        <HostDiskSpace />
        <JobSpaceChart />
      </div>
    </div>
  );
};
