import React, { Component } from "react";

import * as d3 from "d3";

export default class BarChart extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.dataset = [100, 200, 300, 250, 200];
    this.yellow = "rgba(255, 200, 100, 0.5)";
    this.pink = "rgba(235, 49, 170, 0.5)";
    this.green = "rgba(100, 200, 100, 0.5)";
    this.blue = "rgba(100, 100, 200, 0.5)";
  }

  componentDidMount() {
    let size = 500;
    let svg = d3
      .select(this.myRef.current)
      .append("svg")
      .attr("width", size)
      .attr("height", size);

    let rect_width = 50;
    svg
      .selectAll("rect")
      .data(this.dataset)
      .enter()
      .append("rect")
      .attr("x", (d, i) => 5 + i * (rect_width + 5))
      .attr("y", (d) => size - d)
      .attr("width", rect_width)
      .attr("height", (d) => d)
      .attr("fill", this.pink);
  }

  render() {
    return (
      <div className="chart-section">
        <h4 className="chart-title">BarChart</h4>
        <div className="barchart" ref={this.myRef}></div>
      </div>
    );
  }
}
