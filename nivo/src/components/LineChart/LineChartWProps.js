import React from "react";
import { ResponsiveLine } from "@nivo/line";

/* For testing LineCharts in Chart.js*/
function LineChartWProps(props) {

  // Colors
  const yellow = "rgba(255, 200, 100, 0.5)";
  const pink = "rgba(235, 49, 170, 0.5)";
  const green = "rgba(100, 200, 100, 0.5)";
  const blue = "rgba(50, 150, 200, 0.5)";

  const config = props.config;
  /*const data = props.data;*/
  
  
  const data = [{
    id: 'tempdata',
    data: props.data,
  }];

  return (
    <div className="chart-container">
      <ResponsiveLine className="chart" data={data} keys={config.keys} margin={config.margin} legends={config.legends}
          colors={yellow}
          lineWidth={3}
          axisLeft={config.axisLeft}
          pointSize={10}
          pointColor={"white"}
          pointBorderColor={yellow}
          pointBorderWidth={2}
          enablePointLabel
          enableGridX={false} 
          yScale={config.yScale}
          curve={"cardinal"}/>
    </div>
  );
}

export default LineChartWProps;
