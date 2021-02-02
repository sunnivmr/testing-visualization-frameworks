import React from "react";
// import { Faces } from "./learning/Face/Faces";
// import { ColorData } from "./learning/ColorData/ColorData";
// import { BarChart } from "./learning/BarChart/BarChart";
// import { ScatterPlot } from "./learning/ScatterPlot/ScatterPlot";
// import { LineChart } from "./learning/LineChart/LineChart";

// import { InteractiveChart } from "./learning/InteractiveChart/InteractiveChart";
// import { WorldMap } from "./learning/WorldMap/WorldMap";
// import { MissingMigrants } from "./learning/MissingMigrants/MissingMigrants";
// import { MissingMigrantsMap } from "./learning/MissingMigrantsMap/MissingMigrantsMap";
// import { MissingMigrantsCombined } from "./learning/MissingMigrantsCombined/MissingMigrantsCombined";
// import { ChoroplethMap } from "./learning/ChoroplethMap/ChoroplethMap";
import { CovidLineChart as CovidLineChartCountries } from "./learning/CovidChartCountries/CovidLineChart";
import { CovidLineChart } from "./learning/CovidChart/CovidLineChart";

// import TempData from "./api/TempData/TempData";

//import { LineChartWProps } from "./components/LineChartWProps/LineChartWProps";

import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="title">
          <h1>D3.js testing</h1>
        </div>
        <div className="text">
          <p>Testing D3.js library for Master's Thesis 2020/2021</p>
        </div>
        <div className="section-title">
          <h2>Learn D3.js</h2>
        </div>
        <div className="chart-grid">
          {/**<Faces />
          <ColorData />**/}
        </div>
        <div className="section-title">
          <h2>Advanced charts</h2>
        </div>
        <div className="chart-grid">
          <CovidLineChartCountries />
          <CovidLineChart />
          {/*<ChoroplethMap />
          <MissingMigrantsCombined />
          <WorldMap />
          <InteractiveChart />*/}
        </div>
        {/*
        <div className="section-title">
          <h2>Basic charts</h2>
        </div>
        <div className="chart-grid">
          <BarChart />
          <ScatterPlot />
          <LineChart />
        </div>

        <div className="section-title">
          <h2>Multiple axes charts</h2>
        </div>
        <div className="chart-grid multiple-axes-charts"></div>
        <div className="api-chart">
          <div className="section-title">
            <h2>Data from API</h2>
          </div>
          <LineChartWProps />
        </div>/
        <div className="text aligned-left">
          <p>Sunniva Mathea Runde, Kaja Løvsjø Solberg</p>
        </div>*/}
      </div>
    );
  }
}

export default App;
