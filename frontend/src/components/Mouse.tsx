import * as React from "react";

import { Cursor, midpointType } from "../types";

import { getPolarDegree } from "../helpers/calc";

interface MouseProps {
  c: Cursor;
  index: number;
  midpointCoordinate: midpointType;
}

const Mouse: React.FC<MouseProps> = ({ c, index, midpointCoordinate }) => {
  return (
    <div
      key={index}
      style={{
        position: "absolute",
        top: c ? c.y - 12 : undefined,
        left: c ? c.x - 12 : undefined,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "24px",
          width: "24px",
          border: "1px solid red",
          transform: `rotate(${
            getPolarDegree({ x: c.x, y: c.y }, midpointCoordinate) + "deg"
          })`,
          transformOrigin: "center center",
        }}
      >
        <svg
          style={{ height: "24", width: "24" }}
          xmlns="http://www.w3.org/2000/svg"
          x="0"
          y="0"
          version="1.1"
          viewBox="0 0 24 24"
          xmlSpace="preserve"
          strokeWidth={2}
          stroke={"#" + c.color}
        >
          <path
            fill={"#" + c.color}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          ></path>
        </svg>
      </div>
      {c.name !== "" ? <span>{c.name}</span> : null}
      {c.rotation ? <span>{c.rotation}</span> : null}
    </div>
  );
};

export default Mouse;
