import * as React from "react";

import { Cursor, Weapon } from "../types";

import Game from "./Game/Game";
import Mouse from "./Mouse";
import { Socket } from "socket.io-client";

interface HandshakeExampleProps {
  cursors: Cursor[];
  socket: Socket;
  setWeapon: (value: Weapon) => void;
  weapon: Weapon;
  gameStarted: boolean | undefined;
  winner: string | undefined;
  players: string[];
}

const HandshakeExample: React.FC<HandshakeExampleProps> = ({
  cursors,
  socket,
  setWeapon,
  weapon,
  gameStarted,
  winner,
  players,
}) => {
  ///if (socket.id && c.socket === socket.id) return null;
  if (gameStarted) {
    return (
      <div className="fixed top-1/3 left-1/3">
        <div className="flex flex-row-reverse">
          {cursors.map((c: Cursor) => {
            return (
              <Game {...{ c, socket, setWeapon, weapon, winner, players }} />
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div>
      {cursors.map((c: Cursor, index) => {
        return <Mouse {...{ c, index }} />;
      })}
    </div>
  );
};

export default HandshakeExample;
