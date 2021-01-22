import React from "react";

import { useWorldAtlas } from "./useWorldAtlas";
import { useCities } from "./useCities";

import { Marks } from "./Marks";

import { scaleSqrt, max } from "d3";

const width = 960;
const height = 500;

export const WorldMap = () => {
  const worldAtlas = useWorldAtlas();
  const cities = useCities();

  if (!worldAtlas || !cities) {
    return <pre></pre>;
  }

  const sizeValue = (d) => d.population;
  const maxRadius = 15;

  const sizeScale = scaleSqrt()
    .domain([0, max(cities, sizeValue)])
    .range([0, maxRadius]);

  return (
    <div className="big-chart-section">
      <h4 className="section-title">World Map with Points</h4>
      <svg width={width} height={height}>
        <Marks
          worldAtlas={worldAtlas}
          cities={cities}
          sizeScale={sizeScale}
          sizeValue={sizeValue}
        />
      </svg>
    </div>
  );
};
