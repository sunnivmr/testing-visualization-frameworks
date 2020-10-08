import React from "react";
import { Bar } from "react-chartjs-2";

/* For testing BarCharts with multiple axes in Chart.js*/
function BarChartMultipleAxes() {
  const yellow = "rgba(255, 200, 100, 0.2)";
  const pink = "rgba(235, 49, 170, 0.2)";
  const green = "rgba(100, 200, 100, 0.2)";
  const blue = "rgba(100, 100, 200, 0.2)";

  const color1 = pink;
  const color2 = yellow;

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
    datasets: [
      {
        label: "2019",
        data: [130, 100, 90, 200, 70, 25, 10, 48],
        backgroundColor: color1,
        yAxisID: "first-y-axis",
        xAxisID: "first-x-axis",
      },
      {
        label: "2020",
        data: [150, 125, 70, 150, 100, 30, 40, 75],
        backgroundColor: color2,
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
      <Bar className="chart" data={data} options={options} /*ref={chartRef}*/ />
      <p className="chart-info-text">One axis on each side.</p>
    </div>
  );
}

export default BarChartMultipleAxes;
