import React, { useRef } from "react";
import { useEffect } from "react";
import { select, axisLeft, format } from "d3";

export const YAxis = ({ yScale, innerWidth, scale }) => {
  const ref = useRef();
  let tickNumber = 5;

  if (scale === "linear") {
    tickNumber = 10;
  }

  useEffect(() => {
    const yAxisG = select(ref.current);
    const yAxis = axisLeft(yScale)
      .tickSize(-innerWidth)
      .tickPadding(5)
      .tickFormat(format(","))
      .ticks(tickNumber);
    yAxisG.call(yAxis);
  }, [yScale]);

  return <g ref={ref}></g>;
};
