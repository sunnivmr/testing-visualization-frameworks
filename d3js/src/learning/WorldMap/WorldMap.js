import React from "react";

import { useData } from "./useData";
import { Marks } from "./Marks";

const width = 960;
const height = 500;

export const WorldMap = () => {
  const data = useData();

  if (!data) {
    return <pre></pre>;
  }

  return (
    <div className="big-chart-section">
      <h4 className="section-title">World Map</h4>
      <svg width={width} height={height}>
        <Marks data={data} />
      </svg>
    </div>
  );
};
