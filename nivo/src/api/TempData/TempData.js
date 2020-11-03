import React from "react";
import styles from "./TempData.scss";
import LineChartWithProps from "../../components/LineChart/LineChartWProps";

class TempData extends React.Component {
  state = {
    loading: true,
    measurementsData: [],
    dataType: null,
    dateFrom: null,
    dateUntil: null,
    dataDescription: "",
    config: null,
  };

  async componentDidMount() {
    const url =
      "http://ibmrisvol.ibm.ntnu.no/data?from=2020-03-01T03%3A00%3A00&until=2020-03-01T03%3A10%3A00&identifier=1";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({
      fromDate: data.from_date,
      untilDate: data.until_date,
      dataType: data.data[0].data_info,
      measurementsData: data.data[0].measurements,
      loading: false,
    });
    console.log(this.state.measurementsData);
  }

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    }

    if (!this.state.dataType) {
      return <div>No data available</div>;
    }

    // Return measurements
    const measurements = this.state.measurementsData.map((data) =>
      Number(data.measurement)
    );

    // Return timestamps
    const timestamps = this.state.measurementsData.map((data) =>
      data.time_stamp_utc.substring(11, 16)
    );

    // Create array with objects to match input for ResponsiveLine
    const data = [];
    timestamps.forEach((timestamp, i) => data.push({x: [timestamp], y:measurements[i]})); 

/*
    timestamps.forEach((timestamp, i) => data[timestamp] = measurements[i]); 
    dataArray.push(dataObject);*/

    console.log(data);


    // Set config
    const config = {
      keys: "y",
      margin: {
        top: 50,
        right: 130,
        bottom: 50,
        left: 60,
      },
      yScale:{
        type: "linear", stacked: true, reverse: false,
        min: 0.169, max: 0.173
      },
      axisLeft: {
        tickValues: 5
    }}

    /*
    // Reference to export png
    const chartRef = useRef(null);
    const base64Image = chartRef.current.chartInstance.toBase64Image();*/

    return (
      <div className="apidata">
        <div className="data-info">
          <div>
            <h4>From: </h4>
            <p>{this.state.fromDate}</p>
          </div>
          <div>
            <h4>Until: </h4>
            <p>{this.state.untilDate}</p>
          </div>
        </div>

        <div className="chart">
          {console.log(data)}
          <LineChartWithProps
            data={data} config={config}
          />

          {/*button>Export to PNG</button>*/}
        </div>
      </div>
    );
  }
}

export default TempData;
