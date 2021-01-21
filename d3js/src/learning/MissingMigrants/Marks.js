import { line, curveNatural } from "d3";

export const Marks = ({
  data,
  xScale,
  yScale,
  xValue,
  yValue,
  tooltipFormat,
  circleRadius = 7,
}) => (
  <>
    {data.map((d, i) => (
      <circle
        key={i}
        className="mark-circle"
        cx={xScale(xValue(d))}
        cy={yScale(yValue(d))}
        r={circleRadius}
      >
        <title>{tooltipFormat(yValue(d))}</title>
      </circle>
    ))}
  </>
);
