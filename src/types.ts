export interface Market {
    base: string
    quote: string
}

export interface TickerDataType {
    result: {
        price_a: number
        price_b: number
        spread: number
        sellA: boolean
    }
    timestamp: number
}

export interface TickerChartType {
    base: string
    quote: string
    intervalSec?: number
    maxLenght?: number
}

export interface MultipleSpreadChartType {
    markets: Market[]
    intervalSec?: number
    maxLenght?: number
}


export interface MultipleChartsType {
    axisX: string[]
    charts: ChartType[]
}

export interface ChartType {
    axisY: number[]
    label?: string
    borderColor?: string
    bgColor?: string
    fill?: boolean,
}

export interface TickersDataHookType {
    markets: Market[]
    maxLength?: number
    tick?: number
}

export interface TickerMarketDataType {
    market: Market
    data: TickerDataType[]
}

export interface SpreadsChartType {
    marketsData: TickerMarketDataType[]
}