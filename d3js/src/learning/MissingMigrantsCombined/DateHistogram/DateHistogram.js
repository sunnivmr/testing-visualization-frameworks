import React, { useRef, useEffect } from "react";
import { Marks } from "./Marks";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";

import {
  scaleTime,
  scaleLinear,
  extent,
  bin,
  timeMonths,
  timeFormat,
  sum,
  max,
  brushX,
  select,
} from "d3";

const margin = { top: 0, right: 50, bottom: 15, left: 50 };

const xAxisLabelOffset = 45;
const yAxisLabelOffset = 40;

export const DateHistogram = ({
  data,
  width,
  height,
  setBrushExtent,
  xValue,
}) => {
  // X values
  const xAxisLabel = "Time";

  const xAxisTickFormat = timeFormat("%m/%d/%Y");

  // Y values
  const yValue = (d) => d["Total Dead and Missing"];
  const yAxisLabel = "Total Dead and Missing";

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.right - margin.left;

  // Linear scale for x values
  const xScale = scaleTime()
    .domain(extent(data, xValue)) // extent-function replaces min, max
    .range([0, innerWidth])
    .nice(); // Adjusts the axis to prevent overlap

  const [start, stop] = xScale.domain(); // xScale.domain returns the start and end dates
  const brushRef = useRef();

  // Side effects of using the brushRef
  useEffect(() => {
    const brush = brushX().extent([
      [0, 0],
      [innerWidth, innerHeight],
    ]);
    brush(select(brushRef.current));
    brush.on("brush end", (event, d) => {
      setBrushExtent(event.selection && event.selection.map(xScale.invert));
    });
  }, [innerWidth, innerHeight, setBrushExtent, xScale.invert]); // Dependencies

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
    <>
      <rect className="background" width={width} height={height} />
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={xAxisTickFormat}
          tickOffset={10}
        />
        <AxisLeft yScale={yScale} innerWidth={innerWidth} tickOffset={7} />
        <Marks
          binnedData={binnedData}
          xScale={xScale}
          yScale={yScale}
          innerHeight={innerHeight}
          tooltipFormat={(d) => d + " migrants"}
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
        <g ref={brushRef} />
      </g>
    </>
  );
};
