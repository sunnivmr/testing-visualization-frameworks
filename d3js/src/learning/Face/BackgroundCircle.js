import React from "react";

export const BackgroundCircle = ({ radius, strokeWidth, color }) => (
  <circle r={radius} fill={color} stroke="black" strokeWidth={strokeWidth} />
);
