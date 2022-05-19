import React, { useEffect, useState } from "react";
import { getSimilarColors, stringToColor } from "./helpers/getSimilarColor";

import io from "socket.io-client";

let socket;
const ENDPOINT = "http://localhost:4001";

// create random user
//const user = "User_" + String(new Date().getTime()).substring(-3);

function App() {
  const [cursorPosition, setCursorPosition] = useState({x: 100, y: 100});
  const [otherCursorPosition, setOtherCursorPosition] = useState(null);
  const [cursorColor, setCursorColor] = useState(null);

  useEffect(() => {
    socket = io(ENDPOINT);
  }, [])

  useEffect(() => {
    socket.on("cursor_position_update", data => setOtherCursorPosition(data))
    
    if(otherCursorPosition?.socket) {
      setCursorColor(getSimilarColors(stringToColor(String(otherCursorPosition?.socket))));
    }
  }, [otherCursorPosition?.socket]);

  const handleMouseChange = (e) => {
    setCursorPosition({x: e.pageX, y: e.pageY, socket: socket.id});
    socket.emit("cursor_position", cursorPosition);
  }

  return (
    <div style={{ height: '100vh', width: '100vw' }} onMouseMove={(e) => handleMouseChange(e)}>
      { otherCursorPosition?.socket !== socket?.id &&
        <svg
          style={{ height:'30px', width: '30px', position: 'absolute', top: otherCursorPosition ? otherCursorPosition.y : null, left: otherCursorPosition ? otherCursorPosition.x : null }}
          xmlns="http://www.w3.org/2000/svg"
          x="0"
          y="0"
          version="1.1"
          viewBox="0 0 28 28"
          xmlSpace="preserve"
        >
          <path fill={'#' + cursorColor} d="M9.2 7.3L9.2 18.5 12.2 15.6 12.6 15.5 17.4 15.5z"></path>
        </svg> 
      }
    </div>
  );
}

export default App;