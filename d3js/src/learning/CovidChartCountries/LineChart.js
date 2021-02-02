import React, { useState, useCallback, useMemo } from "react";
import {
  scaleTime,
  max,
  line,
  extent,
  scaleLinear,
  scaleLog,
  format,
  timeFormat,
} from "d3";
// import { MarkerLineY } from "./markerlines/MarkerLineY";
// import { MarkerLineX } from "./markerlines/MarkerLineX";
import { XAxis } from "./axes/XAxis";
import { YAxis } from "./axes/YAxis";

import { VoronoiOverlay } from "./VoronoiOverlay";

const xValue = (d) => d.date;
const yValue = (d) => d.total;

// const tickPaddingX = 7;
const tickPaddingY = 10;

const circleRadius = 5;
const epsilon = 1;

const margin = { top: 20, right: 20, bottom: 20, left: 75 };

const formatDate = timeFormat("%b %d, %Y");
const formatNumber = format(",");

export const LineChart = ({ data, width, height, scale }) => {
  const [activeRow, setActiveRow] = useState(null);

  const innerWidth = width - margin.right - margin.left;
  const innerHeight = height - margin.top - margin.bottom;

  const allData = useMemo(
    () =>
      data.reduce(
        (accumulator, countryTimeseries) =>
          accumulator.concat(countryTimeseries),
        []
      ),
    [data]
  );

  const handleVoronoiHover = useCallback(setActiveRow, [setActiveRow]);

  const xScale = useMemo(
    () => scaleTime().domain(extent(allData, xValue)).range([0, innerWidth]),
    [allData, innerWidth]
  );

  const yScale = useMemo(
    () =>
      scale === "linear"
        ? scaleLinear()
            .domain([0, max(allData, yValue)])
            .range([innerHeight, 0])
        : scaleLog()
            .domain([epsilon, max(allData, yValue)])
            .range([innerHeight, 0]),
    [allData, innerHeight, scale]
  );

  const lineGenerator = useMemo(
    () =>
      line()
        .x((d) => xScale(xValue(d)))
        .y((d) => yScale(epsilon + yValue(d))),
    [xScale, yScale]
  );

  const CountryLines = () =>
    useMemo(
      () =>
        data.map((countryTimeseries, i) => {
          return (
            <path
              key={i}
              className="country-line"
              d={lineGenerator(countryTimeseries)}
            />
          );
        }),
      [data, lineGenerator]
    );

  const Tooltip = ({ activeRow, className }) => {
    return (
      <text y={-10} className={className}>
        {activeRow.countryName +
          ": " +
          formatNumber(activeRow.total) +
          ` ${activeRow.dataType}` +
          (activeRow.total > 1 ? "s" : "") +
          " as of " +
          formatDate(activeRow.date)}
      </text>
    );
  };

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
        <CountryLines />
        {activeRow ? (
          <g className="active-group">
            <path
              className="country-line active"
              d={lineGenerator(
                data.find(
                  (countryTimeseries) =>
                    countryTimeseries.countryName === activeRow.countryName
                )
              )}
            />
            <g
              className="active-tooltip"
              transform={`translate(${lineGenerator.x()(
                activeRow
              )}, ${lineGenerator.y()(activeRow)})`}
            >
              <circle r={circleRadius} />
              <Tooltip activeRow={activeRow} className="text-stroke" />
              <Tooltip activeRow={activeRow} />
            </g>
          </g>
        ) : null}
        <VoronoiOverlay
          allData={allData}
          innerWidth={innerWidth}
          innerHeight={innerHeight}
          onHover={handleVoronoiHover}
          lineGenerator={lineGenerator}
        />
      </g>
    </svg>
  );
};
