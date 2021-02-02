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

const parseDate = timeParse("%m/%d/%y");

const transformCountries = (rawData, dataType) => {
  // Filter out rows that represent provinces or states
  const countriesData = rawData.filter((d) => !d["Province/State"]);

  // Get timeseries data for each country
  const dates = rawData.columns.slice(4);
  return countriesData.map((d) => {
    const countryName = d["Country/Region"];
    const countryTimeseries = dates.map((date) => ({
      date: parseDate(date),
      total: +d[date],
      dataType: dataType,
      countryName: countryName,
    }));

    countryTimeseries.countryName = countryName;
    return countryTimeseries;
  });
};

export const useCountriesData = () => {
  const [cases, setCases] = useState(null);
  const [deaths, setDeaths] = useState(null);

  useEffect(() => {
    csv(csvUrlCasesUpdated).then((rawCases) => {
      setCases(transformCountries(rawCases, "case"));
    });
    csv(csvUrlDeathsUpdated).then((rawDeaths) => {
      setDeaths(transformCountries(rawDeaths, "death"));
    });
  }, []);

  return [cases, deaths];
};
