import { Cursor, CursorType, midpointType } from "./types";
import React, { useCallback, useEffect, useState } from "react";
// @ts-ignore
import { getSimilarColors, stringToColor } from "./helpers/colors";
import io, { Socket } from "socket.io-client";

import Name from "./components/Name";
import Rotation from "./components/Rotation";
import { calculateMidpointCoordinates } from "./helpers/calc";
import produce from "immer";

let socket: Socket;
const ENDPOINT =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4001"
    : "https://collaboration-lab.herokuapp.com/";

function App() {
  const [midpointCoordinate, setMidpointCoordinate] = useState<midpointType>();
  const [cursorType, setCursorType] = useState<CursorType>("rotation");
  const [cursor, setCursor] = useState<Cursor>();
  const [name, setName] = useState("");
  // eslint-disable-next-line
  const [cursors, setCursors] = useState<Cursor[]>([]);

  const handleCursorType = (type: CursorType) => {
    console.log("cursor type changed");

    // set own environment
    setCursorType(type);
  };

  const handleCursors = useCallback(
    (data: Cursor) => {
      setCursors(
        produce((draft) => {
          if (data && data.socket) {
            const cursor = draft.find((el) => el.socket === data.socket);
            if (cursor) {
              cursor.x = data.x;
              cursor.y = data.y;
              cursor.name = data.name;
              cursor.color = data.color;
              cursor.midpoint = data.midpoint;
            } else {
              setCursors([...cursors, data]);
            }
          }
        })
      );
    },
    [cursors]
  );

  /* Create socket */
  useEffect(() => {
    socket = io(ENDPOINT);
  }, []);

  /* Apply data to cursors */
  useEffect(() => {
    socket.on("cursor_position_update", (data: Cursor) => {
      handleCursors(data);
      if (data && data.type) {
        setCursorType(data.type);
      }
    });
  }, [cursors, handleCursors]);

  /* Update midpoint and cursor */
  const handleMouseChange = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log("mouse event");

    if (cursors) {
      setMidpointCoordinate(calculateMidpointCoordinates(cursors));
    }
    if (midpointCoordinate) {
      setCursor({
        x: e.pageX,
        y: e.pageY,
        socket: socket.id,
        name: name ? name : "",
        rotation: 0,
        color: cursor?.color
          ? cursor?.color
          : getSimilarColors(stringToColor(String(socket.id))),
        midpoint: midpointCoordinate,
        type: cursorType,
      });
    }
  };

  /* Emit message with cursor */
  useEffect(() => {
    socket.emit("cursor_position", cursor);
  }, [cursor]);

  /* Update cursors type when changed */
  React.useEffect(() => {
    console.log("type of all cursors changed");
    // Set other cursors
    console.log(cursorType);
    setCursors((prevState) =>
      prevState.map((cursor) => {
        return { ...cursor, type: cursorType };
      })
    );
  }, [cursorType]);

  return (
    <>
      <div>
        <span onClick={() => handleCursorType("rotation")}>Rotation</span>
        <span onClick={() => handleCursorType("handshake")}>Handshake</span>
        <span onClick={() => handleCursorType("game")}>Game</span>
        <span onClick={() => handleCursorType("polo")}>Polonaise</span>
      </div>
      <div
        style={{ height: "100vh", width: "100vw" }}
        onMouseMove={handleMouseChange}
      >
        <Name {...{ name, setName }} />
        {socket && cursors.length !== 0 && midpointCoordinate && (
          <Rotation {...{ cursors, midpointCoordinate, socket }} />
        )}
      </div>
    </>
  );
}

export default App;
