import { useEffect, useRef, useState } from "react";
import { checkWinner } from "../../lib/helpers/chackWinner";
import type { GameState } from "../../types/gameState";

export const useTickTackToue = () => {
  const [game, setGame] = useState<GameState>({
    board: Array(3)
      .fill(null)
      .map(() => Array(3).fill(null)),
    currentPlayer: "X",
    winner: null,
    gameCount: 0,
    wins: { X: 0, O: 0 },
    moveCount: 0,
    gridSize: 3,
    selectedGridSize: 3,
    time: { X: 0, O: 0 },
  });
  const [isModalShown, setIsModalShown] = useState(false);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (game.winner === "draw") {
      setTimeout(() => setIsModalShown(true), 1000);
    }
  }, [game.winner]);

  useEffect(() => {
    if (!game.winner) {
      startTimeRef.current = Date.now();
    } else if (startTimeRef.current !== null) {
      const elapsed = Date.now() - startTimeRef.current;
      setGame((prev) => ({
        ...prev,
        time: {
          ...prev.time,
          [prev.currentPlayer]: prev.time[prev.currentPlayer] + elapsed,
        },
      }));
      startTimeRef.current = null;
    }
  }, [game.currentPlayer, game.winner]);

  const handleCellClick = (row: number, col: number) => {
    if (game.winner || game.board[row][col]) return;
    const newBoard = game.board.map((row) => [...row]);
    newBoard[row][col] = game.currentPlayer;

    const newMoveCount = game.moveCount + 1;
    const result = checkWinner(newBoard, game.currentPlayer, game.gridSize);

    const elapsed = startTimeRef.current
      ? Date.now() - startTimeRef.current
      : 0;

    if (result) {
      setTimeout(() => setIsModalShown(true), 1000);
    }

    setGame((prev) => ({
      ...prev,
      board: newBoard,
      currentPlayer: prev.currentPlayer === "X" ? "O" : "X",
      winner: result
        ? result
        : newMoveCount === game.gridSize ** 2
        ? "draw"
        : null,
      moveCount: newMoveCount,
      wins: result
        ? {
            ...prev.wins,
            [prev.currentPlayer]: prev.wins[prev.currentPlayer] + 1,
          }
        : prev.wins,
      gameCount:
        result || newMoveCount === game.gridSize ** 2
          ? prev.gameCount + 1
          : prev.gameCount,
      time: {
        ...prev.time,
        [prev.currentPlayer]: prev.time[prev.currentPlayer] + elapsed,
      },
    }));
  };

  const startNewGame = () => {
    setGame((prev) => ({
      ...prev,
      board: Array(prev.selectedGridSize)
        .fill(null)
        .map(() => Array(prev.selectedGridSize).fill(null)),
      currentPlayer: "X",
      winner: null,
      moveCount: 0,
      gridSize: prev.selectedGridSize,
      time: { X: 0, O: 0 },
    }));
  };

  const onGridSizeChange = (size: number) =>
    setGame((prev) => ({ ...prev, selectedGridSize: size }));

  const onModalClose = () => setIsModalShown(false);

  return {
    ...game,
    isModalShown,
    handleCellClick,
    startNewGame,
    onGridSizeChange,
    onModalClose,
  };
};
