const width = 15;
const height = 15;

const legendXOffset = 150;
const legendYOffset = 0;

const maxNumberXOffset = legendXOffset - 5;
const midNumberXOffset = maxNumberXOffset / 2;
const minNumberXOffset = 0;
const numberYOffset = -3;

const titleOffset = { x: 0, y: 30 };

const range = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];

export const ColorLegend = ({
  colorScale,
  colorLegendText,
  margin,
  maxNumber,
  minNumber,
}) => {
  const midNumber = maxNumber / 2;

  return (
    <g
      className="color-legend"
      transform={`translate(${margin.left}, ${margin.top})`}
    >
      {range.map((number, i) => (
        <rect
          key={i}
          width={width}
          height={height}
          fill={colorScale(number)}
          transform={`translate(${number * legendXOffset}, ${legendYOffset})`}
        />
      ))}
      <text transform={`translate(${minNumberXOffset}, ${numberYOffset})`}>
        {parseInt(minNumber)}
      </text>
      <text transform={`translate(${midNumberXOffset}, ${numberYOffset})`}>
        {parseInt(midNumber)}
      </text>
      <text transform={`translate(${maxNumberXOffset}, ${numberYOffset})`}>
        {">" + parseInt(maxNumber)}
      </text>
      <text
        transform={`translate(${titleOffset.x}, ${titleOffset.y})`}
        className="title"
      >
        {colorLegendText}
      </text>
    </g>
  );
};
