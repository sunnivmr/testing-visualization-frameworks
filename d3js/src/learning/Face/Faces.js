import React from "react";
import { range } from "d3";
import { Face } from "./Face";

const width = 130;
const height = 130;
const yellow = "rgba(255, 230, 83, 1)";

const array = range(4 * 3);

export const Faces = () => {
  return (
    <div className="chart-section">
      <h4 className="chart-title">Smileyfaces</h4>
      <div className="faces">
        {array.map((face, index) => (
          <Face
            key={index}
            color={yellow}
            width={width}
            height={height}
            centerX={width / 2}
            centerY={height / 2}
            strokeWidth={0}
            eyeOffsetX={20 + Math.random() * 9}
            eyeOffsetY={20 + Math.random() * 15}
            eyeRadius={5 + Math.random() * 10}
            mouthWidth={7 + Math.random() * 9}
            mouthRadius={30 + Math.random() * 5}
          />
        ))}
      </div>
    </div>
  );
};
