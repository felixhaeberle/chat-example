import { Cursor } from "../types";

export const getWinner = (p1: Cursor, p2: Cursor): Cursor | undefined => {
  if (p1.weapon === p2.weapon) return undefined;
  else if (p1.weapon === "rock" && p2.weapon === "paper") {
    return p2;
  } else if (p1.weapon === "rock" && p2.weapon === "scissor") {
    return p1;
  } else if (p1.weapon === "scissor" && p2.weapon === "rock") {
    return p2;
  } else if (p1.weapon === "scissor" && p2.weapon === "paper") {
    return p1;
  } else if (p1.weapon === "paper" && p2.weapon === "rock") {
    return p1;
  } else if (p1.weapon === "paper" && p2.weapon === "scissor") {
    return p2;
  }
};
