import React from "react";
import { Bar } from "react-chartjs-2";

/* For testing BarCharts with multiple axes in Chart.js*/
function BarChartMultipleAxes() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
    datasets: [
      {
        label: "2019",
        data: [130, 100, 90, 200, 70, 25, 10, 48],
        backgroundColor: "rgba(255, 200, 100, 0.2)",
        yAxisID: "first-y-axis",
        xAxisID: "first-x-axis",
      },
      {
        label: "2020",
        data: [150, 125, 70, 150, 100, 30, 40, 75],
        backgroundColor: "rgba(235, 49, 170, 0.2)",
        yAxisID: "second-y-axis",
        xAxisID: "first-x-axis",
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
          id: "first-y-axis",
          ticks: {
            min: 0,
            max: 350,
            stepSize: 50,
          },
        },
        {
          id: "second-y-axis",
          ticks: {
            min: 0,
            max: 350,
            stepSize: 25,
          },
          position: "right",
        },
      ],
      xAxes: [
        {
          id: "first-x-axis",
        },
      ],
    },
  };

  return (
    <div className="chart-container">
      <Bar className="chart" data={data} options={options}></Bar>
      <button>Export to PNG</button>
    </div>
  );
}

export default BarChartMultipleAxes;