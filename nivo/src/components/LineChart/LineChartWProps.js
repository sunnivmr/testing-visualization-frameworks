import React from "react";
import { ResponsiveLine } from "@nivo/line";

/* For testing LineCharts in Chart.js*/
function LineChartWProps(props) {
  const data = {
    labels: props.labels,
    datasets: [
      {
        title: props.title,
        label: props.label,
        data: props.data,
        borderColor: props.color,
        backgroundColor: props.color,
        pointBackgroundColor: props.color,
        pointBorderColor: props.color,
        stepSize: props.stepSize,
      },
    ],
  };

  return (
    <div className="chart-container">
      <ResponsiveLine className="chart" data={data} />
    </div>
  );
}

export default LineChartWProps;
