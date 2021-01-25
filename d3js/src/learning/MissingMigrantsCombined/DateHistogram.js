import React from "react";
import { scaleTime, scaleLinear, extent, bin, timeMonths, sum, max } from "d3";

const height = 150;
const width = 960;
const margin = { top: 0, right: 50, bottom: 0, left: 70 };

export const Marks = ({
  binnedData,
  xScale,
  yScale,
  tooltipFormat,
  innerHeight,
}) => (
  <>
    {binnedData.map((d, i) => (
      <rect
        key={i}
        className="mark-circle"
        x={xScale(d.x0)}
        y={yScale(d.y)}
        width={xScale(d.x1) - xScale(d.x0)}
        height={innerHeight - yScale(d.y)}
      >
        <title>{tooltipFormat(d.y)}</title>
      </rect>
    ))}
  </>
);

export const DateHistogram = ({ data, height }) => {
  // X values
  const xValue = (d) => d.date;
  // const xAxisLabel = "Time";
  // const xAxisLabelOffset = 40;

  // Y values
  const yValue = (d) => d["Total Dead and Missing"];
  // const yAxisLabel = "Total Dead and Missing";
  // const yAxisLabelOffset = 45;

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.right - margin.left;

  // Linear scale for x values
  const xScale = scaleTime()
    .domain(extent(data, xValue)) // extent-function replaces min, max
    .range([0, innerWidth])
    .nice(); // Adjusts the axis to prevent overlap

  const [start, stop] = xScale.domain(); // xScale.domain returns the start and end dates

  // Binned data
  const binnedData = bin()
    .value(xValue)
    .domain(xScale.domain())
    .thresholds(timeMonths(start, stop))(data)
    .map((array) => ({
      y: sum(array, yValue),
      x0: array.x0,
      x1: array.x1,
    }));

  // Linear scale for y values
  const yScale = scaleLinear()
    .domain([0, max(binnedData, (d) => d.y)]) // Set the scale so that it goes from 0 to the maximum dead and missing
    .range([innerHeight, 0])
    .nice();

  return (
    <g transform={`translate(${margin.left}, ${margin.top})`}>
      <Marks
        binnedData={binnedData}
        xScale={xScale}
        yScale={yScale}
        innerHeight={innerHeight}
        tooltipFormat={(d) => d + " migrants"}
      />
    </g>
  );
};
