import React from "react";
import { scaleLinear, extent, format } from "d3";
import { useData } from "./useData";

import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";

import "./chart.css";

const width = 700;
const height = 400;
const margin = { top: 10, right: 50, bottom: 50, left: 70 };

const innerHeight = height - margin.top - margin.bottom;
const innerWidth = width - margin.right - margin.left;

// X values
const xValue = (d) => d.sepal_length;
const xAxisLabel = "Sepal length";
const xAxisLabelOffset = 40;

// Y values
const yValue = (d) => d.sepal_width;
const yAxisLabel = "Sepal width";
const yAxisLabelOffset = 45;

// Axis formats
const siFormat = format(".2s");
const xAxisTickFormat = (tickValue) => siFormat(tickValue).replace("G", "B");

export const ScatterPlot = () => {
  const data = useData();

  if (!data) {
    return <pre></pre>;
  }

  // Linear scale for x values
  const xScale = scaleLinear()
    .domain(extent(data, xValue)) // extent-function replaces min, max
    .range([0, innerWidth])
    .nice(); // Adjusts the axis to prevent overlap

  // Linear scale for y values
  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([0, innerHeight]);

  return (
    <div className="big-chart-section">
      <h4 className="section-title">Scatter Plot (Iris Dataset)</h4>
      <div className="data">
        <svg width={width} height={height}>
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            <AxisBottom
              xScale={xScale}
              innerHeight={innerHeight}
              tickFormat={xAxisTickFormat}
              tickOffset={7}
            />
            <AxisLeft yScale={yScale} innerWidth={innerWidth} />
            <Marks
              data={data}
              xScale={xScale}
              yScale={yScale}
              xValue={xValue}
              yValue={yValue}
              tooltipFormat={xAxisTickFormat}
              circleRadius={7}
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
