export const AxisBottom = ({ xScale, innerHeight, tickFormat }) =>
  xScale.ticks().map((tickValue) => (
    <g key={tickValue} transform={`translate(${xScale(tickValue)},0)`}>
      <line y2={innerHeight} className={"tick-line"} />
      <text className={"tick-text-x"} y={innerHeight + 5} dy={".5em"}>
        {tickFormat(tickValue)}
      </text>
    </g>
  ));
