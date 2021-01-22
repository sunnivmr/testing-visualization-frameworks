import { useState, useEffect } from "react";

export function useData(fromDate, untilDate, dataType) {
  const [measurementsData, setMeasurementsData] = useState([]);
  const [inputMeasurementsData, setInputMeasurementsData] = useState([]);
  const [dataDescription, setDataDescription] = useState("");

  useEffect(() => {
    // Retrieve data from API
    // Returns measurements-array with data
    async function getDataFromAPI() {
      const urlData = `http://ibmrisvol.ibm.ntnu.no/data?from=${fromDate}T00%3A00%3A00&until=${untilDate}T00%3A10%3A00&identifier=${dataType}`;
      const response = await fetch(urlData);
      const data = await response.json();
      return data.data[0].measurements;
    }

    // Retrieve info about data type from API
    // Returns description of data type selected
    async function getInfoFromAPI() {
      const urlInfo = `http://ibmrisvol.ibm.ntnu.no/data/info?id=${dataType}`;
      const response = await fetch(urlInfo);
      const info = await response.json();
      return info.description;
    }

    // Wait until both API calls are finished, then set states
    Promise.all([getDataFromAPI(), getInfoFromAPI()]).then((values) => {
      setMeasurementsData(values[0]);
      setDataDescription(values[1]);
    });

    // Return measurements
    var measurements = measurementsData.map((data) => Number(data.measurement));

    // Return timestamps
    const timestamps = measurementsData.map((data) =>
      data.time_stamp_utc.substring(11, 16)
    );
    // Build the data for input with the first item being the description
    inputMeasurementsData[0] = dataDescription;

    measurements.map((data, i) =>
      inputMeasurementsData.push({
        timestamp: timestamps[i],
        measurement: measurements[i],
      })
    );
  }, []);

  return inputMeasurementsData;
}
