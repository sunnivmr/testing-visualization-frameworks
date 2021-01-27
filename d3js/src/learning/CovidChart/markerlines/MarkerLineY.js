import React from "react";

const textMarginRight = 5;

export const MarkerLineY = ({ value, yScale, formatNumber, innerWidth }) => {
  const markerLineX1 = 0;
  const markerLineX2 = innerWidth;
  const markerLineY = yScale(value);

  return (
    <>
      <text
        alignmentBaseline="middle"
        className="marker-text-y"
        x={markerLineX1 - textMarginRight}
        y={markerLineY}
      >
        {formatNumber(value)}
      </text>
      <line
        className="marker-line"
        x1={markerLineX1}
        x2={markerLineX2}
        y1={markerLineY}
        y2={markerLineY}
      />
    </>
  );
};
