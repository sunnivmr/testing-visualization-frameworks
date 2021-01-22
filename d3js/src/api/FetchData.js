import React, { useState, useEffect } from "react";

function FetchData() {
  const [loading, setLoading] = useState(true);
  const [graphData, setGraphData] = useState(null);
  const [dataDescription, setDataDescription] = useState("");

  useEffect(() => {
    async function getData() {
      const url = "http://ibmrisvol.ibm.ntnu.no/data/info?id=1";
      const response = await fetch(url);
      const data = await response.json();
      setGraphData(data);
      setDataDescription(data.description);
      setLoading(false);
    }
    getData();
  }, []);
  console.log(graphData);

  return (
    <div>
      {loading || !graphData ? (
        <div>Loading...</div>
      ) : (
        <div>Datatype loaded: {dataDescription}</div>
      )}
    </div>
  );
}

export default FetchData;
