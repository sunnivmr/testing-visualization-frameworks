import React, { useState, useEffect } from "react";
import { csv, arc, pie } from "d3";

// Data about CSS colors
const csvUrl =
  "https://gist.githubusercontent.com/curran/b236990081a24761f7000567094914e0/raw/cssNamedColors.csv";

const width = 400;
const height = 400;
const centerX = width / 2;
const centerY = height / 2;

const pieArc = arc().innerRadius(0).outerRadius(width);

export const ColorData = () => {
  const [data, setData] = useState(null);

  // Parse the csv data and set the data value
  //d3.csv(csvUrl).then(setData);

  useEffect(() => {
    csv(csvUrl).then(setData);
  }, []);

  if (!data) {
    return <pre>Loading ...</pre>;
  }

  const colorPie = pie().value(1);

  return (
    <div className="chart-section">
      <h4 className="section-title">CSS Color Data</h4>
      <div className="data">
        <svg width={width} height={height}>
          <g transform={`translate(${centerX},${centerY})`}>
            {colorPie(data).map((d, i) => (
              <path
                key={i}
                fill={d.data["RGB hex value"]}
                d={pieArc({
                  startAngle: (i / data.length) * 2 * Math.PI,
                  endAngle: ((i + 1) / data.length) * 2 * Math.PI,
                })}
              />
            ))}
          </g>
        </svg>
      </div>
    </div>
  );
};
