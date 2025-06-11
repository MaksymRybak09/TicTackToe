import "./App.css";
import GameBoard from "./components/GameBoard/GameBoard";
import GameControlls from "./components/GameControlls/GameControlls";
import Modal from "./components/Modal/Modal";
import PlayerInfo from "./components/PlayerInfo/PlayerInfo";
import { useTickTackToue } from "./hooks/TickTackToue/useTickTackToue";

function App() {
  const {
    wins,
    winner,
    gameCount,
    currentPlayer,
    board,
    time,
    selectedGridSize,
    isModalShown,
    handleCellClick,
    startNewGame,
    onGridSizeChange,
    onModalClose,
  } = useTickTackToue();

  return (
    <div className="app">
      <PlayerInfo
        wins={wins}
        gameCount={gameCount}
        currentPlayer={currentPlayer}
        winner={winner}
        time={time}
      />
      <div className="game-board">
        <GameBoard board={board} onCeLLClick={handleCellClick} />
        <GameControlls
          onNewGame={startNewGame}
          selectedGridSize={selectedGridSize}
          onGridSizeChange={onGridSizeChange}
        />
      </div>
      <Modal
        show={isModalShown}
        winner={winner}
        onClose={onModalClose}
        time={time}
      />
    </div>
  );
}

export default App;
