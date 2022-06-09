import React, { useEffect, useState } from "react";
// @ts-ignore
import { getSimilarColors, stringToColor } from "./helpers/colors";
import io, { Socket } from "socket.io-client";

let socket: Socket;
const ENDPOINT = process.env.NODE_ENV === "development" ? "http://localhost:4001" : "https://collaboration-lab.herokuapp.com/";
// create random user
//const user = "User_" + String(new Date().getTime()).substring(-3);

interface Cursor {
  x: number;
  y: number;
  socket: string;
  name: string;
  color: string;
  midpoint: {
    x: number,
    y: number
  }
}

interface cursorPositionType {
  x: number; 
  y: number; 
  socket: string; 
  name: string; 
  midpoint: {
    x: number,
    y: number
  }
}

interface midpointType {
  x: number; 
  y: number;
}

function App() {
  const [midpointCoordinate, setMidpointCoordinate] = useState<midpointType>();
  const [cursorPosition, setCursorPosition] = useState<cursorPositionType>();
  const [name, setName] = useState('');
  // eslint-disable-next-line
  const [cursors, setCursors] = useState<Cursor[]>([]);

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

  const getPolarDegree = (cursor: {x: number; y: number}, midpoint: {x: number; y: number}): number => {
    /* Degree */
    let polarX: number;
    let polarY: number;
    let polarDegree: number = 0;
    // First case
    if(midpoint && cursor) {
      if (midpoint.x < cursor.x && midpoint.y < cursor.y) {
        polarX = cursor.x - midpoint.x;
        polarY = cursor.y - midpoint.y;
        console.log('first', polarX, polarY);
        polarDegree = ~~(Math.atan(polarY/polarX) * (180/Math.PI) + 180)
      }
      // Second Case
      if (midpoint.x > cursor.x && midpoint.y < cursor.y) {   
        polarX = midpoint.x - cursor.x;
        polarY = midpoint.y - cursor.y;
        console.log('second', polarX, polarY);
        polarDegree = ~~(Math.atan(polarY/polarX) * (180/Math.PI))
      }
      // Third Case
      if(midpoint.x < cursor.x && midpoint.y > cursor.y) {
        polarX = cursor.x - midpoint.x;
        polarY = cursor.y - midpoint.y;
        console.log('third', polarX, polarY);
        polarDegree = ~~(Math.atan(polarY/polarX) * (180/Math.PI) + 180)
      }
      // Forth case
      if(midpoint.x > cursor.x && midpoint.y > cursor.y) {
        polarX = midpoint.x - cursor.x;
        polarY = midpoint.y - cursor.y;
        console.log('forth', polarX, polarY);
        polarDegree = ~~(Math.atan(polarY/polarX) * (180/Math.PI))
      }
      /* Overlapping values */
      if (midpoint.x === cursor.x && midpoint.y > cursor.y) {
        return -270 // Bottom
      } else if (midpoint.x === cursor.x && midpoint.y < cursor.y) {
        return -90; // Top
      } else if (midpoint.x === cursor.x && midpoint.y === cursor.y) {
        return 180; // Middle
      } else if (midpoint.y === cursor.y && midpoint.x < cursor.x) {
        return -180; // Left
      } else if (midpoint.y === cursor.y && midpoint.x > cursor.x) {
        return 0; // Right
      }
    }

    return polarDegree;
  }

  const calculateMidpointCoordinates = (cursors: Cursor[]) => {
    /* Coordinates */
    let x = 0;
    let y = 0;
    cursors.map((cursor) => x = x + cursor.x);
    cursors.map((cursor) => y = y + cursor.y);
    /* Set values */
    setMidpointCoordinate({x: x/cursors.length, y: y/cursors.length})
  }

  const handleMouseChange = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cursors.length > 0) {
      calculateMidpointCoordinates(cursors)
    }
    console.log('hi');
    
    setCursorPosition({x: e.pageX, y: e.pageY, socket: socket.id, name: name ? name : '', midpoint: midpointCoordinate ? midpointCoordinate : {x: e.pageX, y: e.pageY}});
    socket.emit("cursor_position", cursorPosition);
  }

  return (
    <>
      <div style={{ height: '100vh', width: '100vw'}} onMouseMove={handleMouseChange}>
        <label>Your name</label>
        <input value={name} onChange={(e) => {
          setName(e.target.value)
        }} />
        { cursors.length !== 0 && midpointCoordinate && cursors.map((c: Cursor) => {
          if(c.socket === socket.id) return null
          return (
            <div style={{ position: 'absolute', top: c ? c.y -12 : undefined, left: c ? c.x -12 : undefined}}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '24px', width: '24px', border: '1px solid red',transform: `rotate(${getPolarDegree(c, midpointCoordinate) + 'deg'})`, transformOrigin: 'center center'}}>
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
            </div>
          )
        }) }
      </div>
    </>
  );
}

export default App;