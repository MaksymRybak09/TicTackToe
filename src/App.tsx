import { useState } from "react";
import "./App.css";
import GameBoard from "./components/GameBoard/GameBoard";
import GameControlls from "./components/GameControlls/GameControlls";
import Modal from "./components/Modal/Modal";
import PlayerInfo from "./components/PlayerInfo/PlayerInfo";
import { checkWinner } from "./lib/helpers/chackWinner";
import type { GameState } from "./types/gameState";

function App() {
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
  });
  const [isModalShown, setIsModalShown] = useState(false);

  const handleCellClick = (row: number, col: number) => {
    if (game.winner || game.board[row][col]) return;
    const newBoard = game.board.map((row) => [...row]);
    newBoard[row][col] = game.currentPlayer;

    const newMoveCount = game.moveCount++;
    const result = checkWinner(game.board, game.currentPlayer, game.gridSize);

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
      gridSize: prev.gridSize,
    }));
  };

  return (
    <>
      <PlayerInfo
        wins={game.wins}
        gameCount={game.gameCount}
        currentPlayer={game.currentPlayer}
      />
      <GameBoard board={game.board} onCeLLClick={handleCellClick} />
      <GameControlls
        onNewGame={startNewGame}
        selectedGridSize={game.selectedGridSize}
        onGridSizeChange={(size: number) =>
          setGame((prev) => ({ ...prev, selectedGridSize: size }))
        }
      />
      <Modal
        show={isModalShown}
        winner={game.winner}
        onClose={() => setIsModalShown(false)}
      />
    </>
  );
}

export default App;
