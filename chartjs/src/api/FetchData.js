import React from "react";

class FetchData extends React.Component {
  state = {
    loading: true,
    graphData: null,
  };

  async componentDidMount() {
    const url = "http://ibmrisvol.ibm.ntnu.no/";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ graphData: data.results[0], loading: false });
    console.log(data.results[0]);
  }

  render() {
    return (
      <div>
        {this.state.loading || !this.state.graphData ? (
          <div>Loading...</div>
        ) : (
          <div>Data is loaded</div>
        )}
      </div>
    );
  }
}

export default FetchData;
