import React, { Component } from "react";

import * as d3 from "d3";

export default class Face extends React.Component {
  constructor(props) {
    super(props);
    this.myFace = React.createRef();
    this.yellow = "rgba(255, 230, 83, 1)";
    this.pink = "rgba(235, 49, 170, 1)";
    this.green = "rgba(100, 200, 100, 0.5)";
    this.blue = "rgba(100, 180, 250, 1)";
  }

  componentDidMount() {
    let width = 500;
    let height = 500;

    let svg = d3
      .select(this.myFace.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const group = svg
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const circle = group
      .append("circle")
      .attr("r", 200)
      .attr("fill", this.yellow);

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
  }

  render() {
    return (
      <div className="chart-section">
        <h4 className="chart-title">Face</h4>
        <div className="face" ref={this.myFace} />
      </div>
    );
  }
}
