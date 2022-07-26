import React, { useEffect, useState } from "react";
import { spreadData } from "../Data";
import useTickersData from "../hooks/TickerDataHook";
import useTimer from "../hooks/TimerHook";
import { Market, TickerDataType } from "../types";
import {
  fetchMinLiqudityMarkets,
  fetchTickerData,
} from "../utils/apis/dbWorks";
import SimpleChart, { DataType, SimpleChartMultiple } from "./SimpleChart";
import SpreadsChart from "./SpreadsChart";
import TickerChart from "./TickerChart";

const maxLenght = 20;

const Dashboard = () => {
  const [allMarkets, setAllMarkets] = useState<Market[]>([
    { base: "GAS", quote: "BTC" },
    { base: "OMG", quote: "BTC" },
  ]);
  const [seconds] = useTimer({ interval: 4 });
  // const [tickersData] = useTickersData({markets: allMarkets, tick: seconds})

  useEffect(() => {
    const fetcher = async () => {
      const res: [] = await fetchMinLiqudityMarkets(1000000);

      setAllMarkets(
        res
          .map((symbols: string) => {
            return {
              base: symbols.split("/")[0],
              quote: symbols.split("/")[1],
            };
          })
          .slice(0, 4)
      );
    };
    // fetcher();
  }, []);

  return (
    <>
      <h2>Hello World!</h2>
      <p>This is the crypto arbitrage bot based on static arbitrage strategy</p>
      <br />
      <br />
      {/* < SimpleChartMultiple axisX={} charts={}/> */}
      <div className="wrapper">
        {/* {tickersData.map(ticker => {
          return (
            <SpreadsChart marketsData={tickersData}/>
            // <TickerChart base={ticker.market.base} quote={ticker.market.quote} />
          )
        })} */}
        {/* {allMarkets.map((market) => {
          return <TickerChart base={market.base} quote={market.quote} />;
        })} */}
      </div>
    </>
  );
};

export default Dashboard;
