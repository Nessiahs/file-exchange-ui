import { RouteComponentProps } from "@reach/router";
import prettyBytes from "pretty-bytes";
import React from "react";
import { PieChart } from "react-minimal-pie-chart";
import { useHddInformation } from "../../hooks/useHddInformation";
import { PageHeader } from "../PageHeader";
import { Tile } from "../Tile";
export const AdminHome: React.FunctionComponent<RouteComponentProps> = () => {
  const hddData = useHddInformation();
  if (hddData === null) {
    return null;
  }
  const { jobs, disk } = hddData;

  const myData: { value: number; label: string; color: string }[] = [];
  for (const f in jobs.byJob) {
    if (jobs.byJob.hasOwnProperty(f)) {
      myData.push({
        value: jobs.byJob[f],
        label: prettyBytes(jobs.byJob[f]),
        color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      });
    }
  }
  const shiftSize = 7;
  return (
    <div>
      <PageHeader title="Willkommen beim File-Exchange" />
      <div className="grid grid-cols-2 gap-2 mt-2">
        <Tile>
          Aktuelle HDD Daten: <br />
          Gesamtspeicher: {prettyBytes(disk.size)} <br />
          Davon Frei: {prettyBytes(disk.free)}
        </Tile>
        <Tile>
          <div>Verbraucht durch File-Exchange {prettyBytes(jobs.all)}</div>
          <PieChart
            radius={PieChart.defaultProps.radius - shiftSize}
            data={myData}
            labelStyle={{ fontSize: "3px" }}
            label={(labelRenderProps) => {
              return labelRenderProps.dataEntry.label;
            }}
          />
        </Tile>
      </div>
    </div>
  );
};
