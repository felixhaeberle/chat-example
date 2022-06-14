import { Cursor } from "./../types/index";
export const getPolarDegree = (
  cursor: { x: number; y: number },
  midpoint: { x: number; y: number }
): number => {
  /* Degree */
  let polarX: number;
  let polarY: number;
  let polarDegree: number = 0;
  // First case
  if (midpoint && cursor) {
    if (midpoint.x < cursor.x && midpoint.y < cursor.y) {
      polarX = cursor.x - midpoint.x;
      polarY = cursor.y - midpoint.y;
      polarDegree = ~~(Math.atan(polarY / polarX) * (180 / Math.PI) + 180);
    }
    // Second Case
    if (midpoint.x > cursor.x && midpoint.y < cursor.y) {
      polarX = midpoint.x - cursor.x;
      polarY = midpoint.y - cursor.y;
      polarDegree = ~~(Math.atan(polarY / polarX) * (180 / Math.PI));
    }
    // Third Case
    if (midpoint.x < cursor.x && midpoint.y > cursor.y) {
      polarX = cursor.x - midpoint.x;
      polarY = cursor.y - midpoint.y;
      polarDegree = ~~(Math.atan(polarY / polarX) * (180 / Math.PI) + 180);
    }
    // Forth case
    if (midpoint.x > cursor.x && midpoint.y > cursor.y) {
      polarX = midpoint.x - cursor.x;
      polarY = midpoint.y - cursor.y;
      polarDegree = ~~(Math.atan(polarY / polarX) * (180 / Math.PI));
    }
    /* Overlapping values */
    if (midpoint.x === cursor.x && midpoint.y > cursor.y) {
      return -270; // Bottom
    } else if (midpoint.x === cursor.x && midpoint.y < cursor.y) {
      return -90; // Top
    } else if (midpoint.x === cursor.x && midpoint.y === cursor.y) {
      return 180; // Middle
    } else if (midpoint.y === cursor.y && midpoint.x < cursor.x) {
      return -180; // Left
    } else if (midpoint.y === cursor.y && midpoint.x > cursor.x) {
      return 0; // Right
    }
  }

  return polarDegree;
};

export const calculateMidpointCoordinates = (cursors: Cursor[]) => {
  /* Coordinates */
  let x = 0;
  let y = 0;
  cursors.map((cursor) => (x = x + cursor.x));
  cursors.map((cursor) => (y = y + cursor.y));
  /* Set values */
  return { x: ~~(x / cursors.length), y: ~~(y / cursors.length) };
};
