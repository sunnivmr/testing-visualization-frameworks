import React, { Component } from "react";
import { VictoryChart, VictoryAxis, VictoryBar } from "victory";

const data = [
  {
    time_stamp_utc: "2020-10-16T09:00:00",
    measurement: 110,
  },
  {
    time_stamp_utc: "2020-10-16T09:01:00",
    measurement: 115,
  },
  {
    time_stamp_utc: "2020-10-16T09:02:00",
    measurement: 187,
  },
  {
    time_stamp_utc: "2020-10-16T09:03:00",
    measurement: 112,
  },
];

const yellow = "rgba(255, 200, 100, 0.5)";
const pink = "rgba(235, 49, 170, 0.5)";
const green = "rgba(100, 200, 100, 0.5)";
const blue = "rgba(100, 100, 200, 0.5)";

const style = {
  data: {
    fill: blue,
  },
};

const xAxisStyle = {
  axisLabel: {
    padding: 35,
  },
};

const secondYAxisStyle = {
  axisLabel: {
    padding: 45,
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

export default class BarChart extends Component {
  render() {
    return (
      <div>
        <h4>Average rainfall</h4>
        <VictoryChart domainPadding={20} padding={chartPadding}>
          <VictoryAxis
            style={xAxisStyle}
            tickCount={3}
            tickFormat={(x) => x.slice(11, 16)}
            label="Time (h:s)"
          />
          <VictoryAxis
            style={yAxisStyle}
            dependentAxis
            tickCount={5}
            label="Rainfall (mm)"
          />
          <VictoryAxis
            style={secondYAxisStyle}
            dependentAxis
            offsetX={390}
            tickCount={7}
            label="Rainfall (cm)"
            tickFormat={(y) => y / 10}
          />
          <VictoryBar
            style={style}
            data={data}
            x="time_stamp_utc"
            y="measurement"
          />
        </VictoryChart>
      </div>
    );
  }
}
