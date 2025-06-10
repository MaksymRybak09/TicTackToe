import type { Cell } from "../../types/cell";
import CellItem from "../CellItem/CellItem";

type RowItemProps = {
  row: Cell[];
  rowIndex: number;
  onCeLLClick: (row: number, col: number) => void;
};

function RowItem(props: RowItemProps) {
  return (
    <div>
      {props.row.map((cell, cellIndex) => (
        <CellItem
          key={cellIndex}
          cell={cell}
          onClick={() => props.onCeLLClick(props.rowIndex, cellIndex)}
        />
      ))}
    </div>
  );
}

export default RowItem;
