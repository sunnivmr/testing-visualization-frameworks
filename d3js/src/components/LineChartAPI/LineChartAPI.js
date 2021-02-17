import React from "react";
/*
import { scaleTime, scaleLinear, extent, timeFormat } from "d3";*/

import { useData } from "./data/useData";
import { LineChart } from "./LineChart";

import "./chart.scss";

const fromDate = "2020-01-10T00";
const untilDate = "2020-01-10T01";
const dataType = 1;

const width = 700;

export const LineChartAPI = () => {
  const data = useData(fromDate, untilDate, dataType);

  if (!data) {
    return <p>Loading ...</p>;
  }

  return (
    <div className="api">
      <LineChart data={data} width={width} />
    </div>
  );
};
