import * as React from "react";

import { Cursor } from "../types";
import Mouse from "./Mouse";
import { Socket } from "socket.io-client";
import { getPolarDegree } from "../helpers/calc";

interface PolonaiseExampleProps {
  cursors: Cursor[];
  socket: Socket;
  followStarted: boolean | undefined;
  leader: string | undefined;
  setLeader: (value: string) => void;
  followers: string[];
}

const PolonaiseExample: React.FC<PolonaiseExampleProps> = ({
  cursors,
  socket,
  followStarted,
  leader,
  setLeader,
  followers,
}) => {
  ///if (socket.id && c.socket === socket.id) return null;
  if (followStarted) {
    return (
      <div>
        {cursors.map((c: Cursor, index) => {
          const isLeader = c.leader === socket.id;
          const leader = cursors.find((c) => c.socket === socket.id);
          const followerC = { ...c };
          if (!isLeader && leader) {
            followerC.x = leader.x + 20 * index;
            followerC.y = leader.y + 20 * index;
            followerC.rotation = getPolarDegree(
              { x: followerC.x, y: followerC.y },
              { x: leader.lastX, y: leader.lastY }
            );
          }
          return (
            <Mouse
              {...{
                c: !isLeader ? followerC : c,
                index,
                midpointCoordinate: (leader ? {x: leader.x, y: leader.y} : undefined),
              }}
            />
          );
        })}
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

export default PolonaiseExample;
