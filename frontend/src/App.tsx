import { Cursor, midpointType } from "./types";
import React, { useEffect, useState } from "react";
import { calculateMidpointCoordinates, getPolarDegree } from "./helpers/calc";
// @ts-ignore
import { getSimilarColors, stringToColor } from "./helpers/colors";
import io, { Socket } from "socket.io-client";

let socket: Socket;
const ENDPOINT = process.env.NODE_ENV === "development" ? "http://localhost:4001" : "https://collaboration-lab.herokuapp.com/";
// create random user
//const user = "User_" + String(new Date().getTime()).substring(-3);

function App() {
  const [midpointCoordinate, setMidpointCoordinate] = useState<midpointType>();
  const [cursorPosition, setCursorPosition] = useState<Cursor>();
  const [name, setName] = useState('');
  // eslint-disable-next-line
  const [cursors, setCursors] = useState<Cursor[]>([]);

  useEffect(() => {
    socket = io(ENDPOINT);
  }, [])

  useEffect(() => {
    socket.on("cursor_position_update", (data: Cursor) => {
      if(data && data.socket) {
        let index = cursors.findIndex((el) => el.socket === data.socket);
        if(cursors[index]) {
          cursors[index].x = data.x;
          cursors[index].y = data.y;
          cursors[index].name = data.name;
          cursors[index].color = getSimilarColors(stringToColor(String(cursors[index].socket)));
          cursors[index].midpoint = data.midpoint;
          cursors[index].rotation = data.rotation;
        } else if(data.socket) {
          cursors.push(data);
        }
      }
    })
  }, [cursors, midpointCoordinate]);

  useEffect(() => {
    setCursorPosition(prevState => prevState ? ({...prevState, midpoint: midpointCoordinate ? midpointCoordinate : {x: 0, y: 0}}) : undefined);
  }, [midpointCoordinate]);

  useEffect(() => {
    socket.emit("cursor_position", cursorPosition);
  }, [cursorPosition])

  const handleMouseChange = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cursors) {
      setMidpointCoordinate(calculateMidpointCoordinates(cursors))
    }
    setCursorPosition({x: e.pageX, y: e.pageY, socket: socket.id, name: name ? name : '', rotation: cursorPosition ? getPolarDegree({x: cursorPosition?.x, y: cursorPosition.y}, midpointCoordinate ? midpointCoordinate : {x: 0, y: 0}) : 0, color: cursorPosition?.color ? cursorPosition?.color : '', midpoint: midpointCoordinate ? midpointCoordinate : {x: 0, y: 0}});
  }

  return (
    <>
      <div style={{ height: '100vh', width: '100vw'}} onMouseMove={handleMouseChange}>
        <label>Your name</label>
        <input value={name} onChange={(e) => {
          setName(e.target.value)
        }} />
        { socket && cursors.length !== 0 && midpointCoordinate && cursors.map((c: Cursor) => {
          if(socket.id && c.socket === socket.id) return null          
          return (
            <div style={{ position: 'absolute', top: c ? c.y -12 : undefined, left: c ? c.x -12 : undefined}}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '24px', width: '24px', border: '1px solid red',transform: `rotate(${c.rotation + 'deg'})`, transformOrigin: 'center center'}}>
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