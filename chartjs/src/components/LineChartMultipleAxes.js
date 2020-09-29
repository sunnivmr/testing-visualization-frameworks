import React from "react";
import { Line } from "react-chartjs-2";

/* For testing LineCharts with multiple axes in Chart.js*/
function LineChartMultipleAxes() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
    datasets: [
      {
        label: "2019",
        data: [4, -5, 0, 6, 7, 21, 12, 18],
        borderColor: ["rgba(255, 200, 100, 0.2)"],
        backgroundColor: ["rgba(255, 200, 100, 0.2)"],
        pointBackgroundColor: "rgba(255, 200, 100, 0.2)",
        pointBorderColor: "rgba(255, 200, 100, 0.2)",
        yAxisID: "first-y-axis",
      },
      {
        label: "2020",
        data: [5, -3, -5, 3, 9, 18, 16, 19],
        borderColor: ["rgba(235, 49, 170, 0.2)"],
        backgroundColor: ["rgba(235, 49, 170, 0.2)"],
        pointBackgroundColor: "rgba(235, 49, 170, 0.2)",
        pointBorderColor: "rgba(235, 49, 170, 0.2)",
        yAxisID: "second-y-axis",
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
          id: "first-y-axis",
          ticks: {
            min: -10,
            max: 25,
            stepSize: 10,
          },
        },
        {
          id: "second-y-axis",
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

export default LineChartMultipleAxes;
