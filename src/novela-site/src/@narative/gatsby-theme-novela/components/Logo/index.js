import React from "react";

/**
 * Paste in your SVG logo and return it from this component.
 * Make sure you have a height set for your logo.
 * It is recommended to keep the height within 25-35px.
 * Logo comes with a property value called `fill`. `fill` is useful
 * when you want to change your logo depending on the theme you are on.
 */
export default function Logo({ fill }) {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      className="Logo__Desktop"
      width="60.000000pt"
      height="60.000000pt"
      viewBox="0 0 60.000000 60.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        transform="translate(0.000000,60.000000) scale(0.100000,-0.100000)"
        fill={fill}
        stroke="none"
      >
        <path d="M50 440 l0 -110 110 0 110 0 0 110 0 110 -110 0 -110 0 0 -110z" />
        <path d="M330 440 l0 -110 110 0 110 0 0 110 0 110 -110 0 -110 0 0 -110z" />
        <path d="M50 160 l0 -110 110 0 110 0 0 110 0 110 -110 0 -110 0 0 -110z" />
      </g>
    </svg>
  );
}
