import React from "react";

class FetchData extends React.Component {
  state = {
    loading: true,
    graphData: null,
    dataDescription: "",
  };

  async componentDidMount() {
    const url = "http://ibmrisvol.ibm.ntnu.no/data/info?id=1";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({
      graphData: data,
      dataDescription: data.description,
      loading: false,
    });
    console.log(data);
  }

  render() {
    return (
      <div>
        {this.state.loading || !this.state.graphData ? (
          <div>Loading...</div>
        ) : (
          <div>Datatype loaded: {this.state.dataDescription}</div>
        )}
      </div>
    );
  }
}

export default FetchData;
