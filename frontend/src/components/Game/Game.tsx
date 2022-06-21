import * as React from "react";

import { Cursor, Weapon } from "../../types";

import Paper from "./Hands/Paper";
import Rock from "./Hands/Rock";
import Scissor from "./Hands/Scissor";
import { Socket } from "socket.io-client";

interface GameProps {
  c: Cursor;
  socket: Socket;
  setWeapon: (value: Weapon) => void;
  weapon: Weapon;
  winner: string | undefined;
  players: string[];
}

const Game: React.FC<GameProps> = ({
  c,
  socket,
  setWeapon,
  weapon,
  winner,
  players,
}) => {
  const isPlayer = players.find((id) => id === c.socket);
  const isMe = c.socket === socket.id;

  if (!isPlayer) {
    return null;
  }

  return (
    <>
      {isMe ? (
        <div className="relative h-56 w-44 -ml-5">
          <div className="absolute top-0 right-1/3">
            <Rock
              {...{
                covered: false,
                weapon,
                setWeapon,
                winner,
              }}
            />
          </div>
          <div className="absolute top-1/3 right-0">
            <Scissor
              {...{
                covered: false,
                weapon,
                setWeapon,
                winner,
              }}
            />
          </div>
          <div className="absolute bottom-0 left-1/3">
            <Paper
              {...{
                covered: false,
                weapon,
                setWeapon,
                winner,
              }}
            />
          </div>
        </div>
      ) : (
        <div className="relative h-56 w-44 -mr-5">
          <div className="absolute top-0 left-1/3">
            <Rock
              {...{
                covered: !Boolean(
                  c.gameStarted === true &&
                    c.weapon === "rock" &&
                    weapon !== undefined
                ),
                weapon,
                winner,
                c,
              }}
            />
          </div>
          <div className="absolute top-1/3 left-0">
            <Scissor
              {...{
                covered: !Boolean(
                  c.gameStarted === true &&
                    c.weapon === "scissor" &&
                    weapon !== undefined
                ),
                weapon,
                winner,
                c,
              }}
            />
          </div>
          <div className="absolute bottom-0 left-1/3">
            <Paper
              {...{
                covered: !Boolean(
                  c.gameStarted === true &&
                    c.weapon === "paper" &&
                    weapon !== undefined
                ),
                weapon,
                winner,
                c,
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Game;
