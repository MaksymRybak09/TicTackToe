import type { Cell } from "../../types/cell";
import RowItem from "../RowItem/RowItem";

type GameBoardProps = {
  board: Cell[][];
  onCeLLClick: (row: number, col: number) => void;
};

function GameBoard(props: GameBoardProps) {
  return (
    <div>
      {props.board.map((row, rowIndex) => (
        <RowItem
          key={rowIndex}
          row={row}
          rowIndex={rowIndex}
          onCeLLClick={props.onCeLLClick}
        />
      ))}
    </div>
  );
}

export default GameBoard;
