import React from "react";
import { ResponsiveLine } from "@nivo/line";

import data from "./data";
import config from "./config";

class LineChart extends React.Component {
  yellow = "rgba(255, 200, 100, 0.5)";
  pink = "rgba(235, 49, 170, 0.5)";
  green = "rgba(100, 200, 100, 0.5)";
  blue = "rgba(50, 150, 200, 0.5)";

  axisRight = {};

  render() {
    return (
      <div className="chart">
        <h2>Line chart</h2>
        <ResponsiveLine
          data={data}
          keys={config.keys}
          margin={config.margin}
          legends={config.legends}
          colors={
            this.pink
          } /*
          padding={0.5}
          
          enableLabel={false}
          axisRight={this.axisRight}
          /*legends={this.legends}*/
        />
      </div>
    );
  }
}

export default LineChart;
