import React from "react";
import "./App.css";
import LineChart from "./components/LineChart";
import BarChart from "./components/BarChart";

function App() {
  return (
    <div className="App">
      <div className="title">
        <h1>Chart.js testing</h1>
      </div>
      <div className="text">
        <p>Testing Chart.js framework for Master's Thesis</p>
      </div>
      <div className="chart">
        <LineChart />
        <BarChart />
      </div>
      <div className="text aligned-left">
        <p>by Sunniva Mathea Runde and Kaja Løvsjø Solberg</p>
      </div>
    </div>
  );
}

export default App;
