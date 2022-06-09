import React, { useEffect, useState } from "react";
import { getSimilarColors, stringToColor } from "./helpers/colors";

import io from "socket.io-client";

let socket;
const ENDPOINT = process.env.NODE_ENV === "development" ? "http://localhost:4001" : "https://collaboration-lab.herokuapp.com/";
// create random user
//const user = "User_" + String(new Date().getTime()).substring(-3);

function App() {
  const [midpointCoordinate, setMidpointCoordinate] = useState();
  const [cursorPosition, setCursorPosition] = useState({x: 100, y: 100});
  const [name, setName] = useState('');
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
        cursors[index].name = data.name;
        cursors[index].color = getSimilarColors(stringToColor(String(cursors[index].socket)));
        cursors[index].midpoint = data.midpoint;
      } else if (data.socket) {
        cursors.push(data);
      }
      console.log(cursors);
    })
  }, [cursors]);

  const getPolarDegree = (cursor, midPoint) => {
    /* Degree */
    let polarX;
    let polarY;
    let polarDegree;
    // Forth case
    if(midPoint.x > cursor.x && midPoint.y > cursor.y) {
      polarX = cursor.x - midPoint.x;
      polarY = cursor.y - midPoint.y;
      console.log('forth', polarX, polarY);
      polarDegree = Math.atan(polarY/polarX) * (180/Math.PI)
    }
    // First case
    if (midPoint.x < cursor.x && midPoint.y < cursor.y) {
      polarX = midPoint.x - cursor.x;
      polarY = midPoint.y - cursor.y;
      console.log('first', polarX, polarY);
      polarDegree = Math.atan(polarY/polarX) * (180/Math.PI)
    }
    // Second Case
    if (midPoint.x > cursor.x && midPoint.y < cursor.y) {
      polarX = cursor.x - midPoint.x;
      polarY = midPoint.y - cursor.y;
      console.log('second', polarX, polarY);
      polarDegree = Math.atan(polarY/polarX) * (180/Math.PI)
    }
    // Third Case
    if(midPoint.x < cursor.x && midPoint.y > cursor.y) {
      polarX = midPoint.x - cursor.x;
      polarY = cursor.y - midPoint.y;
      console.log('third', polarX, polarY);
      polarDegree = Math.atan(polarY/polarX) * (180/Math.PI)
    }
    // let polarX = midPoint.x > cursor.x ? midPoint.x - cursor.x :  cursor.x - midPoint.x;
    // let polarY = midPoint.y > cursor.y ? midPoint.y - cursor.y :  cursor.y - midPoint.y;
    console.log(polarDegree)
    return polarDegree;
  }

  const calculateMidpointCoordinates = (cursors) => {
    /* Coordinates */
    let x = 0;
    let y = 0;
    cursors.map((cursor) => x = x + cursor.x);
    cursors.map((cursor) => y = y + cursor.y);
    /* Set values */
    setMidpointCoordinate({x: x/cursors.length, y: y/cursors.length})
  }

  const handleMouseChange = (e) => {
    if (cursors.length > 0) {
      calculateMidpointCoordinates(cursors)
    }
    setCursorPosition({x: e.pageX, y: e.pageY, socket: socket.id, name: name ? name : '', midpoint: midpointCoordinate ? midpointCoordinate : ''});
    socket.emit("cursor_position", cursorPosition);
  }

  return (
    <>
      <div style={{ height: '100vh', width: '100vw'}} onMouseMove={(e) => handleMouseChange(e)}>
        <label>Your name</label>
        <input value={name} onChange={(e) => {
          setName(e.target.value)
        }} />
        { cursors.length !== 0 && cursors.map((c) => {
          if(c.socket === socket.id) return null
          const rotation = getPolarDegree(c, midpointCoordinate);
          return (
            <div style={{ position: 'absolute', top: c ? c.y - 12 : null, left: c ? c.x - 12 : null}}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '24px', width: '24px', border: '1px solid red',transform: `rotate(${rotation + 25 + 'deg'})`, transformOrigin: 'center center'}}>
                <svg
                  style={{ height:'24', width: '24' }}
                  xmlns="http://www.w3.org/2000/svg"
                  x="0"
                  y="0"
                  version="1.1"
                  viewBox="0 0 24 24"
                  xmlSpace="preserve"
                  strokeWidth={2}
                  stroke={'#' + c.color}
                >
                  <path fill={'#' + c.color} strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </div>
              {c.name !== '' ? <span>{ c.name }</span> : null}
              {rotation ? <span>{ rotation }</span> : null}  
            </div>
          )
        }) }
      </div>
    </>
  );
}

export default App;