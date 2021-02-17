import React, { useRef } from "react";
import { useEffect } from "react";
import { select, axisRight, format } from "d3";

export const YAxisRight = ({ yScale, innerWidth, tickPadding = 5 }) => {
  const ref = useRef();
  let tickNumber = 5;

  useEffect(() => {
    const yAxisG = select(ref.current);
    const yAxis = axisRight(yScale)
      .tickSize(-innerWidth)
      .tickPadding(tickPadding + 100)
      .tickFormat(format(","))
      .ticks(tickNumber);
    yAxisG.call(yAxis);
  }, [yScale, innerWidth, tickNumber, tickPadding]);

  return <g ref={ref}></g>;
};
