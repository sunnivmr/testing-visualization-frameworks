import React from "react";
import { useData } from "./useData";

import "./chart.css";

const width = window.innerWidth * 0.75;
const height = 400;

const sum = (accumulator, currentValue) => accumulator + currentValue;

export const CovidLineChart = () => {
  const [cases, deaths] = useData();

  if (!deaths || !cases) {
    return <pre></pre>;
  }

  const latestDateColumn = deaths.columns[deaths.columns.length - 1];
  const deathTotal = deaths.map((d) => +d[latestDateColumn]).reduce(sum, 0);
  const casesTotal = cases.map((d) => +d[latestDateColumn]).reduce(sum, 0);

  return (
    <div className="big-chart-section covid-chart">
      <h4 className="section-title">Coronavirus Line Chart</h4>
      <span className="info">
        <p>
          <strong>Latest date:</strong> {latestDateColumn}
        </p>
        <p>
          <strong>Total deaths:</strong>{" "}
          {deathTotal.toLocaleString("en-US") + " deaths"}
        </p>
        <p>
          <strong>Total cases:</strong>{" "}
          {casesTotal.toLocaleString("en-US") + " cases"}
        </p>
      </span>

      <div className="data">
        <svg width={width} height={height}>
          <rect width={width} height={height} fill={"babyblue"} />
        </svg>
      </div>
    </div>
  );
};
