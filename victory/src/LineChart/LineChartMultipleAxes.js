import React, { Component } from "react";
import { VictoryChart, VictoryAxis, VictoryLine, VictoryLabel } from "victory";

const data = [
  {
    time_stamp_utc: "2020-10-16T09:00:00",
    measurement: 5.201,
  },
  {
    time_stamp_utc: "2020-10-16T09:01:00",
    measurement: 5.253,
  },
  {
    time_stamp_utc: "2020-10-16T09:02:00",
    measurement: 5.228,
  },
  {
    time_stamp_utc: "2020-10-16T09:03:00",
    measurement: 5.233,
  },
  {
    time_stamp_utc: "2020-10-16T09:04:00",
    measurement: 5.216,
  },
  {
    time_stamp_utc: "2020-10-16T09:05:00",
    measurement: 5.219,
  },
];

const yellow = "rgba(255, 200, 100, 0.5)";
const pink = "rgba(235, 49, 170, 0.5)";
const green = "rgba(100, 200, 100, 0.5)";
const blue = "rgba(100, 100, 200, 0.5)";

const lineStyle = {
  data: {
    stroke: yellow,
  },
};

const xAxisStyle = {
  axisLabel: {
    padding: 35,
  },
};

const yAxisStyle = {
  axisLabel: {
    padding: 45,
  },
};

const chartPadding = {
  top: 0,
  right: 60,
  bottom: 60,
  left: 60,
};

export class LineChart extends Component {
  render() {
    return (
      <div>
        <h4>Air temperature</h4>
        <VictoryChart domainPadding={30} padding={chartPadding}>
          <VictoryAxis
            tickCount={5}
            tickFormat={(x) => x.slice(11, 16)}
            label="Time (h:s)"
            style={xAxisStyle}
          />
          <VictoryAxis
            dependentAxis
            tickCount={4}
            tickFormat={(y) => y.toFixed(2)}
            label="Temp (℃)"
            style={yAxisStyle}
          />
          <VictoryLine
            interpolation="natural"
            style={lineStyle}
            data={data}
            y="measurement"
            x="time_stamp_utc"
          />
        </VictoryChart>
      </div>
    );
  }
}

export default LineChart;
