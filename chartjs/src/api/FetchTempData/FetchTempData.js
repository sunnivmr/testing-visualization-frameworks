import React from "react";
import styles from "./FetchTempData.scss";

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
      measurements: data.data[0].measurements,
      loading: false,
    });
    console.log(data);
    console.log(this.state.graphData);
  }

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    }

    if (!this.state.dataType) {
      return <div>No data available</div>;
    }

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

        <div className="measurements">
          {this.state.measurements.map((measurement) => (
            <div key={measurement.time_stamp_utc} className="measurement">
              {measurement.time_stamp_utc}: {measurement.measurement}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default FetchTempData;
