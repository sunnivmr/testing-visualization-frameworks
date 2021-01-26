import React from "react";

import { useWorldAtlas } from "./useWorldAtlas";
import { useData } from "./useData";
import { useCodes } from "./useCodes";

import { Marks } from "./Marks";
import { ColorLegend } from "./ColorLegend";

import { interpolateYlOrRd, scaleSequential, max, min } from "d3";

const width = 960;
const height = 500;

// Color legend margins
const colorLegendMargins = {
  top: height - 125,
  right: 0,
  bottom: 0,
  left: 50,
};

const selectedYear = "2017";

export const ChoroplethMap = () => {
  const worldAtlas = useWorldAtlas();
  const data = useData();
  const codes = useCodes();

  if (!worldAtlas || !data || !codes) {
    return <pre></pre>;
  }

  const filteredData = data.filter((d) => d.Year === selectedYear);

  // Look-up table between numeric codes and alpha3 codes
  const numericCodeByAlphaCode = new Map();
  codes.forEach((code) => {
    const alpha3Code = code["alpha-3"];
    const numericCode = code["country-code"];
    numericCodeByAlphaCode.set(alpha3Code, numericCode);
  });

  // Look-up table for countries and values
  const rowByNumericCode = new Map();
  filteredData.forEach((d) => {
    const alpha3Code = d.Code;
    const numericCode = numericCodeByAlphaCode.get(alpha3Code);
    rowByNumericCode.set(numericCode, d);
  });

  const colorValue = (d) => d.aids;

  const colorScale = scaleSequential(interpolateYlOrRd).domain([
    0,
    max(data, colorValue),
  ]);

  const maxNumber = max(data, colorValue);
  const minNumber = min(data, colorValue);

  const colorLegendText = "Prevalence of people affected (%)";

  return (
    <div className="big-chart-section">
      <h4 className="section-title">HIV/Aids ChoroplethMap</h4>
      <h5>
        Prevalence - HIV/AIDS - Sex: Both - Age: 15-49 years (Percent) (%)
      </h5>
      <svg width={width} height={height}>
        <Marks
          worldAtlas={worldAtlas}
          rowByNumericCode={rowByNumericCode}
          colorScale={colorScale}
          colorValue={colorValue}
        />
        <ColorLegend
          colorScale={interpolateYlOrRd}
          colorLegendText={colorLegendText}
          margins={colorLegendMargins}
          maxNumber={maxNumber}
          minNumber={minNumber}
        />
      </svg>
    </div>
  );
};
