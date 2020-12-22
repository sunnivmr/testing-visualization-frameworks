import React from "react";
import { arc } from "d3";

export const Mouth = ({ mouthRadius, mouthWidth }) => {
  const mouthArc = arc()
    .innerRadius(mouthRadius)
    .outerRadius(mouthRadius + mouthWidth)
    .startAngle(Math.PI / 2 + 0.25)
    .endAngle((Math.PI * 3) / 2 - 0.25);

  return <path d={mouthArc()} />;
};
