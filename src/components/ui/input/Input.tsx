import React from "react";
import styles from "./Input.module.css";

type inputProps = {
  error?: boolean;
  type?: string;
  name?: string;
  value: string | null | "";
  placeholder?: string;
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({
  error,
  type,
  name,
  value,
  placeholder,
  changeHandler,
}: inputProps): JSX.Element => {
  return (
    <div className={styles.input}>
      <input
        style={{
          border: error
            ? "2px solid #dc0933"
            : "2px solid hsla(151, 96%, 20%, 0.777)",
        }}
        name={name}
        type={type || "text"}
        value={value || ""}
        placeholder={placeholder}
        onChange={changeHandler}
      />
      {/* {error ? (
        <span className={styles.error}>This field is required</span>
      ) : null} */}
    </div>
  );
};

export default Input;
