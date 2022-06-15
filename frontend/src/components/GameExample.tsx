import * as React from "react";

import { Cursor, midpointType } from "../types";

import Mouse from "./Mouse";
import { Socket } from "socket.io-client";

interface GameExampleProps {
  cursors: Cursor[];
  midpointCoordinate: midpointType;
  socket: Socket;
}

const GameExample: React.FC<GameExampleProps> = ({
  cursors,
  midpointCoordinate,
  socket,
}) => {
  return (
    <>
      {cursors.map((c: Cursor, index) => {
        if (socket.id && c.socket === socket.id) return null;
        return <Mouse {...{ c, index, midpointCoordinate }} />;
      })}
    </>
  );
};

export default GameExample;
