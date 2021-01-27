import React, { useState } from "react";
import { useData } from "./useData";
import { timeFormat } from "d3";

import { LineChart } from "./LineChart";

import "./chart.scss";

// Radio button attributes
const attributes = [
  { value: "deaths", label: "Covid deaths", data: null },
  { value: "cases", label: "Covid cases", data: null },
];

const width = 600;
const height = 400;

const formatNumber = (d) => d.toLocaleString("en-US");

export const CovidLineChart = () => {
  const [cases, deaths] = useData();
  const [chosenValue, setChosenValue] = useState(attributes[0].value);
  const [chosenData, setChosenData] = useState(null);

  if (!deaths || !cases) {
    return <pre></pre>;
  }

  // Don't know if this is the best solution
  if (!chosenData) {
    return <p>{setChosenData(deaths)}</p>;
  }

  // Sets data to attributes to use it in graph
  attributes[0].data = deaths;
  attributes[1].data = cases;

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
          <form className="radio-buttons">
            {attributes.map((attribute, i) => (
              <div className="data-choice" key={attribute.value}>
                <input
                  checked={chosenValue === attribute.value}
                  onChange={(e) => {
                    setChosenValue(e.target.value);
                    setChosenData(attribute.data);
                  }}
                  id={attribute.value}
                  type="radio"
                  value={attribute.value}
                  name={attribute.label}
                />
                <label htmlFor={attribute.value}>{attribute.label}</label>
              </div>
            ))}
          </form>
        </div>
      </div>

      <LineChart data={chosenData} width={width} height={height} />
    </div>
  );
};
