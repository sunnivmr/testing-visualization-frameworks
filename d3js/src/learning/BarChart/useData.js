import { useState, useEffect } from "react";
import { csv } from "d3";

// import localCsv from "./population_data.csv";

const csvUrl =
  "https://gist.githubusercontent.com/curran/0ac4077c7fc6390f5dd33bf5c06cb5ff/raw/605c54080c7a93a417a3cea93fd52e7550e76500/UN_Population_2019.csv";

// Fetch and parse the csv data and set the data value
export const useData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const row = (d) => {
      d.Population = +d["2020"] * 1000;
      return d;
    };
    csv(csvUrl, row).then((data) => setData(data.slice(0, 10)));
  }, []);

  return data;
};
