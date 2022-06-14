export interface Cursor {
  x: number;
  y: number;
  socket: string;
  name: string;
  color: string;
  rotation: number;
  midpoint: {
    x: number;
    y: number;
  };
}

export interface midpointType {
  x: number;
  y: number;
}
