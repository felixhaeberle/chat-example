export interface Cursor {
  x: number;
  y: number;
  lastX: number;
  lastY: number;
  socket: string;
  name: string;
  color: string;
  rotation: number | undefined;
  type: CursorType;
  gameStarted: boolean | undefined;
  followStarted: boolean | undefined;
  leader: string | undefined;
  weapon: Weapon;
  midpoint:
    | {
        x: number;
        y: number;
      }
    | undefined;
}

export interface midpointType {
  x: number;
  y: number;
}

export type CursorType =
  | "rotation"
  | "game"
  | "handshake"
  | "polonaise"
  | undefined;

export type Weapon = "rock" | "scissor" | "paper" | undefined;
