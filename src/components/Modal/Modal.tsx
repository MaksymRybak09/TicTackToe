import { useEffect } from "react";
import { formatTime } from "../../lib/helpers/formatTime";
import type { Player } from "../../types/player";
import type { Time } from "../../types/time";
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
      document.addEventListener("mousedown", handleClickOutside);
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
        <button onClick={props.onClose}>OK</button>
      </div>
    </div>
  );
}

export default Modal;
