export const Marks = ({
  data,
  xScale,
  xValue,
  yValue,
  yScale,
  colorScale,
  colorValue,
  tooltipFormat,
  circleRadius = 7,
}) =>
  data.map((d, i) => (
    <circle
      key={i}
      cx={xScale(xValue(d))}
      cy={yScale(yValue(d))}
      fill={colorScale(colorValue(d))}
      r={circleRadius}
    >
      <title>{tooltipFormat(xValue(d))}</title>
    </circle>
  ));
