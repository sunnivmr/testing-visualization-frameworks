export const Marks = ({ data, xScale, yScale, tooltipFormat, innerHeight }) => (
  <>
    {data.map((d, i) => (
      <rect
        key={i}
        className="mark-circle"
        x={xScale(d.x0)}
        y={yScale(d.y)}
        width={xScale(d.x1) - xScale(d.x0)}
        height={innerHeight - yScale(d.y)}
      >
        <title>{d.y + " migrants"}</title>
      </rect>
    ))}
  </>
);
