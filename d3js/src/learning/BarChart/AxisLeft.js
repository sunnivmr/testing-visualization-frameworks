export const AxisLeft = ({ yScale }) =>
  yScale.domain().map((tickValue) => (
    <text
      key={tickValue}
      className={"tick-text-y"}
      x={-5}
      y={yScale(tickValue) + yScale.bandwidth() / 2}
      dy={".5em"}
    >
      {tickValue}
    </text>
  ));
