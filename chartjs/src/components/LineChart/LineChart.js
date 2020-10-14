import React from "react";
import { Line } from "react-chartjs-2";

/* For testing LineCharts in Chart.js*/
function LineChart() {
  // Colors
  const yellow = "rgba(255, 200, 100, 0.2)";
  const pink = "rgba(235, 49, 170, 0.2)";
  const green = "rgba(100, 200, 100, 0.2)";
  const blue = "rgba(100, 100, 200, 0.2)";

  const color1 = blue;
  const color2 = green;

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
    datasets: [
      {
        label: "2019",
        data: [4, -5, 0, 6, 7, 21, 12, 18],
        borderColor: color1,
        backgroundColor: color1,
        pointBackgroundColor: color1,
        pointBorderColor: color1,
      },
      {
        label: "2020",
        data: [5, -3, -5, 3, 9, 18, 16, 19],
        borderColor: color2,
        backgroundColor: color2,
        pointBackgroundColor: color2,
        pointBorderColor: color2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    title: { display: true, text: "Average temperature in Trondheim (°C)" },
    scales: {
      yAxes: [
        {
          ticks: {
            min: -10,
            max: 25,
            stepSize: 5,
          },
        },
      ],
    },
  };

  return (
    <div className="chart-container">
      <Line className="chart" data={data} options={options}></Line>
    </div>
  );
}

export default LineChart;
