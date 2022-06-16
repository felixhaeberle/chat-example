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
}

const GameExample: React.FC<GameExampleProps> = ({
  cursors,
  socket,
  setWeapon,
  weapon,
}) => {
  return (
    <>
      {cursors.map((c: Cursor, index) => {
        ///if (socket.id && c.socket === socket.id) return null;
        if (c.gameStarted && c.socket === socket.id) {
          return (
            <div className="fixed top-1/3 left-1/3">
              <div className="flex">
                <div className="relative h-56 w-44 -mr-5">
                  <div className="absolute top-0 left-1/3">
                    <Rock covered={true} />
                  </div>
                  <div className="absolute top-1/3 left-0">
                    <Scissor covered={true} />
                  </div>
                  <div className="absolute bottom-0 left-1/3">
                    <Paper covered={true} />
                  </div>
                </div>
                <div className="relative h-56 w-44 -ml-5">
                  <div className="absolute top-0 right-1/3">
                    <Rock {...{ covered: false, setWeapon }} />
                  </div>
                  <div className="absolute top-1/3 right-0">
                    <Scissor {...{ covered: false, setWeapon }} />
                  </div>
                  <div className="absolute bottom-0 left-1/3">
                    <Paper {...{ covered: false, setWeapon }} />
                  </div>
                </div>
              </div>
            </div>
          );
        } else {
          return <Mouse {...{ c, index }} />;
        }
      })}
    </>
  );
};

export default GameExample;
