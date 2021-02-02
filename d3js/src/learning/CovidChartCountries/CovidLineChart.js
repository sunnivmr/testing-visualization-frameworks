import React, { useState } from "react";
import { timeFormat, scaleLinear, scaleLog } from "d3";
import Dropdown from "react-dropdown";

import { LineChart } from "./LineChart";
import { useGlobalData } from "./useGlobalData";
import { useCountriesData } from "./useCountriesData";

import "./chart.scss";
import "react-dropdown/style.css";

// Dataset choices
const datasets = [
  { value: "deaths", label: "Covid deaths", data: null },
  { value: "cases", label: "Covid cases", data: null },
];

const defaultDataset = datasets[0];

// Set data for dropdown
const setData = (value) => {
  if (value === datasets[0].value) {
    return datasets[0].data;
  } else {
    return datasets[1].data;
  }
};

// Scale choices
const scales = [
  { value: "linear", label: "Linear scale", scale: scaleLinear },
  { value: "log", label: "Logarithmic scale", scale: scaleLog },
];

const defaultScale = scales[0];

const width = 700;
const height = 400;

const formatNumber = (d) => d.toLocaleString("en-US");

export const CovidLineChart = () => {
  const [cases, deaths] = useCountriesData();
  const [casesGlobal, deathsGlobal] = useGlobalData();
  const [chosenValue, setChosenValue] = useState("deaths");
  const [chosenData, setChosenData] = useState(null);
  const [chosenScale, setChosenScale] = useState("linear");

  if (!deaths || !cases || !deathsGlobal || !casesGlobal) {
    return <pre></pre>;
  }

  // Don't know if this is the best solution
  if (!chosenData) {
    return <p>{setChosenData(deaths)}</p>;
  }

  // Sets data to datasets to use it in graph
  datasets[0].data = deaths;
  datasets[1].data = cases;

  const latestDate = timeFormat("%m/%d/%y")(
    deathsGlobal[deathsGlobal.length - 1].date
  );

  let totalDeaths = deathsGlobal[deathsGlobal.length - 1].total;
  let totalCases = casesGlobal[casesGlobal.length - 1].total;

  const info = [
    { value: latestDate, label: "Latest date" },
    { value: formatNumber(totalDeaths), label: "Total global deaths" },
    { value: formatNumber(totalCases), label: "Total global cases" },
  ];

  const Dropdowns = () => {
    return (
      <div className="dropdowns">
        <Dropdown
          options={datasets}
          onChange={(e) => {
            console.log("Showing covid " + e.value);
            setChosenValue(e.value);
            setChosenData(setData(e.value));
          }}
          value={chosenValue ? chosenValue : defaultDataset}
        />
        <Dropdown
          options={scales}
          onChange={(e) => {
            console.log("Using " + e.value + " scale");
            setChosenScale(e.value);
          }}
          value={chosenScale ? chosenScale : defaultScale}
        />
      </div>
    );
  };

  return (
    <div className="big-chart-section covid-19-countries">
      <div className="info">
        <h4 className="section-title">Coronavirus Line Chart</h4>
        {info.map((info, i) => (
          <p key={i}>
            <strong>{info.label + ":"}</strong> {info.value}
          </p>
        ))}
        <Dropdowns />
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
