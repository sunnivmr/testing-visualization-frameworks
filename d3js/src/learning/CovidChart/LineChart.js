import React from "react";
import { scaleTime, max, line, extent, scaleLinear, scaleLog } from "d3";
// import { MarkerLineY } from "./markerlines/MarkerLineY";
// import { MarkerLineX } from "./markerlines/MarkerLineX";
import { XAxis } from "./axes/XAxis";
import { YAxis } from "./axes/YAxis";

const xValue = (d) => d.date;
const yValue = (d) => d.total;

// const tickPaddingX = 7;
const tickPaddingY = 10;

const margin = { top: 20, right: 20, bottom: 20, left: 75 };

export const LineChart = ({ data, width, height, scale }) => {
  const innerWidth = width - margin.right - margin.left;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = scaleTime()
    .domain(extent(data, (d) => d.date))
    .range([0, innerWidth]);

  const yScale =
    scale === "linear"
      ? scaleLinear()
          .domain([0, max(data, (d) => d.total)])
          .range([innerHeight, 0])
      : scaleLog()
          .domain([1, max(data, (d) => d.total)])
          .range([innerHeight, 0]);

  const lineGenerator = line()
    .x((d) => xScale(xValue(d)))
    .y((d) => yScale(yValue(d)));

  return (
    <svg width={width} height={height} className="line-chart">
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <XAxis
          xScale={xScale}
          innerHeight={innerHeight}
          scale={scale}
          tickPadding={tickPaddingY}
        />
        <YAxis
          yScale={yScale}
          innerWidth={innerWidth}
          scale={scale}
          tickPadding={tickPaddingY}
        />
        {/*countries.map((country) => (
          <path d={lineGenerator(country.data)} />
        ))*/}
        <path d={lineGenerator(data)} />
      </g>
    </svg>
  );
};
