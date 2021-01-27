import React from "react";

const textMarginTop = 5;

export const MarkerLineX = ({ value, xScale, innerHeight }) => {
  const markerLineX = xScale(value);
  const markerLineY1 = 0;
  const markerLineY2 = innerHeight;

  return (
    <>
      <text
        alignmentBaseline="hanging"
        className="marker-text-x"
        x={markerLineX}
        y={markerLineY2 + textMarginTop}
      >
        {"Today"}
      </text>
      <line
        className="marker-line"
        x1={markerLineX}
        x2={markerLineX}
        y1={markerLineY1}
        y2={markerLineY2}
      />
    </>
  );
};
