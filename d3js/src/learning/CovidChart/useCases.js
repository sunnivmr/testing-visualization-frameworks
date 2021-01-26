import { useState, useEffect } from "react";
import { csv } from "d3";

/*
const csvUrlCasesStable =
  "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/7719347bb66e9ebee83ca729d7eafde577841d0d/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv";

*/

const csvUrlCasesUpdated =
  "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv";

export const useCases = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    csv(csvUrlCasesUpdated).then(setData);
  }, []);

  return data;
};
