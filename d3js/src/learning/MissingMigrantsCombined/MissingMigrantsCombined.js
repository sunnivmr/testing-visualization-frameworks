import React from "react";

import { BubbleMap } from "./BubbleMap/BubbleMap";
import { DateHistogram } from "./DateHistogram/DateHistogram";

import { useWorldAtlas } from "./useWorldAtlas";
import { useData } from "./useData";

import "./combined.scss";

const width = 960;
const height = 500;

const dateHistogramSize = 0.2;

export const MissingMigrantsCombined = () => {
  const worldAtlas = useWorldAtlas();
  const data = useData();

  if (!worldAtlas || !data) {
    return <pre></pre>;
  }

  return (
    <div className="big-chart-section">
      <h4 className="section-title">Dead and Missing Migrants</h4>
      <svg width={width} height={height}>
        <BubbleMap data={data} worldAtlas={worldAtlas} />
        <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
          <DateHistogram
            width={width}
            data={data}
            height={dateHistogramSize * height}
          />
        </g>
      </svg>
    </div>
  );
};
