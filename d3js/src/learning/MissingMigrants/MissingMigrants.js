import React from "react";
import { scaleTime, scaleLinear, extent, timeFormat } from "d3";
import { useData } from "./useData";

import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";

import "./chart.scss";

const width = 700;
const height = 400;
const margin = { top: 10, right: 50, bottom: 50, left: 70 };
const circleRadius = 2;

const innerHeight = height - margin.top - margin.bottom;
const innerWidth = width - margin.right - margin.left;

//d["Total Dead and Missing"] = +d["Total Dead and Missing"];
//d["Reported Date"] = new Date(d["Reported Date"]);

// X values
const xValue = (d) => d["Reported Date"];
const xAxisLabel = "Time";
const xAxisLabelOffset = 40;

// Y values
const yValue = (d) => d["Total Dead and Missing"];
const yAxisLabel = "Total Dead and Missing";
const yAxisLabelOffset = 45;

// Axis formats
const xAxisTickFormat = timeFormat("%m/%d/%Y");

export const MissingMigrants = () => {
  const data = useData();

  if (!data) {
    return <pre></pre>;
  }

  // Linear scale for x values
  const xScale = scaleTime()
    .domain(extent(data, xValue)) // extent-function replaces min, max
    .range([0, innerWidth])
    .nice(); // Adjusts the axis to prevent overlap

  // Linear scale for y values
  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([innerHeight, 0])
    .nice();

  return (
    <div className="big-chart-section">
      <h4 className="section-title">Dead and Missing Migrants</h4>
      <div className="migrants">
        <svg width={width} height={height}>
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            <AxisBottom
              xScale={xScale}
              innerHeight={innerHeight}
              tickFormat={xAxisTickFormat}
              tickOffset={10}
            />
            <AxisLeft yScale={yScale} innerWidth={innerWidth} tickOffset={7} />
            <Marks
              data={data}
              xScale={xScale}
              yScale={yScale}
              xValue={xValue}
              yValue={yValue}
              tooltipFormat={xAxisTickFormat}
              circleRadius={circleRadius}
            />
            <text
              x={innerWidth / 2}
              y={innerHeight + xAxisLabelOffset}
              className={"axis-label"}
            >
              {xAxisLabel}
            </text>
            <text
              className={"axis-label"}
              transform={`translate(${-yAxisLabelOffset},
                ${innerHeight / 2}) rotate(-90)`}
            >
              {yAxisLabel}
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
};
