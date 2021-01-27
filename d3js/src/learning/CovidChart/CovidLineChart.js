import React, { useState } from "react";
import { useData } from "./useData";
import { timeFormat, scaleLinear, scaleLog } from "d3";

import { LineChart } from "./LineChart";

import "./chart.scss";

// Dataset choices
const datasets = [
  { value: "deaths", label: "Covid deaths", data: null },
  { value: "cases", label: "Covid cases", data: null },
];

// Scale choices
const scales = [
  { value: "linear", label: "Linear scale", scale: scaleLinear },
  { value: "log", label: "Logarithmic scale", scale: scaleLog },
];

const width = 600;
const height = 400;

const formatNumber = (d) => d.toLocaleString("en-US");

export const CovidLineChart = () => {
  const [cases, deaths] = useData();
  const [chosenValue, setChosenValue] = useState("deaths");
  const [chosenData, setChosenData] = useState(null);
  const [chosenScale, setChosenScale] = useState("linear");

  if (!deaths || !cases) {
    return <pre></pre>;
  }

  // Don't know if this is the best solution
  if (!chosenData) {
    return <p>{setChosenData(deaths)}</p>;
  }

  // Sets data to datasets to use it in graph
  datasets[0].data = deaths;
  datasets[1].data = cases;

  const latestDate = timeFormat("%m/%d/%y")(deaths[deaths.length - 1].date);

  let totalDeaths = deaths[deaths.length - 1].total;
  let totalCases = cases[deaths.length - 1].total;

  const info = [
    { value: latestDate, label: "Latest date" },
    { value: formatNumber(totalDeaths), label: "Total deaths" },
    { value: formatNumber(totalCases), label: "Total cases" },
  ];

  return (
    <div className="big-chart-section covid-19">
      <div className="info">
        <h4 className="section-title">Coronavirus Line Chart</h4>
        {info.map((info, i) => (
          <p key={i}>
            <strong>{info.label + ":"}</strong> {info.value}
          </p>
        ))}
        <div className="data-choices">
          <form>
            {datasets.map((dataset) => (
              <div className="data-choice" key={dataset.value}>
                <input
                  checked={chosenValue === dataset.value}
                  onChange={(e) => {
                    setChosenValue(e.target.value);
                    setChosenData(dataset.data);
                  }}
                  id={dataset.value}
                  type="radio"
                  value={dataset.value}
                  name={dataset.label}
                />
                <label htmlFor={dataset.value}>{dataset.label}</label>
              </div>
            ))}
          </form>
        </div>
        <div className="scale-choices">
          <form>
            {scales.map((scale) => (
              <div className="scale-choice" key={scale.value}>
                <input
                  checked={scale.value === chosenScale}
                  onChange={(e) => {
                    setChosenScale(scale.value);
                  }}
                  id={scale.value}
                  type="radio"
                  value={scale.value}
                  name={scale.label}
                />
                <label htmlFor={scale.value}>{scale.label}</label>
              </div>
            ))}
          </form>
        </div>
      </div>

      <LineChart
        data={chosenData}
        width={width}
        height={height}
        scale={chosenScale}
      />
    </div>
  );
};
