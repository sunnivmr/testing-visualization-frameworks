import React from "react";
import { ResponsiveLine } from "@nivo/line";

/* For testing LineCharts in Chart.js*/
function LineChartWProps(props) {

  const config = props.config;

  const data = {
    id: 1,
    data: props.data,
  };

  return (
    <div className="chart-container">
      <ResponsiveLine className="chart" data={data} keys={config.keys} />
    </div>
  );
}

export default LineChartWProps;
