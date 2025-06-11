import type { ButtonHTMLAttributes } from "react";
import styles from "./my-button.module.css";

type MyButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

function MyButton(props: MyButtonProps) {
  return (
    <button {...props} className={styles.button}>
      {props.children}
    </button>
  );
}

export default MyButton;
