import prettyBytes from "pretty-bytes";
import { useContext } from "react";
import { PieChart } from "react-minimal-pie-chart";
import { useHddInformation } from "../../hooks/useHddInformation";
import { AdminContext } from "../../path/admin";
import { Tile } from "../Tile";

export const JobSpaceChart: React.FunctionComponent = () => {
  const hddData = useHddInformation();
  const context = useContext(AdminContext);
  if (hddData === null || !context || context.isAdmin === 0) {
    return null;
  }
  const { byJob, all } = hddData.jobs;
  const myData: { value: number; label: string; color: string }[] = [];
  for (const f in byJob) {
    if (byJob.hasOwnProperty(f)) {
      myData.push({
        value: byJob[f],
        label: prettyBytes(byJob[f]),
        color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      });
    }
  }
  const shiftSize = 7;

  return (
    <Tile>
      <div>Verbraucht durch File-Exchange {prettyBytes(all)}</div>
      <PieChart
        radius={PieChart.defaultProps.radius - shiftSize}
        data={myData}
        labelStyle={{ fontSize: "3px" }}
        label={(labelRenderProps) => {
          return labelRenderProps.dataEntry.label;
        }}
      />
    </Tile>
  );
};
