import React, { ReactNode } from "react";
import styles from "./Button.module.css";
import Icon from "@/components/utilities/Icons";

type ButtonProps = {
  type?: "button" | "submit" | "reset" | undefined;
  text?: string;
  content?: string | ReactNode;
  clickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
  loading?: boolean;
  style?: React.CSSProperties,
  className?: string;
};

const Button = ({
  type,
  text,
  clickHandler,
  loading,
  style,
  className,
  content
}: ButtonProps): JSX.Element => {
  return (
    <button
      style={style}
      className={`${styles.button} ${className || ""}`}
      onClick={clickHandler}
      type={type || "button"}
    >
      {text || content}
      {loading ? (
        <Icon
          className="rotate"
          name="loader"
          strokeColor="var(--white)"
          strokeWidth="3"
        />
      ) : null}
    </button>
  );
};

export default Button;
