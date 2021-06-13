import prettyBytes from "pretty-bytes";
import React, { useEffect, useState } from "react";
import { PieChart } from "react-minimal-pie-chart";
import { useDiskChart } from "../../hooks/api/useDiskChart";
import { Tile } from "../Tile";

type TChart = {
  value: number;
  label: string;
  color: string;
};

const shiftSize = 3;
export const JobSpaceChart: React.FunctionComponent = () => {
  const chartData = useDiskChart();

  const [displayedData, setDisplayedData] = useState<TChart[]>([]);

  useEffect(() => {
    const d: TChart[] = [];
    for (const data of chartData) {
      d.push({
        value: data.size,
        color: data.color,
        label: prettyBytes(data.size),
      });
    }
    setDisplayedData(d);
  }, [chartData, setDisplayedData]);

  return (
    <Tile>
      <PieChart
        radius={PieChart.defaultProps.radius - shiftSize}
        data={displayedData}
        labelStyle={{ fontSize: "3px" }}
        label={(labelRenderProps) => {
          return labelRenderProps.dataEntry.label;
        }}
      />
    </Tile>
  );
};
