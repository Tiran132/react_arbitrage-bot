import { useEffect, useState } from "react";
import { TickersDataHookType, TickerMarketDataType } from "../types";
import { fetchTickerData} from "../utils/apis/dbWorks";

const useTickerData = ({
  markets,
  maxLength = 20,
  tick,
}: TickersDataHookType) => {
  const [tickersData, setTickerData] = useState<TickerMarketDataType[]>([]);

  useEffect(() => {
    const fetchTicker = async () => {

        const res = await Promise.all(markets.map(async (market) => {
            return {
                market: market,
                data: await fetchTickerData(market)
            }
        }))

        const newTickersData = res.map((res) => {
            const currentData: TickerMarketDataType | undefined = tickersData.find((ticker) => ticker.market == res.market) 
            if (currentData){
                if (currentData.data.length > maxLength - 1) currentData.data.shift()
                return {
                    market: res.market,
                    data: [...currentData.data, res.data]
                }
            }
            return{
                market: res.market,
                data: [res.data]
            }
        })
        // console.log(newTickersData)
        setTickerData(newTickersData)
    };

    if (markets.length) fetchTicker();
  }, [tick]);


  return [tickersData];
};

export default useTickerData;
