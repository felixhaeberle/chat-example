import * as React from "react";

import { Cursor, Weapon, midpointType } from "../types";

import Mouse from "./Mouse";
import Paper from "./Game/Hands/Paper";
import Rock from "./Game/Hands/Rock";
import Scissor from "./Game/Hands/Scissor";
import { Socket } from "socket.io-client";

interface GameExampleProps {
  cursors: Cursor[];
  socket: Socket;
  setWeapon: (value: Weapon) => void;
  weapon: Weapon;
  gameStarted: boolean | undefined;
  winner: string | undefined;
}

const GameExample: React.FC<GameExampleProps> = ({
  cursors,
  socket,
  setWeapon,
  weapon,
  gameStarted,
  winner,
}) => {
  return (
    <>
      {cursors.map((c: Cursor, index) => {
        ///if (socket.id && c.socket === socket.id) return null;
        if (gameStarted && c.socket === socket.id) {
          return (
            <div className="fixed top-1/3 left-1/3">
              <div className="flex">
                <div className="relative h-56 w-44 -mr-5">
                  <div className="absolute top-0 left-1/3">
                    <Rock {...{ covered: true, weapon, winner, c }} />
                  </div>
                  <div className="absolute top-1/3 left-0">
                    <Scissor {...{ covered: true, weapon, winner, c }} />
                  </div>
                  <div className="absolute bottom-0 left-1/3">
                    <Paper {...{ covered: true, weapon, winner, c }} />
                  </div>
                </div>
                <div className="relative h-56 w-44 -ml-5">
                  <div className="absolute top-0 right-1/3">
                    <Rock {...{ covered: false, weapon, setWeapon, winner }} />
                  </div>
                  <div className="absolute top-1/3 right-0">
                    <Scissor
                      {...{ covered: false, weapon, setWeapon, winner }}
                    />
                  </div>
                  <div className="absolute bottom-0 left-1/3">
                    <Paper {...{ covered: false, weapon, setWeapon, winner }} />
                  </div>
                </div>
              </div>
            </div>
          );
        } else if (!gameStarted) {
          return <Mouse {...{ c, index }} />;
        }
        return null;
      })}
    </>
  );
};

export default GameExample;
