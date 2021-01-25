import React, { useState } from "react";

import { BubbleMap } from "./BubbleMap/BubbleMap";
import { DateHistogram } from "./DateHistogram/DateHistogram";

import { useWorldAtlas } from "./useWorldAtlas";
import { useData } from "./useData";

import "./combined.scss";

const width = 960;
const height = 500;

const xValue = (d) => d.date;

const dateHistogramSize = 0.2;

export const MissingMigrantsCombined = () => {
  const [brushExtent, setBrushExtent] = useState(); // Sets start and end date from what is brushed

  const worldAtlas = useWorldAtlas();
  const data = useData();

  if (!worldAtlas || !data) {
    return <pre></pre>;
  }

  const filteredData = brushExtent
    ? data.filter((d) => {
        const date = xValue(d);
        return date > brushExtent[0] && date < brushExtent[1];
      })
    : data;

  return (
    <div className="big-chart-section">
      <h4 className="section-title">Dead and Missing Migrants</h4>
      <svg width={width} height={height}>
        <BubbleMap data={filteredData} worldAtlas={worldAtlas} />
        <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
          <DateHistogram
            width={width}
            data={data}
            height={dateHistogramSize * height}
            setBrushExtent={setBrushExtent}
            xValue={xValue}
          />
        </g>
      </svg>
    </div>
  );
};
