import type { ButtonHTMLAttributes } from "react";
import type { Cell } from "../../types/cell";
import styles from "./cell-item.module.css";

type CellItemProps = {
  cell: Cell;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function CellItem({ cell, ...props }: CellItemProps) {
  return (
    <button {...props} className={styles["cell-item"]}>
      {cell}
    </button>
  );
}

export default CellItem;
