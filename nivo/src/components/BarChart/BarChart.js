import React from "react";
import { ResponsiveBar } from "@nivo/bar";

import data from "./data";
import config from "./config";

class BarChart extends React.Component {
  yellow = "rgba(255, 200, 100, 0.5)";
  pink = "rgba(235, 49, 170, 0.5)";
  green = "rgba(100, 200, 100, 0.5)";
  blue = "rgba(50, 150, 200, 0.5)";

  axisRight = {};

  render() {
    return (
      <div className="chart">
        <h2>Bar chart</h2>
        <ResponsiveBar
          data={data}
          keys={config.keys}
          indexBy="year"
          margin={config.margin}
          legends={config.legends}
          padding={0.5}
          colors={this.blue}
          borderRadius={"2px"}
          enableLabel={false}
          axisRight={this.axisRight}
          /*legends={this.legends}*/
        />
      </div>
    );
  }
}

export default BarChart;
