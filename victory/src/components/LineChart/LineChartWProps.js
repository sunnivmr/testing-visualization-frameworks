import React from "react";
import { VictoryChart, VictoryAxis, VictoryLine, VictoryLabel } from "victory";

/* For testing LineCharts in Victory*/
function LineChartWProps(props) {
  // Colors
  const yellow = "rgba(255, 200, 100, 0.5)";
  const pink = "rgba(235, 49, 170, 0.5)";
  const green = "rgba(100, 200, 100, 0.5)";
  const blue = "rgba(50, 150, 200, 0.5)";

  // Data
  /*
  const data = [
    {
      id: "tempdata",
      data: props.data,
    },
  ];*/

  const lineStyle = {
    data: {
      stroke: pink,
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

  return (
    <div className="chart-container">
      <h4>{props.title}</h4>
      <VictoryChart domainPadding={30} padding={chartPadding}>
        <VictoryAxis
          tickCount={props.xTickCount}
          tickFormat={props.xFormat}
          label={props.xLabel}
          style={xAxisStyle}
        />
        <VictoryAxis
          dependentAxis
          tickCount={props.yTickCount}
          tickFormat={props.yFormat}
          label={props.yLabel}
          style={yAxisStyle}
        />
        <VictoryLine
          interpolation={props.interpolation}
          style={lineStyle}
          data={props.data}
          y={props.yData}
          x={props.xData}
        />
      </VictoryChart>
    </div>
  );
}

export default LineChartWProps;
