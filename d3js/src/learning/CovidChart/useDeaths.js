import { useState, useEffect } from "react";
import { csv } from "d3";

/*
const csvUrlDeathsStable =
  "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/7719347bb66e9ebee83ca729d7eafde577841d0d/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv";
*/

const csvUrlDeathsUpdated =
  "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv";

export const useDeaths = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    csv(csvUrlDeathsUpdated).then(setData);
  }, []);

  return data;
};
