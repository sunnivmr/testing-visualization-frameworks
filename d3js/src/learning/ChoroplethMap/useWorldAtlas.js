import { useState, useEffect } from "react";
import { json } from "d3";
import { feature, mesh } from "topojson";

const jsonUrl = "http://unpkg.com/world-atlas@2.0.2/countries-50m.json";

export const useWorldAtlas = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    json(jsonUrl).then((topology) => {
      const { countries } = topology.objects;
      setData({
        countries: feature(topology, countries),
        interiors: mesh(topology, countries),
      });
    });
  }, []);

  return data;
};
