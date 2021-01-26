import React from "react";
import { useData } from "./useData";
import { timeFormat } from "d3";

import { LineChart } from "./LineChart";

import "./chart.scss";

const width = 600;
const height = 400;

const formatNumber = (d) => d.toLocaleString("en-US");

export const CovidLineChart = () => {
  const [cases, deaths] = useData();

  if (!deaths || !cases) {
    return <pre></pre>;
  }

  // let deathsTotal = 100;
  // let casesTotal = 1000;

  const latestDate = timeFormat("%m/%d/%y")(deaths[deaths.length - 1].date);
  console.log(deaths);

  let deathsTotal = deaths[deaths.length - 1].total;
  let casesTotal = cases[deaths.length - 1].total;

  // const deathTotal = deaths.map((d) => +d[latestDateColumn]).reduce(sum, 0);
  // const casesTotal = cases.map((d) => +d[latestDateColumn]).reduce(sum, 0);

  // const latestDateColumn = "today";

  return (
    <div className="big-chart-section covid-19">
      <div className="info">
        <h4 className="section-title">Coronavirus Line Chart</h4>

        <p>
          <strong>Latest date:</strong> {latestDate}
        </p>
        <p>
          <strong>Total deaths:</strong> {formatNumber(deathsTotal) + " deaths"}
        </p>
        <p>
          <strong>Total cases:</strong> {formatNumber(casesTotal) + " cases"}
        </p>
      </div>
      <LineChart data={deaths} width={width} height={height} />
    </div>
  );
};
