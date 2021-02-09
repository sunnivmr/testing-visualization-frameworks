import React, { useEffect } from "react";

import * as d3 from "d3";

export default function Face(props) {
  const myFace = React.createRef(); // Reference to element
  const yellow = "rgba(255, 230, 83, 1)"; // Smiley-yellow

  useEffect(() => {
    // Width and height of barchart-element
    let width = myFace.current.clientWidth;
    let height = myFace.current.clientHeight;

    let svg = d3
      .select(myFace.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const group = svg
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const circle = group.append("circle").attr("r", 200).attr("fill", yellow);

    const eyeSpacing = 70;
    const eyeYOffset = -50;
    const eyeRadius = 30;
    const eyebrowWidth = 60;
    const eyebrowHeight = 15;
    const eyebrowYOffset = eyeYOffset - eyebrowWidth / 3;

    const eyesGroup = group
      .append("g")
      .attr("transform", `translate(0, ${eyeYOffset})`);

    const leftEye = eyesGroup
      .append("circle")
      .attr("r", eyeRadius)
      .attr("cx", -eyeSpacing);

    const rightEye = eyesGroup
      .append("circle")
      .attr("r", eyeRadius)
      .attr("cx", +eyeSpacing);

    const eyebrowsGroup = eyesGroup
      .append("g")
      .attr("transform", `translate(0, ${eyebrowYOffset})`);

    eyebrowsGroup
      .transition()
      .duration(500)
      .attr("transform", `translate(0, ${eyebrowYOffset - 30})`)
      .transition()
      .duration(500)
      .attr("transform", `translate(0, ${eyebrowYOffset})`);

    const leftEyebrow = eyebrowsGroup
      .append("rect")
      .attr("x", -eyeSpacing - eyebrowWidth / 2)
      .attr("width", eyebrowWidth)
      .attr("height", eyebrowHeight);

    const rightEyebrow = eyebrowsGroup
      .append("rect")
      .attr("x", eyeSpacing - eyebrowWidth / 2)
      .attr("width", eyebrowWidth)
      .attr("height", eyebrowHeight);

    const mouth = group.append("path").attr(
      "d",
      d3.arc()({
        innerRadius: 120,
        outerRadius: 140,
        startAngle: Math.PI / 2 + 0.25,
        endAngle: (Math.PI * 3) / 2 - 0.25,
      })
    );
  }, []);

  return (
    <div className="chart-section">
      <h4 className="chart-title">Face</h4>
      <div className="face" ref={myFace} />
    </div>
  );
}
