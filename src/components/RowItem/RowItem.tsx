import type { Cell } from "../../types/cell";
import CellItem from "../CellItem/CellItem";
import styles from "./row-item.module.css";

type RowItemProps = {
  row: Cell[];
  rowIndex: number;
  onCeLLClick: (row: number, col: number) => void;
};

function RowItem(props: RowItemProps) {
  return (
    <div className={styles["row-item"]}>
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
