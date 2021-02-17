import React, { useRef } from "react";
import { useEffect } from "react";
import { select, axisLeft, format } from "d3";

export const YAxisLeft = ({ yScale, innerWidth, tickPadding = 5 }) => {
  const ref = useRef();
  let tickNumber = 5;

  useEffect(() => {
    const yAxisG = select(ref.current);
    const yAxis = axisLeft(yScale)
      .tickSize(-innerWidth)
      .tickPadding(tickPadding)
      .tickFormat(format(","))
      .ticks(tickNumber);
    yAxisG.call(yAxis);
  }, [yScale, innerWidth, tickNumber, tickPadding]);

  return <g ref={ref}></g>;
};
