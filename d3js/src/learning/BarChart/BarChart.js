import React, { useState, useEffect } from "react";
import { scaleBand, scaleLinear, max, format } from "d3";
import { useData } from "./useData";

import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";

import "./chart.css";

const width = 700;
const height = 400;
const margin = { top: 10, right: 50, bottom: 60, left: 150 };
const xAxisLabelOffset = 40;

const innerHeight = height - margin.top - margin.bottom;
const innerWidth = width - margin.right - margin.left;

const yValue = (d) => d.Country;
const xValue = (d) => d.Population;

// Axis formats
const siFormat = format(".2s");
const xAxisTickFormat = (tickValue) => siFormat(tickValue).replace("G", "B");

export const BarChart = () => {
  const data = useData();

  if (!data) {
    return <pre>Loading ...</pre>;
  }

  // Bandscale for country categories
  const yScale = scaleBand()
    .domain(data.map(yValue))
    .range([0, innerHeight])
    .paddingInner(0.2);

  // Linear scale for country population
  const xScale = scaleLinear()
    .domain([0, max(data, xValue)])
    .range([0, innerWidth]);

  // Axes
  console.log(xScale.ticks());

  return (
    <div className="big-chart-section">
      <h4 className="section-title">Bar Chart (World Population Data)</h4>
      <div className="data">
        <svg width={width} height={height}>
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            <AxisBottom
              xScale={xScale}
              innerHeight={innerHeight}
              tickFormat={xAxisTickFormat}
            />
            <AxisLeft yScale={yScale} />
            <text
              x={innerWidth / 2}
              y={innerHeight + xAxisLabelOffset}
              className={"axis-label"}
            >
              Population
            </text>
            <Marks
              data={data}
              xScale={xScale}
              yScale={yScale}
              xValue={xValue}
              yValue={yValue}
              tooltipFormat={xAxisTickFormat}
            />
          </g>
        </svg>
      </div>
    </div>
  );
};
