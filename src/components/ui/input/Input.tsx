import React, { useEffect, useRef } from "react";
import styles from "./Input.module.css";

type inputProps = {
  disabled?: boolean;
  error?: boolean;
  type?: string;
  name?: string;
  value: string | null | "";
  placeholder?: string;
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

const Input = ({
  disabled,
  error,
  type,
  name,
  value,
  placeholder,
  changeHandler,
  className,
}: inputProps): JSX.Element => {
  const datePlaceHolderRef = useRef<HTMLLabelElement>(null);

  useEffect(() => {
    if (datePlaceHolderRef.current) {
      datePlaceHolderRef.current.style.display = value ? "none" : "flex";
    }
  }, [value]);
  
  return (
    <div className={`${styles.input} ${className || ""}`}>
      <input
        disabled={disabled}
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
      {type === "date" ? (
        <label ref={datePlaceHolderRef} className={styles.datePlaceHolder}>
          {placeholder}
        </label>
      ) : null}
      {/* {error ? (
        <span className={styles.error}>This field is required</span>
      ) : null} */}
    </div>
  );
};

export default Input;
