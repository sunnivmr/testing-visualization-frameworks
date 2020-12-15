import React from "react";
import LineChartWProps from "../../components/LineChart/LineChartWProps";

import "./TempData.scss";

class TempData extends React.Component {
  state = {
    loading: true,
    dataType: "",
    measurements: [],
    dateFrom: null,
    dateUntil: null,
    dataDescription: "",
  };

  async componentDidMount() {
    const url =
      "http://ibmrisvol.ibm.ntnu.no/data?from=2020-10-03T14%3A00%3A00&until=2020-10-03T14%3A10%3A00&identifier=1";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({
      fromDate: data.from_date,
      untilDate: data.until_date,
      dataType: data.data[0].data_info,
      measurementsData: data.data[0].measurements,
      loading: false,
    });
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

    // Build the data for input
    var measurementsData = [];
    measurements.map((data, i) =>
      measurementsData.push({
        timestamp: timestamps[i],
        measurement: measurements[i],
      })
    );

    console.log(measurementsData);

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
          <div>
            <h4>Data type:</h4>
            <p>{this.state.dataType}</p>
          </div>
        </div>

        <div className="chart">
          <LineChartWProps
            data={measurementsData}
            xData="timestamp"
            yData="measurement"
            xLabel="Date"
            yLabel="Temperature"
            yFormat={(y) => y.toFixed(2)}
            xTickCount={4}
            yTickCount={5}
            interpolation="natural"
            title="Temperature changes in a timeframe (°C)"
            /*ref={chartRef}*/
          />

          {/*button>Export to PNG</button>*/}
        </div>
      </div>
    );
  }
}

export default TempData;
