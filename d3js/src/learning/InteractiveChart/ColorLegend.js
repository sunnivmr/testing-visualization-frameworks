export const ColorLegend = ({
  colorScale,
  tickSpacing = 20,
  tickSize = 7,
  tickTextOffset = 12,
}) =>
  colorScale.domain().map((domainValue, i) => (
    <g
      className="legend-text"
      transform={`translate(-17, ${i * tickSpacing + 20})`}
    >
      <circle r={tickSize} fill={colorScale(domainValue)} />
      <text x={tickTextOffset} dy=".32em">
        {domainValue}
      </text>
    </g>
  ));
