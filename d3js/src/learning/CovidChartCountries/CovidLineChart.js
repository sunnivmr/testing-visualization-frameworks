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
const numberOfCountries = 3;

const formatNumber = (d) => d.toLocaleString("en-US");

export const CovidLineChart = () => {
  const [cases, deaths] = useCountriesData(numberOfCountries);
  const [casesGlobal, deathsGlobal] = useGlobalData();
  const [chosenData, setChosenData] = useState(null);

  const [chosenScale, setChosenScale] = useState(defaultScale);
  const [chosenDataset, setChosenDataset] = useState(defaultDataset);

  const [chosenCountries, setChosenCountries] = useState(defaultCountries);

  useEffect(() => {
    console.log("Updated countriesData");
  }, [chosenData]);

  if (!deaths || !cases || !deathsGlobal || !casesGlobal) {
    return <pre></pre>;
  }

  // Don't know if this is the best solution
  if (!chosenData || !chosenScale) {
    return <p>{setChosenData(deaths)}</p>;
  }

  // Set default values
  defaultDataset = chosenData === datasets[1] ? datasets[1] : datasets[0];
  defaultScale = chosenScale === scales[1] ? scales[1] : scales[0];

  // Sets data to datasets to use it in graph
  datasets[0].data = deaths;
  datasets[1].data = cases;

  // Set country names for multi-select
  const countryNames = cases.map((countryData) => ({
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
    console.log(chosenData);
    console.log(value);

    const newData = chosenData.filter((data) => value.includes(data));

    console.log(newData);

    if (value.length) {
      return chosenData;
      //return newData;
    } else {
      return chosenData;
    }

    return chosenData;
  };

  // Handle change of data
  const handleDataChange = (e) => {
    setChosenDataset(e);
    setChosenData(setData(e.value));
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
      chosenData.filter((countryData) =>
        chosenCountryNames.includes(countryData.countryName)
      )
    );

    setChosenData(setData(newChosenData[0]));
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
        data={chosenData}
        width={width}
        height={height}
        scale={chosenScale.value}
      />
      <CountrySelect />
    </div>
  );
};
