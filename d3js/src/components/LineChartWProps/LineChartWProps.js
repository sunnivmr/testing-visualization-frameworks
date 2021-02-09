import React from "react";
/*
import { scaleTime, scaleLinear, extent, timeFormat } from "d3";*/

import { useData } from "./useData";

const fromDate = "2020-01-10";
const untilDate = "2020-01-11";
const dataType = 1;

export const LineChartWProps = () => {
  const data = useData(fromDate, untilDate, dataType);

  return (
    <>
      <pre>Loaded</pre>
      {data.map((d) => (
        <p>data</p>
      ))}
    </>
  );
};
