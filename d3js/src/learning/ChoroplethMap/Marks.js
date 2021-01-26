import { geoNaturalEarth1, geoPath, geoGraticule } from "d3";

import "./worldmap.scss";

const projection = geoNaturalEarth1();
const path = geoPath(projection);
const graticule = geoGraticule();

const missingDataColor = "white";
const strokeColor = "peru";
const strokeWidth = "0.02em";

export const Marks = ({
  worldAtlas: { countries, interiors },
  rowByNumericCode,
  colorScale,
  colorValue,
}) => (
  <g className="marks">
    {countries.features.map((feature, i) => {
      const d = rowByNumericCode.get(feature.id);
      return (
        <path
          fill={d ? colorScale(colorValue(d)) : missingDataColor}
          stroke={d ? strokeColor : "none"}
          strokeWidth={strokeWidth}
          className="country"
          key={i}
          d={path(feature)}
        >
          <title>
            {feature.properties.name +
              ": " +
              (d ? colorValue(d).toFixed(2) + "%" : "no data")}
          </title>
        </path>
      );
    })}
    <path className="interiors" d={path(interiors)} />
  </g>
);
