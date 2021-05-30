import { RouteComponentProps } from "@reach/router";
import prettyBytes from "pretty-bytes";
import React from "react";
import { PieChart } from "react-minimal-pie-chart";
import { useHddInformation } from "../../hooks/useHddInformation";
import { Tile } from "../../Tile";
import { PageHeader } from "../PageHeader";
export const AdminHome: React.FunctionComponent<RouteComponentProps> = () => {
  const hddData = useHddInformation();
  if (hddData === null) {
    return null;
  }
  const myData: { value: number; label: string; color: string }[] = [];
  for (const f in hddData.jobs.byJob) {
    myData.push({
      value: hddData.jobs.byJob[f],
      label: prettyBytes(hddData.jobs.byJob[f]),
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    });
  }
  const shiftSize = 7;
  return (
    <div>
      <PageHeader title="Willkommen beim File-Exchange" />
      <div className="grid grid-cols-2 gap-2 mt-2">
        <Tile>
          Aktuelle HDD Daten: <br />
          Gesamtspeicher: {prettyBytes(hddData.disk.size)} <br />
          Davon Frei: {prettyBytes(hddData.disk.free)}
        </Tile>
        <Tile>
          <div>
            Verbraucht durch File-Exchange {prettyBytes(hddData.jobs.all)}
          </div>
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
