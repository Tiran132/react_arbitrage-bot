import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { ChartType, MultipleChartsType } from "../types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface SimpleChartType {
  data: DataType;
}

export interface DataType {
  axisX: string[];
  axisY: number[];
  title?: string;
}

export const options: ChartOptions = {
  responsive: true,
  animation: false,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Pair spread on different exchanges",
    },
  },
};

const SimpleChart = ({ data }: SimpleChartType) => {
  const convertedData = {
    labels: data.axisX,
    datasets: [
      {
        label: data.title,
        data: data.axisY,
        borderColor: "#607d8b",
        backgroundColor: "#607d8b",
      },
    ],
  };

  return <Line options={options} data={convertedData} />;
};

export const SimpleChartMultiple = ({ axisX, charts }: MultipleChartsType) => {
  const convertedData = {
    labels: axisX,
    datasets: [
      ...charts.map((chart: ChartType) => {
        return {
          label: chart.label,
          data: chart.axisY,
          borderColor: chart.borderColor,
          backgroundColor: chart.bgColor,
        };
      }),
    ],
  };

  return <Line options={options} data={convertedData} />;
};

export default SimpleChart;
