import { useEffect } from "react";
import { formatTime } from "../../lib/helpers/formatTime";
import type { Player } from "../../types/player";
import type { Time } from "../../types/time";
import MyButton from "../MyButton/MyButton";
import styles from "./modal.module.css";

type ModalProps = {
  show: boolean;
  winner: Player | "draw" | null;
  onClose: () => void;
  time: Time;
};

function Modal(props: ModalProps) {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const modal = document.getElementById("modal");
      if (modal && !modal.contains(e.target as Node)) {
        props.onClose();
      }

      if (props.show) {
        document.addEventListener("mousedown", handleClickOutside);
      }
    };
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [props.show, props.onClose, props]);

  if (!props.show) return null;

  const message =
    props.winner === "draw"
      ? `Draw, total time is ${formatTime(
          props.time.X + props.time.O,
        )}, play again`
      : `Player ${props.winner} won, with time ${formatTime(
          props.time[props.winner || "X"],
        )}!`;

  return (
    <div className={styles.fade}>
      <div id="modal" className={styles.modal}>
        <p>{message}</p>
        <MyButton onClick={props.onClose}>OK</MyButton>
      </div>
    </div>
  );
}

export default Modal;
