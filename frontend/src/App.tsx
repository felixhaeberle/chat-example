import { Cursor, CursorType, Weapon, midpointType } from "./types";
import React, { useCallback, useEffect, useState } from "react";
// @ts-ignore
import { getSimilarColors, stringToColor } from "./helpers/colors";
import io, { Socket } from "socket.io-client";

import { Animation } from "./components/Game/Animation";
import GameExample from "./components/GameExample";
import HandshakeExample from "./components/HandshakeExample";
import Name from "./components/Name";
import PolonaiseExample from "./components/PolonaiseExample";
import RotationExample from "./components/RotationExample";
import Select from "./components/Select";
import { calculateMidpointCoordinates } from "./helpers/calc";
import { getWinner } from "./helpers/game";
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

  // Game
  const [gameStarted, setGameStarted] = useState<boolean | undefined>(
    undefined
  );
  const [weapon, setWeapon] = useState<Weapon>(undefined);
  const [players, setPlayers] = useState<string[]>([]);
  const [winner, setWinner] = useState<string | undefined>(undefined);

  // Follow
  const [selection, setSelection] = useState<midpointType[]>([]);
  const [followStarted, setFollowStarted] = useState<boolean | undefined>(
    undefined
  );
  const [leader, setLeader] = useState<string | undefined>(undefined);
  const [followers, setFollowers] = useState<string[]>([]);

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
              cursor.weapon = data.weapon;
              cursor.gameStarted = data.gameStarted;
            } else {
              setCursors([...cursors, data]);
            }
          }
        })
      );
    },
    [cursors]
  );

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log(e);
    if (cursorType === "polonaise") {
      // Reset selection
      setSelection([]);

      // // Set leader
      // setLeader(socket.id);

      // Set first selection point
      const x = e.pageX;
      const y = e.pageY;
      setSelection([{ x: x, y: y }]);
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log(e);
    if (cursorType === "polonaise") {
      // Set second selection point
      const x = e.pageX;
      const y = e.pageY;
      selection[0].x >= x
        ? setSelection([{ x: x, y: y }, ...selection])
        : setSelection([...selection, { x: x, y: y }]);
    }
  };

  /* Create socket */
  useEffect(() => {
    socket = io(ENDPOINT);
  }, []);

  /* Apply data to cursors */
  useEffect(() => {
    socket.on("cursor_position_update", (data: Cursor) => {
      handleCursors(data);
      if (data && data.type) {
        setCursorType((prevState) =>
          prevState !== data.type ? data.type : prevState
        );
      }
      if (data && data.followStarted) {
        setFollowStarted((prevState) =>
          prevState !== data.followStarted ? data.followStarted : prevState
        );
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
        lastX: cursor && cursor.x ? cursor?.x : e.pageX,
        lastY: cursor && cursor.y ? cursor?.y : e.pageY,
        socket: socket.id,
        name: name ? name : "",
        rotation: 0,
        color: cursor?.color
          ? cursor?.color
          : getSimilarColors(stringToColor(String(socket.id))),
        midpoint: midpointCoordinate,
        type: cursorType,
        weapon: weapon,
        gameStarted: gameStarted,
        followStarted: followStarted,
        leader: leader,
      });
    }
  };

  /* Emit message with cursor */
  useEffect(() => {
    socket.emit("cursor_position", cursor);
  }, [cursor]);

  /* Update cursors type when changed */
  useEffect(() => {
    console.log("type of all cursors changed");
    // Set other cursors
    setCursors((prevState) =>
      prevState.map((cursor) => {
        return { ...cursor, type: cursorType };
      })
    );
  }, [cursorType]);

  /* Update cursors with midpoint and rotation */
  useEffect(() => {
    if (midpointCoordinate) {
      setCursor((prevState) =>
        prevState ? { ...prevState, midpoint: midpointCoordinate } : undefined
      );
    }
  }, [midpointCoordinate, setCursor]);

  /* Update cursors with weapon */
  useEffect(() => {
    if (cursorType === "game") {
      if (weapon) {
        setCursor((prevState) =>
          prevState ? { ...prevState, weapon: weapon } : undefined
        );
      }
    }
  }, [cursorType, weapon]);

  /* Update cursors with leader */
  useEffect(() => {
    if (cursorType === "polonaise") {
      if (leader) {
        setCursor((prevState) =>
          prevState ? { ...prevState, leader: leader } : undefined
        );
      }
    }
  }, [cursorType, leader]);

  // /* Update cursors with leader */
  // useEffect(() => {
  //   if (cursorType === "polonaise") {
  //     if (followStarted) {
  //       setCursor((prevState) =>
  //         prevState ? { ...prevState, followStarted: followStarted } : undefined
  //       );
  //     }
  //   }
  // }, [cursorType, followStarted]);

  /* Collision detetion */
  useEffect(() => {
    if (cursorType === "game") {
      if (cursors.length > 1) {
        cursors.forEach((c1) => {
          cursors.forEach((c2) => {
            if (c1.gameStarted === true || c2.gameStarted === true) return;
            if (c1.socket === c2.socket) return;

            let x = c1.x - c2.x;
            let y = c1.y - c2.y;
            let diff = Math.sqrt(x * x + y * y);

            if (diff < 50 + 50) {
              setPlayers([c1.socket, c2.socket]);
            }
          });
        });
      }
    }
  }, [cursors, cursorType, players]);

  /* Collision detetion  */
  useEffect(() => {
    if (cursorType === "polonaise" && selection.length > 5) {
      if (cursors.length > 1) {
        cursors.forEach((cursor) => {
          if (cursor.socket === socket.id) return;
          if (cursor.followStarted === true) return;

          let isInX = selection[0].x >= cursor.x && selection[1].x <= cursor.x;
          let isInY = selection[0].y >= cursor.y && selection[1].y <= cursor.y;

          if (isInX && isInY) {
            setFollowStarted(true);
            setLeader(socket.id);
            setFollowers([...followers, cursor.socket]);
          }
        });
      }
    }
  }, [cursors, cursorType, followers, selection]);

  /* Start game for players */
  useEffect(() => {
    if (cursorType === "game") {
      if (players.length === 2 && players.find((id) => id === socket.id)) {
        setGameStarted(true);
      }
    }
  }, [players, cursorType]);

  /* Get winner of match */
  useEffect(() => {
    if (cursors.length > 1) {
      const p1 = cursors.find((c) => c.socket === players[0]);
      const p2 = cursors.find((c) => c.socket === players[1]);
      if (p1 && p1.weapon && p2 && p2.weapon) {
        const winner = getWinner(p1, p2);
        if (winner) {
          /* Set winner and reset weapon */
          setWinner(winner.socket);
          setTimeout(() => {
            setWeapon(undefined);
            setWinner(undefined);
            setGameStarted(false);
            setPlayers([]);
          }, 3000);
        } else if (winner === undefined) {
          /* Reset weapon */
          setTimeout(() => {
            setWinner(undefined);
            setWeapon(undefined);
          }, 3000);
        }
      }
    }
  }, [weapon, players, cursors]);

  /* Reset game when curor type is changed */
  useEffect(() => {
    setGameStarted(false);
    setWeapon(undefined);
    setWinner(undefined);
    setPlayers([]);
  }, [cursorType]);

  useEffect(() => {
    console.log(selection);
  }, [selection]);

  return (
    <>
      <div className="fixed top-5 w-full px-4 sm:px-6 lg:px-8">
        <span className="font-medium text-gray-500 hover:text-gray-900">
          Collaboration Lab
        </span>
      </div>
      <div className="fixed bottom-10 w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end">
          <Name {...{ name, setName }} />
          <Select {...{ activeType: cursorType, setCursorType }} />
          <div
            onClick={() => {
              setLeader(socket.id);
              setFollowStarted(true);
            }}
          >
            set me as leader
          </div>
        </div>
      </div>
      <div
        style={{ height: "100vh", width: "100vw" }}
        onMouseMove={handleMouseChange}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        {socket && cursors.length !== 0 && (
          <>
            {cursorType === "rotation" && (
              <>
                {midpointCoordinate && (
                  <RotationExample
                    {...{ cursors, midpointCoordinate, socket }}
                  />
                )}
              </>
            )}
            {cursorType === "game" && (
              <>
                {winner && winner === socket.id && (
                  <>
                    <Animation />
                    <span className="text-sm font-medium text-gray-700">
                      You have won!
                    </span>
                  </>
                )}
                <GameExample
                  {...{
                    cursors,
                    socket,
                    weapon,
                    setWeapon,
                    gameStarted,
                    winner,
                    players,
                  }}
                />
              </>
            )}
            {cursorType === "handshake" && (
              <>
                <HandshakeExample
                  {...{
                    cursors,
                    socket,
                    weapon,
                    setWeapon,
                    gameStarted,
                    winner,
                    players,
                  }}
                />
              </>
            )}
            {cursorType === "polonaise" && (
              <>
                <PolonaiseExample
                  {...{
                    cursors,
                    socket,
                    followStarted,
                    leader,
                    setLeader,
                    followers,
                  }}
                />
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default App;
