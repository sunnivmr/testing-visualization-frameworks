export const ColorLegend = ({
  colorScale,
  tickSpacing = 20,
  tickSize = 7,
  tickTextOffset = 12,
  onHover,
  hoveredValue,
  faceOpacity,
}) =>
  colorScale.domain().map((domainValue, i) => (
    <g
      key={i}
      className="color-legend"
      transform={`translate(-17, ${i * tickSpacing + 20})`}
      onMouseEnter={() => {
        onHover(domainValue);
      }}
      onMouseOut={() => {
        onHover(null);
      }}
      opacity={hoveredValue && domainValue !== hoveredValue ? faceOpacity : 1}
    >
      <circle r={tickSize} fill={colorScale(domainValue)} />
      <text x={tickTextOffset} dy=".32em">
        {domainValue}
      </text>
    </g>
  ));
