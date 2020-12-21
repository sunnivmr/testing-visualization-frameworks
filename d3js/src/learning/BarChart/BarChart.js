import React, { useState, useEffect, useCallback } from "react";
import { csv, scaleBand, scaleLinear, max } from "d3";

const csvUrl =
  "https://gist.githubusercontent.com/curran/0ac4077c7fc6390f5dd33bf5c06cb5ff/raw/605c54080c7a93a417a3cea93fd52e7550e76500/UN_Population_2019.csv";

const width = 500;
const height = 500;
const centerX = width / 2;
const centerY = height / 2;

export const BarChart = () => {
  const [data, setData] = useState(null);

  // Parse the csv data and set the data value
  //d3.csv(csvUrl).then(setData);

  useEffect(() => {
    const row = (d) => {
      d.Population = +d["2020"];
      return d;
    };
    csv(csvUrl, row).then((data) => setData(data.slice(0, 10)));
  }, []);

  if (!data) {
    return <pre>Loading ...</pre>;
  }

  console.log(data[10]);

  // Bandscale for country categories
  const yScale = scaleBand()
    .domain(data.map((d) => d.Country))
    .range([0, height]);

  // Linear scale for country population
  const xScale = scaleLinear()
    .domain([0, max(data, (d) => d.Population)])
    .range([0, width]);

  return (
    <div className="chart-section">
      <h4 className="chart-title">World Population Data</h4>
      <div className="data">
        <svg width={width} height={height}>
          {data.map((d) => (
            <rect
              x={0}
              y={yScale(d.Country)}
              width={xScale(d.Population)}
              height={yScale.bandwidth()}
            />
          ))}
        </svg>
      </div>
    </div>
  );
};
