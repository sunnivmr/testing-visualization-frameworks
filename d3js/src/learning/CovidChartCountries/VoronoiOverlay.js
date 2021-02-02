import { useMemo } from "react";
import { Delaunay } from "d3";

export const VoronoiOverlay = ({
  allData,
  innerWidth,
  innerHeight,
  lineGenerator,
  onHover,
}) => {
  return useMemo(() => {
    console.log("memoized");
    const points = allData.map((d) => [
      lineGenerator.x()(d),
      lineGenerator.y()(d),
    ]);
    const delaunay = Delaunay.from(points);
    const voronoi = delaunay.voronoi([0, 0, innerWidth, innerHeight]);
    return (
      <g className="voronoi">
        {points.map((point, i) => (
          <path
            onMouseEnter={() => onHover(allData[i])}
            key={i}
            d={voronoi.renderCell(i)}
          />
        ))}
      </g>
    );
  }, [allData, lineGenerator, innerWidth, innerHeight, onHover]);
};
