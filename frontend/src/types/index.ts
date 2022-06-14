export interface Cursor {
  x: number;
  y: number;
  socket: string;
  name: string;
  color: string;
  rotation: number | undefined;
  type: CursorType;
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

export type CursorType = "rotation" | "game" | "handshake" | "polo" | undefined;
