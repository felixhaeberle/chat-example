import { Cursor, midpointType } from "./types";
import React, { useCallback, useEffect, useState } from "react";
// @ts-ignore
import { getSimilarColors, stringToColor } from "./helpers/colors";
import io, { Socket } from "socket.io-client";

import Mouse from "./components/Mouse";
import Name from "./components/Name";
import Rotation from "./components/Rotation";
import { calculateMidpointCoordinates } from "./helpers/calc";
import produce from "immer";

let socket: Socket;
const ENDPOINT = process.env.NODE_ENV === "development" ? "http://localhost:4001" : "https://collaboration-lab.herokuapp.com/";

function App() {
  const [midpointCoordinate, setMidpointCoordinate] = useState<midpointType>();
  const [cursorPosition, setCursorPosition] = useState<Cursor>();
  const [name, setName] = useState('');
  // eslint-disable-next-line
  const [cursors, setCursors] = useState<Cursor[]>([]);

  const handleCursors = useCallback((data: Cursor) => {
    setCursors(
      produce((draft) => {
        if(data && data.socket) {
          const cursor = draft.find((el) => el.socket === data.socket);
          if(cursor) {
            cursor.x = data.x;
            cursor.y = data.y;
            cursor.name = data.name;
            cursor.color = data.color;
            cursor.midpoint = data.midpoint;
          } else {
            setCursors([...cursors, data])
          }
        }
      })
    );
  }, [cursors]);

  /* Create socket */
  useEffect(() => {
    socket = io(ENDPOINT);
  }, [])

  /* Apply data to cursors */
  useEffect(() => {
    socket.on("cursor_position_update", (data: Cursor) => {
      handleCursors(data);
    })
  }, [cursors, handleCursors]);

  /* Update midpoint and cursor */
  const handleMouseChange = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cursors) {
      setMidpointCoordinate(calculateMidpointCoordinates(cursors))
    }
    if (midpointCoordinate) {
      setCursorPosition({x: e.pageX, y: e.pageY, socket: socket.id, name: name ? name : '', rotation: 0 /* getPolarDegree({x: e.pageX, y: e.pageY}, midpointCoordinate)*/, color: cursorPosition?.color ? cursorPosition?.color : getSimilarColors(stringToColor(String(socket.id))), midpoint: midpointCoordinate});
    }
  }

  /* Update cursors with midpoint and rotation */
  useEffect(() => {
    if(midpointCoordinate) {
      setCursorPosition(prevState => prevState ? ({...prevState, midpoint: midpointCoordinate}) : undefined);
    }
  }, [midpointCoordinate]);

  /* Emit message with cursor */
  useEffect(() => {
    socket.emit("cursor_position", cursorPosition);
  }, [cursorPosition])

  return (
    <>
      <div style={{ height: '100vh', width: '100vw'}} onMouseMove={handleMouseChange}>
        <Name {...{name, setName}} />
        { socket && cursors.length !== 0 && midpointCoordinate && <Rotation {...{cursors, midpointCoordinate, socket}} />}
      </div>
    </>
  );
}

export default App;