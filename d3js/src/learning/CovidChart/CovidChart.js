import React from "react";
import { useDeaths } from "./useDeaths";
import { useCases } from "./useCases";

import "./chart.css";

const width = 700;
const height = 400;

const sum = (accumulator, currentValue) => accumulator + currentValue;

export const CovidChart = () => {
  const deaths = useDeaths();
  const cases = useCases();

  if (!deaths || !cases) {
    return <pre></pre>;
  }

  console.log(cases);

  const latestDateColumn = deaths.columns[deaths.columns.length - 1];
  const deathTotal = deaths.map((d) => +d[latestDateColumn]).reduce(sum, 0);
  const casesTotal = cases.map((d) => +d[latestDateColumn]).reduce(sum, 0);

  return (
    <div className="big-chart-section covid-chart">
      <h4 className="section-title">Coronavirus Total Deaths</h4>
      <span className="info">
        <p>
          <strong>Updated:</strong> {latestDateColumn}
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
        <svg width={width} height={height}></svg>
      </div>
    </div>
  );
};
