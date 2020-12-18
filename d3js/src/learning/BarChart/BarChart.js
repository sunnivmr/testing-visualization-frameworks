import React, { useEffect } from "react";

import { csv, select, scaleLinear, scaleBand, max } from "d3";
import data from "./data.csv";

const svg = select("svg");

export default function BarChart(props) {
  const myBarChart = React.createRef(); // Create reference to barchart-element

  useEffect(() => {
    // Width and height of barchart-element
    let width = myBarChart.current.clientWidth;
    let height = myBarChart.current.clientHeight;

    console.log("Width: " + width + " height: " + height);

    // Render the data
    const render = (data) => {
      // Scale the linear quantative elements
      const xScale = scaleLinear()
        .domain([0, max(data, (d) => d.population)])
        .range([0, width]);

      // Scale the ordinal bands
      const yScale = scaleBand()
        .domain(data.map((d) => d.country))
        .range([0, height]);

      console.log(yScale.domain());

      svg
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("y", (d) => yScale(d.country))
        .attr("width", (d) => xScale(d.population))
        .attr("height", yScale.bandwidth());
    };

    // Reformat the population to a number and multiply by 1000
    csv(data).then((data) => {
      data.forEach((d) => {
        d.population = +d.population * 1000;
      });
      render(data);
    });
  }, []);

  return (
    <div className="chart-section">
      <h4 className="chart-title">Bar chart</h4>
      <div className="barchart" ref={myBarChart} />
    </div>
  );
}
