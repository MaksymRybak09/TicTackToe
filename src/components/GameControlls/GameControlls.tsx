import MyButton from "../MyButton/MyButton";
import MySelect from "../MySelect/MySelect";
import styles from "./game-controlls.module.css";

type GameBoardProps = {
  onNewGame: () => void;
  selectedGridSize: number;
  onGridSizeChange: (size: number) => void;
};

function GameControlls(props: GameBoardProps) {
  return (
    <div className={styles["game-controll"]}>
      <MyButton onClick={props.onNewGame}>New game</MyButton>
      <label>
        Grid size:
        <MySelect
          value={props.selectedGridSize}
          onChange={(e) => props.onGridSizeChange(Number(e.target.value))}
        >
          {Array.from({ length: 7 }, (_, i) => i + 3).map((size) => (
            <option key={size} value={size}>
              {size} × {size}
            </option>
          ))}
        </MySelect>
      </label>
    </div>
  );
}

export default GameControlls;
