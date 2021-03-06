import "./App.css";
import BarChart from "./components/BarChart/BarChart";
import LineChart from "./components/LineChart/LineChart";
import BarChartMultipleAxes from "./components/BarChart/BarChartMultipleAxes";
import LineChartMultipleAxes from "./components/LineChart/LineChartMultipleAxes";
import TempData from "./api/TempData/TempData";

function App() {
  return (
    <div className="App">
      <div className="title">
        <h1>Victory testing</h1>
      </div>
      <div className="text">
        <p>Testing Victory framework for Master's Thesis 2020/2021</p>
      </div>
      <div className="chart-title">
        <h2>Normal charts</h2>
      </div>
      <div className="chart-grid normal-charts">
        <BarChart />
        <LineChart />
      </div>
      <div className="chart-title">
        <h2>Multiple axes charts</h2>
      </div>
      <div className="chart-grid multiple-axes-charts">
        <BarChartMultipleAxes />
        <LineChartMultipleAxes />
      </div>
      <div className="api-chart">
        <div className="chart-title">
          <h2>Data from API</h2>
          <TempData />
        </div>
      </div>
      <div className="text aligned-left">
        <p>Sunniva Mathea Runde, Kaja Løvsjø Solberg</p>
      </div>
    </div>
  );
}

export default App;
