import React from "react";
import styles from "./Separator.module.css";

type SeparatorProps = {
  color?: string;
};

const Separator = ({ color }: SeparatorProps): JSX.Element => {
  return (
    <div className={styles.separator}>
      <hr />
    </div>
  );
};

export default Separator;
