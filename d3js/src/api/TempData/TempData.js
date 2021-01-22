import React, { useState, useEffect } from "react";

import "./TempData.scss";

function TempData() {
  const [loading, setLoading] = useState(true);
  const [dataType, setDataType] = useState("");
  const [measurementsData, setMeasurementsData] = useState([]);
  const [dateFrom, setDateFrom] = useState(null);
  const [dateUntil, setDateUntil] = useState(null);
  const [dataDescription, setDataDescription] = useState("");

  useEffect(() => {
    // Retrieve data from API
    async function getData() {
      const urlData =
        "http://ibmrisvol.ibm.ntnu.no/data?from=2020-10-03T14%3A00%3A00&until=2020-10-03T14%3A10%3A00&identifier=1";
      const response = await fetch(urlData);
      const data = await response.json();
      setLoading(false);
      setDataType(data.data[0].data_info);
      setMeasurementsData(data.data[0].measurements);
      setDateFrom(data.from_date);
      setDateUntil(data.until_date);
    }

    // Retrieve info about data type from API
    async function getInfo() {
      const urlInfo = "http://ibmrisvol.ibm.ntnu.no/data/info?id=1";
      const response = await fetch(urlInfo);
      const info = await response.json();
      setDataDescription(info.description);
    }
    getData();
    getInfo();
  }, []);

  if (loading) {
    return <div>Loading data...</div>;
  }

  if (!dataType) {
    return <div>No data available</div>;
  }

  // Return measurements
  const measurements = measurementsData.map((data) => Number(data.measurement));

  // Return timestamps
  const timestamps = measurementsData.map((data) =>
    data.time_stamp_utc.substring(11, 16)
  );

  // Build the data for input
  var inputMeasurementsData = [];
  measurements.map((data, i) =>
    inputMeasurementsData.push({
      timestamp: timestamps[i],
      measurement: measurements[i],
    })
  );

  return (
    <div className="apidata">
      <div className="data-info">
        <div>
          <h4>From: </h4>
          <p>{dateFrom}</p>
        </div>
        <div>
          <h4>Until: </h4>
          <p>{dateUntil}</p>
        </div>
        <div>
          <h4>Data type:</h4>
          <p>
            {dataType} {dataDescription}
          </p>
        </div>
      </div>

      <div className="chart"></div>
    </div>
  );
}

export default TempData;
