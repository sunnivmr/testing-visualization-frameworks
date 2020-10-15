import React from "react";
import { ResponsiveBar } from "@nivo/bar";

import data from "./data";
import config from "./config";

import "./chart.css";

class BarChart extends React.Component {
  yellow = "rgba(255, 200, 100, 0.5)";
  pink = "rgba(235, 49, 170, 0.5)";
  green = "rgba(100, 200, 100, 0.5)";
  blue = "rgba(50, 150, 200, 0.5)";

  render() {
    return (
      <div className="chart">
        <ResponsiveBar
          data={data}
          keys={config.keys}
          indexBy="year"
          margin={config.margin}
          legends={config.legends}
          padding={0.5}
          colors={this.blue}
          borderRadius={"12px"}
        />
      </div>
    );
  }
}

export default BarChart;
