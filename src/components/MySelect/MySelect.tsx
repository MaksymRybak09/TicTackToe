import type { SelectHTMLAttributes } from "react";
import styles from "./my-select.module.css";

type MySelectProps = SelectHTMLAttributes<HTMLSelectElement>;

function MySelect(props: MySelectProps) {
  return (
    <select {...props} className={styles.select}>
      {props.children}
    </select>
  );
}

export default MySelect;
