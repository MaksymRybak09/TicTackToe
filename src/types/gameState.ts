import type { Cell } from "./cell";
import type { Player } from "./player";
import type { Wins } from "./wins";

export type GameState = {
  board: Cell[][];
  currentPlayer: Player;
  winner: Player | "draw" | null;
  gameCount: number;
  wins: Wins;
  moveCount: number;
  gridSize: number;
  selectedGridSize: number;
};
