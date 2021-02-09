import React from "react";
import { range } from "d3";
import { Face } from "./Face";

const width = 100;
const height = 100;
const yellow = "rgba(255, 230, 83, 1)";

const array = range(4 * 3);

export const Faces = () => {
  return (
    <div className="chart-section">
      <h4 className="section-title">Smileyfaces</h4>
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
            eyeOffsetX={13 + Math.random() * 9}
            eyeOffsetY={10 + Math.random() * 10}
            eyeRadius={3 + Math.random() * 6}
            mouthWidth={3 + Math.random() * 9}
            mouthRadius={20 + Math.random() * 5}
          />
        ))}
      </div>
    </div>
  );
};
