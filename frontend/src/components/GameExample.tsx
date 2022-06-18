import * as React from "react";

import { Cursor, Weapon } from "../types";

import Game from "./Game/Game";
import Mouse from "./Mouse";
import { Socket } from "socket.io-client";

interface GameExampleProps {
  cursors: Cursor[];
  socket: Socket;
  setWeapon: (value: Weapon) => void;
  weapon: Weapon;
  gameStarted: boolean | undefined;
  winner: string | undefined;
  players: string[];
}

const GameExample: React.FC<GameExampleProps> = ({
  cursors,
  socket,
  setWeapon,
  weapon,
  gameStarted,
  winner,
  players,
}) => {
  return (
    <div>
      <div className="fixed top-1/3 left-1/3">
        <div className="flex flex-row-reverse">
          {cursors.map((c: Cursor, index) => {
            ///if (socket.id && c.socket === socket.id) return null;
            if (gameStarted) {
              return (
                <Game {...{ c, socket, setWeapon, weapon, winner, players }} />
              );
            } else if (!gameStarted) {
              return <Mouse {...{ c, index }} />;
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default GameExample;
