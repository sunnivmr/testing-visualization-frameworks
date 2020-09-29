import React from "react";
import "./App.css";
import LineChart from "./components/LineChart";
import BarChart from "./components/BarChart";
import LineChartMultipleAxes from "./components/LineChartMultipleAxes";
import BarChartMultipleAxes from "./components/BarChartMultipleAxes";

function App() {
  return (
    <div className="App">
      <div className="title">
        <h1>Chart.js testing</h1>
      </div>
      <div className="text">
        <p>Testing Chart.js framework for Master's Thesis 2020/2021</p>
      </div>
      <div className="chart-title">
        <h2>Normal charts</h2>
      </div>
      <div className="chart-grid normal-charts">
        <LineChart />
        <BarChart />
      </div>
      <div className="chart-title">
        <h2>Multiple axes charts</h2>
      </div>
      <div className="chart-grid multiple-axes-charts">
        <LineChartMultipleAxes />
        <BarChartMultipleAxes />
      </div>

      <div className="text aligned-left">
        <p>Sunniva Mathea Runde, Kaja Løvsjø Solberg</p>
      </div>
    </div>
  );
}

export default App;
