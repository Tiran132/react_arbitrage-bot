import { Market } from "../../types";

const API_URL = "http://localhost:500"

export const fetchTickerData = (market: Market) => {
    return fetch(`${API_URL}/ticker?token1=${market.base}&token2=${market.quote}`)
   .then((response) => response.json());
}


export const fetchTickersData = (markets: Market[]) => {
    return markets.map(market => {
        return fetch(`${API_URL}/ticker?token1=${market.base}&token2=${market.quote}`)
   .then((response) => response.json());
    }) 
}



export const fetchMinLiqudityMarkets = (supply: number = 0) => {
    return fetch(`${API_URL}/all_same_tokens?max_supply=${supply}`)
   .then((response) => response.json());
}