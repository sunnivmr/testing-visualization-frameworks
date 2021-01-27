import React, { useMemo } from "react";
import { Marks } from "./Marks";
import { scaleSqrt, max } from "d3";

const sizeValue = (d) => d["Total Dead and Missing"];
const maxRadius = 15;

export const BubbleMap = ({ data, filteredData, worldAtlas }) => {
  const sizeScale = useMemo(
    () =>
      scaleSqrt()
        .domain([0, max(data, sizeValue)])
        .range([0, maxRadius]),
    [data]
  );

  return (
    <Marks
      worldAtlas={worldAtlas}
      data={filteredData}
      sizeScale={sizeScale}
      sizeValue={sizeValue}
    />
  );
};
