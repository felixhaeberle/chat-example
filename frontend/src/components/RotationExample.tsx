import * as React from "react";

import { Cursor, midpointType } from "../types";

import Mouse from "./Mouse";
import { Socket } from "socket.io-client";

interface RotationExampleProps {
  cursors: Cursor[];
  midpointCoordinate: midpointType;
  socket: Socket;
  setCursor: (value: React.SetStateAction<Cursor | undefined>) => void;
}

const RotationExample: React.FC<RotationExampleProps> = ({
  cursors,
  midpointCoordinate,
  socket,
  setCursor,
}) => {
  /* Update cursors with midpoint and rotation */
  React.useEffect(() => {
    if (midpointCoordinate) {
      setCursor((prevState) =>
        prevState ? { ...prevState, midpoint: midpointCoordinate } : undefined
      );
    }
  }, [midpointCoordinate, setCursor]);

  return (
    <>
      {cursors.map((c: Cursor, index) => {
        if (socket.id && c.socket === socket.id) return null;
        return <Mouse {...{ c, index, midpointCoordinate }} />;
      })}
    </>
  );
};

export default RotationExample;
