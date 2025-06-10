import { useEffect } from "react";
import type { Player } from "../../types/player";
import styles from "./modal.module.css";

type ModalProps = {
  show: boolean;
  winner: Player | "draw" | null;
  onClose: () => void;
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
      ? "Draw, play again"
      : `Player ${props.winner} won!`;

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
