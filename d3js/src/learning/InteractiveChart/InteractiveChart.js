import React, { useState } from "react";
import { scaleLinear, scaleOrdinal, extent, format } from "d3";
import { useData } from "./useData";

import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";
import { ColorLegend } from "./ColorLegend";

// For styling dropdowns
import ReactDropdown from "react-dropdown";
import "react-dropdown/style.css";

import "./chart.css";

const setosaColor = "rgb(221, 241, 148)";
const versicolorColor = "rgba(255, 150, 255)";
const virginicaColor = "rgba(100, 150, 255)";

const speciesColors = [setosaColor, versicolorColor, virginicaColor];

const width = 700;
const height = 400;
const margin = { top: 10, right: 100, bottom: 50, left: 70 };
const circleRadius = 7;
const fadeOpacity = 0.3;

const innerHeight = height - margin.top - margin.bottom;
const innerWidth = width - margin.right - margin.left;

// Attributes array
const attributes = [
  { value: "sepal_length", label: "Sepal Length" },
  { value: "sepal_width", label: "Sepal Width" },
  { value: "petal_length", label: "Petal Length" },
  { value: "petal_width", label: "Petal Width" },
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
  const [hoveredValue, setHoveredValue] = useState(null); // Hovered value in color legend

  console.log(hoveredValue);

  // Set initial attributes
  const [xAttribute, setXAttribute] = useState("petal_length");
  const [yAttribute, setYAttribute] = useState("sepal_width");

  // X values
  const xValue = (d) => d[xAttribute];
  const xAxisLabel = getLabel(xAttribute);
  const xAxisLabelOffset = 40;

  // Y values
  const yValue = (d) => d[yAttribute];
  const yAxisLabel = getLabel(yAttribute);
  const yAxisLabelOffset = 45;

  // Color value for species
  const colorValue = (d) => d.species;
  const colorLegendLabel = "Species";

  /*
  // Default value for dropdown
  const defaultX = attributes[0].value;
  const defaultY = attributes[1].value;
  */

  if (!data) {
    return <pre></pre>;
  }

  const filteredData = data.filter((d) => hoveredValue === colorValue(d));

  // Linear scale for x values
  const xScale = scaleLinear()
    .domain(extent(data, xValue)) // extent-function replaces min, max
    .range([0, innerWidth])
    .nice(); // Adjusts the axis to prevent overlap

  // Linear scale for y values
  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([0, innerHeight]);

  // Ordinal scale for color
  const colorScale = scaleOrdinal()
    .domain(data.map(colorValue))
    .range(speciesColors);

  return (
    <div className="big-chart-section">
      <h4 className="section-title">Interactive Chart (React Menus)</h4>
      <div className="dropdowns">
        <span className="dropdown-label">x</span>
        <ReactDropdown
          options={attributes}
          value={xAttribute}
          onChange={({ value }) => setXAttribute(value)}
        />
        <span className="dropdown-label">y</span>
        <ReactDropdown
          options={attributes}
          value={yAttribute}
          onChange={({ value }) => setYAttribute(value)}
        />
      </div>
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
            <g transform={`translate(${innerWidth + 50}, 10)`}>
              <text className="axis-label" textAnchor="middle">
                {colorLegendLabel}
              </text>
              <ColorLegend
                colorScale={colorScale}
                tickSize={circleRadius}
                onHover={setHoveredValue}
                hoveredValue={hoveredValue}
                fadeOpacity={fadeOpacity}
              />
            </g>
            <g opacity={hoveredValue ? fadeOpacity : 1}>
              <Marks
                data={data}
                xScale={xScale}
                xValue={xValue}
                yScale={yScale}
                yValue={yValue}
                colorScale={colorScale}
                colorValue={colorValue}
                tooltipFormat={xAxisTickFormat}
                circleRadius={circleRadius}
              />
            </g>
            <Marks
              data={filteredData}
              xScale={xScale}
              xValue={xValue}
              yScale={yScale}
              yValue={yValue}
              colorScale={colorScale}
              colorValue={colorValue}
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
