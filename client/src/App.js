import React, { useState } from "react";

import socketIOClient from "socket.io-client";

const ENDPOINT = "http://localhost:4001";

// create random user
const user = "User_" + String(new Date().getTime()).substr(-3);

const socket = socketIOClient(ENDPOINT);

function App() {
  const [cursorPosition, setCursorPosition] = useState({x: null, y: null});
  const [cursorData, setCursorData] = useState([]);
  const [renderCursorData, setRenderCursorData] = useState();

  socket.on("cursor_position_update", data => {
    console.log('hi')
    setRenderCursorData(data);
  });

  const handleMouseChange = (e) => {
    setCursorPosition({x: e.clientX, y: e.clientY});
      
    let userData = {user: user, cursor: cursorPosition}
    console.log('user: ' + cursorData.find((obj) => obj.user === user));
    if(cursorData.find((obj) => obj.user === user)) {
      console.log('exisiting');
      console.log(cursorData)
      cursorData.find((obj) => obj.user === user).cursor = cursorPosition;
    } else {
      console.log('new');
      console.log([...cursorData, userData])
      setCursorData([...cursorData, userData]);
    }

    socket.emit("cursor_position", cursorData);
  }

  console.log(renderCursorData);

  return (
    <div style={{ height: '100vh', width: '100vw', cursor: 'none' }} onMouseMove={(e) => handleMouseChange(e)}>
    {
      renderCursorData ? renderCursorData.map((cursor, i) => (
        <svg
          key={i}
          style={{ transform: 'rotate(180deg)', height:'30px', width: '30px', position: 'absolute', top: cursor.cursor.y, left: cursor.cursor.x }}
          xmlns="http://www.w3.org/2000/svg"
          x="0"
          y="0"
          version="1.1"
          viewBox="0 0 28 28"
          xmlSpace="preserve"
        >
          <path
            fill="#fff"
            d="M8.2 20.9L8.2 4.9 19.8 16.5 13 16.5 12.6 16.6z"
          ></path>
          <path fill="#fff" d="M17.3 21.6L13.7 23.1 9 12 12.7 10.5z"></path>
          <path
            d="M12.5 13.6H14.5V21.6H12.5z"
            transform="rotate(-22.773 13.483 17.596)"
          ></path>
          <path d="M9.2 7.3L9.2 18.5 12.2 15.6 12.6 15.5 17.4 15.5z"></path>
        </svg>   
      )) : null
    }
    </div>
  );
}

export default App;