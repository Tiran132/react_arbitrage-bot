import { useEffect, useState } from "react";
import useTimer from "../hooks/TimerHook";
import { MultipleChartsType, TickerChartType, TickerDataType } from "../types";
import { fetchTickerData } from "../utils/apis/dbWorks";
import SimpleChart, { DataType, SimpleChartMultiple } from "./SimpleChart";

const TickerChart = ({
  base,
  quote,
  intervalSec = 5,
  maxLenght = 20,
}: TickerChartType) => {
  const [data, setData] = useState<MultipleChartsType>();
  const [dataSpread, setDataSpread] = useState<DataType>();
  const [seconds] = useTimer({ interval: intervalSec });
  const [tickerData, setTickerData] = useState<TickerDataType[]>([]);

  useEffect(() => {
    setData({
      axisX: tickerData.map((data) => ""),// data.timestamp.toString().split(".")[0].slice(7, 10)),
      charts: [
        // {
        //     axisY: tickerData.map((data) => data.result.spread),
        //     label: `spread`,
        //     color: "#eee",
        // },
        {
            axisY: tickerData.map((data) => data.result.price_a),
            label: `price_a`,
            borderColor: "rgba(75,192,192,1)",
            bgColor: "rgba(75,192,192,0.2)",
            fill: true,
        },
        {
            axisY: tickerData.map((data) => data.result.price_b),
            label: `price_b`,
            borderColor: "#742774",
            fill: true,
        },
      ]
    });
    setDataSpread({
        axisX: tickerData.map((data) => ""),
        axisY: tickerData.map((data) => data.result.spread),
        title: "spread"
    })
    const fetchTicker = async () => {
      const res = await fetchTickerData({ base: base, quote: quote });
      console.log(res);
      setTickerData((data) => [...data, res]);
      if (tickerData.length > maxLenght)
        setTickerData((data) =>
          data.slice(tickerData.length - 20, tickerData.length)
        );
    };
    if (base && quote) fetchTicker();
  }, [seconds]);

  return (
    <div className="tickerChart">
      <h4>
        {base}/{quote}
      </h4>

      {/* {data && <SimpleChart data={data} />} */}
      {/* {data && <SimpleChart data={} />} */}
      {dataSpread && <SimpleChart data={dataSpread} />}

      {data && <SimpleChartMultiple axisX={data.axisX} charts={data.charts} />}
    </div>
  );
};

export default TickerChart;
