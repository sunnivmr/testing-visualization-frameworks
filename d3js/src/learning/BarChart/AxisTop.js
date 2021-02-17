export const AxisTop = ({ xScale, innerHeight, tickFormat }) =>
  xScale.ticks().map((tickValue) => (
    <g key={tickValue} transform={`translate(${xScale(tickValue)},0)`}>
      <text className={"tick-text-x"} y={-10} dy={".5em"}>
        {tickFormat(tickValue)}
      </text>
    </g>
  ));
