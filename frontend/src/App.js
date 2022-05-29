import React, { useEffect, useState } from "react";
import { getSimilarColors, stringToColor } from "./helpers/colors";

import io from "socket.io-client";

let socket;
console.log(process.env.NODE_ENV);
const ENDPOINT = process.env.NODE_ENV === "development" ? "http:/localhost:4001" : "https://collaboration-lab.herokuapp.com/";
// create random user
//const user = "User_" + String(new Date().getTime()).substring(-3);

function App() {
  const [cursorPosition, setCursorPosition] = useState({x: 100, y: 100});
  // eslint-disable-next-line
  const [cursors, setCursors] = useState([]);

  useEffect(() => {
    socket = io(ENDPOINT);
  }, [])

  useEffect(() => {
    socket.on("cursor_position_update", data => {
      let index = cursors.findIndex((el) => el.socket === data.socket);
      console.log(cursors[index]);
      if(cursors[index] !== undefined) {
        console.log(cursors[index]);
        cursors[index].x = data.x;
        cursors[index].y = data.y;
        cursors[index].color = getSimilarColors(stringToColor(String(cursors[index].socket)));
      } else if (data.socket) {
        cursors.push(data);
      }
      console.log(cursors);
    })
  }, [cursors]);

  const handleMouseChange = (e) => {
    setCursorPosition({x: e.pageX, y: e.pageY, socket: socket.id});
    socket.emit("cursor_position", cursorPosition);
  }

  return (
    <div style={{ height: '100vh', width: '100vw'}} onMouseMove={(e) => handleMouseChange(e)}>
      { cursors.length !== 0 && cursors.map((c) => {
        if(c.socket === socket.id) return null
        return (
          <svg
          style={{ height:'50px', width: '50px', position: 'absolute', top: c ? c.y : null, left: c ? c.x : null }}
          xmlns="http://www.w3.org/2000/svg"
          x="0"
          y="0"
          version="1.1"
          viewBox="0 0 28 28"
          xmlSpace="preserve"
        >
          <path fill={'#' + c.color} d="M9.2 7.3L9.2 18.5 12.2 15.6 12.6 15.5 17.4 15.5z"></path>
        </svg>  
        )
      }) }
    </div>
  );
}

export default App;