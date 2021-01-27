import React, { useRef } from "react";
import { useEffect } from "react";
import { select, axisLeft } from "d3";

export const YAxis = ({ yScale, innerWidth }) => {
  const ref = useRef();

  useEffect(() => {
    const yAxisG = select(ref.current);
    const yAxis = axisLeft(yScale)
      .tickSize(-innerWidth)
      .tickPadding(5)
      .ticks(10, "~s");
    yAxisG.call(yAxis);
  }, [yScale]);

  return <g ref={ref}></g>;
};
