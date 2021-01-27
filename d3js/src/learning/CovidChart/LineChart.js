import React, { useState } from "react";
import { scaleTime, scaleLinear, max, line, extent } from "d3";
import { MarkerLineY } from "./markerlines/MarkerLineY";
import { MarkerLineX } from "./markerlines/MarkerLineX";
import { XAxis } from "./axes/XAxis";
import { YAxis } from "./axes/YAxis";

const xValue = (d) => d.date;
const yValue = (d) => d.total;

const milestone1 = 1000000;
const milestone2 = 2000000;

const formatNumber = (d) => d.toLocaleString("en-US");

const margin = { top: 20, right: 20, bottom: 20, left: 75 };

export const LineChart = ({ data, width, height }) => {
  const [yAttribute, setYAttribute] = useState("cases");

  const innerWidth = width - margin.right - margin.left;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = scaleTime()
    .domain(extent(data, (d) => d.date))
    .range([0, innerWidth]);

  const yScale = scaleLinear()
    .domain([0, max(data, (d) => d.total)])
    .range([innerHeight, 0]);

  const latestDate = xScale.domain()[1];

  const lineGenerator = line()
    .x((d) => xScale(xValue(d)))
    .y((d) => yScale(yValue(d)));

  return (
    <svg width={width} height={height} className="line-chart">
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <MarkerLineY
          value={milestone1}
          yScale={yScale}
          formatNumber={formatNumber}
          innerWidth={innerWidth}
        />
        <MarkerLineY
          value={milestone2}
          yScale={yScale}
          formatNumber={formatNumber}
          innerWidth={innerWidth}
        />
        <MarkerLineX
          value={latestDate}
          xScale={xScale}
          innerHeight={innerHeight}
        />
        <XAxis xScale={xScale} />
        <YAxis yScale={yScale} />
        <path d={lineGenerator(data)} />
      </g>
    </svg>
  );
};
