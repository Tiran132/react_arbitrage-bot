import { useEffect, useState } from "react";
import useTimer from "../hooks/TimerHook";
import { MultipleChartsType, SpreadsChartType, TickerDataType } from "../types";
import { fetchTickerData } from "../utils/apis/dbWorks";
import SimpleChart, { DataType, SimpleChartMultiple } from "./SimpleChart";

function SpreadsChart({ marketsData }: SpreadsChartType) {
  const [data, setData] = useState<MultipleChartsType>();

  useEffect(() => {
    setData({
      axisX: marketsData[0].data.map((data) => ""),
      charts: marketsData.map((marketData) => {
        return {
          axisY: marketData.data.map((data) => data.result.spread),
          label: `spread ${marketData.market.base}/${marketData.market.quote}`,
          borderColor: "rgba(75,192,192,1)",
          bgColor: "rgba(75,192,192,0.2)",
          fill: true,
        };
      }),
    });
  }, [marketsData]);

  return (
    <div className="tickerChart">
      <h4>Be</h4>

      {/* {data && <SimpleChart data={data} />} */}
      {/* {data && <SimpleChart data={} />} */}
      {/* {dataSpread && <SimpleChart data={dataSpread} />} */}

      {data && <SimpleChartMultiple axisX={data.axisX} charts={data.charts} />}
    </div>
  );
}

export default SpreadsChart;
