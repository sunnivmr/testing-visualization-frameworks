import React from "react";
import * as d3 from "d3";

import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.dataset = [100, 200, 300, 400, 500];
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

    let rect_width = 95;
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
      <div className="App">
        <div className="title">
          <h1>D3.js testing</h1>
        </div>
        <div className="text">
          <p>Testing D3.js library for Master's Thesis 2020/2021</p>
        </div>
        <div className="chart-title">
          <h2>Normal charts</h2>
        </div>
        <div className="chart-grid normal-charts"></div>
        <div className="chart-title">
          <h2>Multiple axes charts</h2>
        </div>
        <div className="chart-grid multiple-axes-charts"></div>
        <div className="api-chart">
          <div className="chart-title">
            <h2>Data from API</h2>
          </div>
        </div>
        <div className="text aligned-left">
          <p>Sunniva Mathea Runde, Kaja Løvsjø Solberg</p>
        </div>

        <div ref={this.myRef}></div>
      </div>
    );
  }
}

export default App;
