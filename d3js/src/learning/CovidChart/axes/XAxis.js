import React, { useRef } from "react";
import { useEffect } from "react";
import { select, axisBottom } from "d3";

export const XAxis = ({ xScale, innerHeight }) => {
  const ref = useRef();

  useEffect(() => {
    const xAxisG = select(ref.current);
    const xAxis = axisBottom(xScale).tickSize(-innerHeight).tickPadding(5);
    xAxisG.call(xAxis);
  }, []);

  return <g transform={`translate(0, ${innerHeight})`} ref={ref}></g>;
};
