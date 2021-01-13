export const ColorLegend = ({
  colorScale,
  tickSpacing = 20,
  tickSize = 7,
  tickTextOffset = 12,
  onHover,
}) =>
  colorScale.domain().map((domainValue, i) => (
    <g
      key={i}
      className="legend-text"
      transform={`translate(-17, ${i * tickSpacing + 20})`}
      onMouseEnter={() => {
        onHover(domainValue);
      }}
    >
      <circle r={tickSize} fill={colorScale(domainValue)} />
      <text x={tickTextOffset} dy=".32em">
        {domainValue}
      </text>
    </g>
  ));
