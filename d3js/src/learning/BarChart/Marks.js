export const Marks = ({
  data,
  xScale,
  yScale,
  xValue,
  yValue,
  tooltipFormat,
}) =>
  data.map((d, i) => (
    <rect
      className="mark-bar"
      key={yValue(d)}
      x={0}
      y={yScale(yValue(d))}
      width={xScale(xValue(d))}
      height={yScale.bandwidth()}
    >
      <title>{tooltipFormat(xValue(d))}</title>
    </rect>
  ));
