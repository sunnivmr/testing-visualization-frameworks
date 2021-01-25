import { geoNaturalEarth1, geoPath, geoGraticule } from "d3";

import "./worldmap.scss";

const projection = geoNaturalEarth1();
const path = geoPath(projection);
const graticule = geoGraticule();

export const Marks = ({
  worldAtlas: { land, interiors },
  data,
  sizeScale,
  sizeValue,
}) => (
  <g className="marks">
    <path className="sphere" d={path({ type: "Sphere" })} />
    <path className="graticules" d={path(graticule())} />
    {land.features.map((feature, i) => (
      <path className="land" key={i} d={path(feature)} />
    ))}
    <path className="interiors" d={path(interiors)} />
    {data.map((d, i) => {
      const [x, y] = projection(d.coords);
      return (
        <circle cx={x} cy={y} key={i} r={sizeScale(sizeValue(d))}>
          <title>
            {d["Total Dead and Missing"] +
              " reported missing on " +
              d["Reported Date"]}
          </title>
        </circle>
      );
    })}
  </g>
);
