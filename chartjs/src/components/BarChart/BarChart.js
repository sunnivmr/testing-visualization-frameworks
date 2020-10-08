import React from "react";
import { Bar } from "react-chartjs-2";

/* For testing BarCharts in Chart.js*/
function BarChart() {
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
        data: [130, 100, 90, 200, 70, 25, 10, 48],
        backgroundColor: color1,
      },
      {
        label: "2020",
        data: [150, 125, 70, 150, 100, 30, 40, 75],
        backgroundColor: color2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    title: { display: true, text: "Average rainfall in Trondheim (mm)" },
    scales: {
      yAxes: [
        {
          ticks: {
            min: 0,
            max: 250,
            stepSize: 50,
          },
        },
      ],
    },
  };

  return (
    <div className="chart-container">
      <Bar data={data} className="chart" options={options}></Bar>
    </div>
  );
}

export default BarChart;
