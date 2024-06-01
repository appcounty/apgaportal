import React, { ReactNode } from "react";
import Input from "../ui/input/Input";
import Select from "../ui/select/Select";
import styles from "./Form.module.css";

type formProps = {
  title?: string;
  children: ReactNode;
  submitHandler: (event: React.FormEvent<HTMLFormElement>) => void;
  className?: string;
};

const Form = ({
  title,
  children,
  submitHandler,
  className,
}: formProps): JSX.Element | null => {
  if (!children) return null;

  return (
    <div className={`${styles.form} ${className || ""}`}>
      <h2>{String(title).toUpperCase() || ""}</h2>
      <form onSubmit={submitHandler}>{children}</form>
    </div>
  );
};

export default Form;

export { Input, Select };

