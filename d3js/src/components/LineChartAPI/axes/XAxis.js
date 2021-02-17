import React, { useRef } from "react";
import { useEffect } from "react";
import { select, axisBottom } from "d3";

export const XAxis = ({ xScale, innerHeight, tickPadding = 5, tickFormat }) => {
  const ref = useRef();

  useEffect(() => {
    const xAxisG = select(ref.current);
    const xAxis = axisBottom(xScale)
      .tickSize(-innerHeight)
      .tickPadding(tickPadding)
      .tickFormat(tickFormat);
    xAxisG.call(xAxis);
  }, [innerHeight, tickPadding, xScale]);

  return <g transform={`translate(0, ${innerHeight})`} ref={ref}></g>;
};
