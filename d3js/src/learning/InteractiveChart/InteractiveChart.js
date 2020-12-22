import React, { useState } from "react";
import { scaleLinear, extent, format } from "d3";
import { useData } from "./useData";

import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";
import { Dropdown } from "./Dropdown.js";

import "./chart.css";

const width = 700;
const height = 400;
const margin = { top: 10, right: 50, bottom: 50, left: 70 };

const innerHeight = height - margin.top - margin.bottom;
const innerWidth = width - margin.right - margin.left;

// Attributes array
const attributes = [
  { value: "sepal_length", label: "Sepal Length" },
  { value: "sepal_with", label: "Sepal Width" },
  { value: "petal_length", label: "Petal Length" },
  { value: "petal_width", label: "Sepal Width" },
  { value: "species", label: "Species" },
];

const getLabel = (value) => {
  for (let i = 0; i < attributes.length; i++) {
    if (attributes[i].value === value) {
      return attributes[i].label;
    }
  }
};

// Axis formats
const siFormat = format(".2s");
const xAxisTickFormat = (tickValue) => siFormat(tickValue).replace("G", "B");

export const InteractiveChart = () => {
  const data = useData();

  // Set initial attributes
  const initialXAttribute = "petal_length";
  const [xAttribute, setXAttribute] = useState(initialXAttribute);
  const initialYAttribute = "sepal_width";
  const [yAttribute, setYAttribute] = useState(initialYAttribute);

  // X values
  const xValue = (d) => d[xAttribute];
  const xAxisLabel = getLabel(xAttribute);
  const xAxisLabelOffset = 40;

  // Y values
  const yValue = (d) => d[yAttribute];
  const yAxisLabel = getLabel(yAttribute);
  const yAxisLabelOffset = 45;

  if (!data) {
    return <pre>Loading ...</pre>;
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
      <h4 className="section-title">Interactive Chart (React Menus)</h4>
      <label htmlFor="x-select">x:</label>
      <Dropdown
        options={attributes}
        id="x-select"
        selectedValue={xAttribute}
        onSelectedValueChange={setXAttribute}
      />
      <label htmlFor="y-select">y:</label>
      <Dropdown
        options={attributes}
        id="y-select"
        selectedValue={yAttribute}
        onSelectedValueChange={setYAttribute}
      />
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
