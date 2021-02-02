import { useState, useEffect } from "react";
import { csv, timeParse } from "d3";

/*
const csvUrlCasesStable =
  "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/7719347bb66e9ebee83ca729d7eafde577841d0d/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv";

const csvUrlDeathsStable =
  "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/7719347bb66e9ebee83ca729d7eafde577841d0d/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv";
*/

const csvUrlCasesUpdated =
  "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv";

const csvUrlDeathsUpdated =
  "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv";

const sum = (accumulator, currentValue) => accumulator + currentValue;

const parseDate = timeParse("%m/%d/%y");

const transformGlobal = (rawData) => {
  const dates = rawData.columns.slice(4);

  const transformedGlobal = dates.map((date) => ({
    date: parseDate(date),
    total: rawData.map((d) => +d[date]).reduce(sum, 0),
  }));

  return transformedGlobal;
};

export const useGlobalData = () => {
  const [cases, setCases] = useState(null);
  const [deaths, setDeaths] = useState(null);

  useEffect(() => {
    csv(csvUrlCasesUpdated).then((rawCases) => {
      setCases(transformGlobal(rawCases));
    });
    csv(csvUrlDeathsUpdated).then((rawDeaths) => {
      setDeaths(transformGlobal(rawDeaths));
    });
  }, []);

  return [cases, deaths];
};
