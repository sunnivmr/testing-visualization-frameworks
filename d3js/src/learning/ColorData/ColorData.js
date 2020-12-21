import React from "react";
import * as d3 from "d3";

export const ColorData = () => {
  const csvUrl =
    "https://gist.githubusercontent.com/curran/b236990081a24761f7000567094914e0/raw/cssNamedColors.csv";

  // Fetch data asyncronously
  const fetchText = async (url) => {
    const response = await fetch(url);
    return await response.text();
  };

  // Console.log that data
  fetchText(csvUrl).then((text) => {
    const data = d3.csvParse(text);
    console.log(data.length + "rows");
    console.log(data.columns.length + "columns");
  });

  return (
    <div className="chart-section">
      <h4 className="chart-title">Color data</h4>
    </div>
  );
};
