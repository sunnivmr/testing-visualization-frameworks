import React from "react";

import FetchData from "./api/FetchData";

import BarChart from "./components/BarChart/BarChart";
import LineChart from "./components/LineChart/LineChart";

import BarChartMultipleAxes from "./components/BarChart/BarChartMultipleAxes";
import LineChartMultipleAxes from "./components/LineChart/LineChartMultipleAxes";


import "./App.css";
import "./style/chart.css";
import TempData from "./api/TempData/TempData";

function App() {
  return (
    <div className="App">
      <div className="title">
        <h1>Nivo testing</h1>
      </div>
      <div className="text">
        <p>Testing Nivo framework for Master's Thesis 2020/2021</p>
      </div>
      <div className="charts-title">
        <h2>Normal charts</h2>
      </div>
      <div className="chart-grid normal-charts">
        <LineChart />
        <BarChart />
      </div>
      
      <div className="charts-title">
        <h2>Multiple axes charts</h2>
        <div className="chart-grid normal-charts">
        <BarChartMultipleAxes/>
        <LineChartMultipleAxes/></div>
      </div>
      <div className="chart-grid multiple-axes-charts"></div>
      <div className="api-chart">
        <div className="charts-title">
          <h2>Data from API</h2>
        </div>
        <FetchData/>
        <TempData/>
      </div>
      <div className="text aligned-left">
        <p>Sunniva Mathea Runde, Kaja Løvsjø Solberg</p>
      </div>
    </div>
  );
}

export default App;
