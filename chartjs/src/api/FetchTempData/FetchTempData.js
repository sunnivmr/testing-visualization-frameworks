import React from "react";
import styles from "./FetchTempData.scss";
import LineChartWithProps from "../../components/LineChart/LineChartWProps";

class FetchTempData extends React.Component {
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
    console.log(data);
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

        <div className="measurements"></div>

        <div className="chart">
          <LineChartWithProps
            measurements={measurements}
            timestamps={timestamps}
            title={"Temperature measurements in a timeframe (°C)"}
            label={"Temperature"}
            color={"rgba(100, 200, 100, 0.2)"}
            stepSize={0.005}
          />
        </div>
      </div>
    );
  }
}

export default FetchTempData;
