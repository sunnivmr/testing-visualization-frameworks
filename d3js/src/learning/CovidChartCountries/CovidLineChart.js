import React, { useState, useMemo, useEffect } from "react";
import { timeFormat, scaleLinear, scaleLog } from "d3";
import Dropdown from "react-dropdown";
import Select from "react-select";

import { LineChart } from "./LineChart/LineChart";
import { useGlobalData } from "./data/useGlobalData";
import { useCountriesData } from "./data/useCountriesData";

import "./chart.scss";
import "react-dropdown/style.css";

// Using react-dropdown
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

let defaultDataset = datasets[0];
let defaultScale = scales[0];
let defaultCountries = [];

const width = 700;
const height = 400;
const numberOfCountries = 10;

const formatNumber = (d) => d.toLocaleString("en-US");

export const CovidLineChart = () => {
  const [cases, deaths] = useCountriesData(numberOfCountries);
  const [casesGlobal, deathsGlobal] = useGlobalData();

  const [graphData, setGraphData] = useState(null);
  const [chosenGraphData, setChosenGraphData] = useState(null);

  const [chosenScale, setChosenScale] = useState(defaultScale);
  const [chosenDataset, setChosenDataset] = useState(defaultDataset);

  const [chosenCountries, setChosenCountries] = useState(defaultCountries);

  useEffect(() => {
    console.log("Updated countriesData");
    setChosenGraphData(graphData);
  }, [graphData]);

  if (!deaths || !cases || !deathsGlobal || !casesGlobal) {
    return <pre></pre>;
  }

  // Don't know if this is the best solution
  if (!graphData || !chosenScale) {
    return <p>{setGraphData(deaths)}</p>;
  }

  // Set default values
  defaultDataset = graphData === datasets[1] ? datasets[1] : datasets[0];
  defaultScale = chosenScale === scales[1] ? scales[1] : scales[0];

  // Sets data to datasets to use it in graph
  datasets[0].data = deaths;
  datasets[1].data = cases;

  // Set country names for multi-select
  const countryNames = graphData.map((countryData) => ({
    value: countryData.countryName,
    label: countryData.countryName,
  }));

  // Latest date with records
  const latestDate = timeFormat("%m/%d/%y")(
    deathsGlobal[deathsGlobal.length - 1].date
  );

  // Total deaths and cases
  let totalDeaths = deathsGlobal[deathsGlobal.length - 1].total;
  let totalCases = casesGlobal[casesGlobal.length - 1].total;

  const info = [
    { value: latestDate, label: "Latest date" },
    { value: formatNumber(totalDeaths), label: "Total global deaths" },
    { value: formatNumber(totalCases), label: "Total global cases" },
  ];

  // Set data for dropdown
  const setData = (value) => {
    if (value === datasets[0].value) {
      return datasets[0].data;
    } else if (value === datasets[1].value) {
      return datasets[1].data;
    }
    if (value.length < 1) {
      console.log("Set all data");
      return graphData;

      //return newData;
    } else {
      console.log("Set chosen data");
      //console.log(value);
      return value;
    }
  };

  // Handle change of data
  const handleDataChange = (e) => {
    setChosenDataset(e);
    setGraphData(setData(e.value));
    console.log("Chosen data: " + e.value);
  };

  // Handle change of scale
  const handleScaleChange = (e) => {
    setChosenScale(e);
    console.log("Chosen scale: " + e.value);
  };

  // Handle change of countries
  const handleCountriesChange = (e) => {
    setChosenCountries(e);
    const chosenCountryNames = e.map((country) => country.label);

    console.log(
      "Selected countries: " + chosenCountryNames.map((name) => " " + name)
    );

    let newChosenData = [];

    newChosenData.push(
      graphData.filter((countryData) =>
        chosenCountryNames.includes(countryData.countryName)
      )
    );

    setChosenGraphData(setData(newChosenData[0]));
    console.log(newChosenData[0]);

    /*

    // Check if country is displayed in graph
    chosenData.map((countryData) => {
      let isIncluded = false;
      const countryName = countryData[0].countryName;
      chosenCountries.map((country) => {
        isIncluded = Object.values(country).includes(countryName);
        
      });
    });*/
  };

  const Selects = () => {
    return (
      <div className="dropdowns">
        <Select
          options={datasets}
          onChange={(e) => handleDataChange(e)}
          value={chosenDataset}
        />
        <Select
          options={scales}
          onChange={(e) => handleScaleChange(e)}
          value={chosenScale}
        />
      </div>
    );
  };

  const CountrySelect = () => {
    return (
      <div className="country-select">
        <Select
          options={countryNames}
          onChange={(e) => handleCountriesChange(e)}
          value={chosenCountries}
          placeholder="Select countries"
          isClearable
          isSearchable
          isMulti
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
        <Selects />
      </div>

      <LineChart
        data={chosenGraphData ? chosenGraphData : graphData}
        width={width}
        height={height}
        scale={chosenScale.value}
      />
    </div>
  );
};
