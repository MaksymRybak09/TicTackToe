import type { Cell } from "../../types/cell";
import type { Player } from "../../types/player";

export const checkWinner = (
  board: Cell[][],
  player: Player,
  size: number,
): Player | null => {
  const checkLine = (cells: Cell[]) => cells.every((cell) => cell === player);

  for (let i = 0; i < size; i++) {
    if (checkLine(board[i])) return player;
    if (checkLine(board.map((row) => row[i]))) return player;
  }

  if (checkLine(board.map((row, idx) => row[idx]))) return player;
  if (checkLine(board.map((row, idx) => row[size - 1 - idx]))) return player;

  return null;
};
