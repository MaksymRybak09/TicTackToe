type GameBoardProps = {
  onNewGame: () => void;
  selectedGridSize: number;
  onGridSizeChange: (size: number) => void;
};

function GameControlls(props: GameBoardProps) {
  return (
    <div>
      <button onClick={props.onNewGame}>New game</button>
      <label>
        Grid size:
        <select
          value={props.selectedGridSize}
          onChange={(e) => props.onGridSizeChange(Number(e.target.value))}
        >
          {Array.from({ length: 7 }, (_, i) => i + 3).map((size) => (
            <option key={size} value={size}>
              {size} × {size}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default GameControlls;
