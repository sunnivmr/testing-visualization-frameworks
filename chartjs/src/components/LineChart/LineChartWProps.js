import React from "react";
import { Line } from "react-chartjs-2";

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

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    title: { display: true, text: props.title },
    scales: {
      yAxes: [
        {
          ticks: {
            min: Math.min(...props.data) - props.stepSize,
            max: Math.max(...props.data) + props.stepSize,
            stepSize: props.stepSize,
          },
        },
      ],
    },
  };

  return (
    <div className="chart-container">
      <Line className="chart" data={data} options={options} />
    </div>
  );
}

export default LineChartWProps;
