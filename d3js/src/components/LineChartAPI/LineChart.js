import React, { useMemo } from "react";
import {
  scaleTime,
  min,
  max,
  line,
  timeFormat,
  curveMonotoneX,
  extent,
  scaleLinear,
} from "d3";

import { XAxis } from "./axes/XAxis";
import { YAxisLeft } from "./axes/YAxisLeft";

const xValue = (d) => d.timestamp;
const yValue = (d) => d.measurement;

const linePadding = 0.001;
const tickPaddingY = 10;

const formatDate = timeFormat("%H:%M");

const margin = { top: 20, right: 20, bottom: 20, left: 30 };

export const LineChart = ({ data, width = 500, height = 500 }) => {
  const innerWidth = width - margin.right - margin.left;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = scaleTime()
    .domain(extent(data, xValue))
    .range([0, innerWidth]);

  const yScale = scaleLinear()
    .domain([min(data, yValue) - linePadding, max(data, yValue) + linePadding])
    .range([innerHeight, 0]);

  const lineGenerator = line()
    .x((d) => xScale(xValue(d)))
    .y((d) => yScale(yValue(d)))
    .curve(curveMonotoneX);

  return (
    <svg width={width} height={height} className="line-chart">
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <XAxis
          xScale={xScale}
          innerHeight={innerHeight}
          tickPadding={tickPaddingY}
          tickFormat={formatDate}
        />
        <YAxisLeft
          yScale={yScale}
          innerWidth={innerWidth}
          tickPadding={tickPaddingY}
        />
        <path d={lineGenerator(data)} className="api-line" />
      </g>
    </svg>
  );
};
