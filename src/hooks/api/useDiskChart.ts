import axios from "axios";
import { useEffect, useState } from "react";

type TResponse = {
  [key: string]: {
    size: number;
    color: string;
  };
};

export const useDiskChart = (renderId = "") => {
  const [chartData, setChartData] = useState<TResponse>({});

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("/admin/disk-chart/");
        setChartData(response.data);
      } catch (error) {
        setChartData({});
      }
    };

    fetch();
  }, [renderId]);

  return chartData;
};
