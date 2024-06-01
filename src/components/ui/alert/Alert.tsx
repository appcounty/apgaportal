import Icon from "@/components/utilities/Icons";
import styles from "./Alert.module.css";

type AlertProps = {
  type: "error" | "info" | "warning" | "success";
  message: string;
  clickHandler?: (event: React.MouseEvent<HTMLDivElement>) => void;
};

const Alert = ({ type, message, clickHandler }: AlertProps): JSX.Element => {
  return (
    <div className={[styles.main, styles[type]].join(" ")}>
      <Icon
        strokeColor={type === "error" ? "#ffffff" : "#155724"}
        className={styles.icon}
        name={`${type === "error" ? "error-alert" : "info-alert"}`}
      />
      <div
        style={
          {
            // color: type === "error" ? "#ffffff" : "#155724",
          }
        }
        className={styles.message}
      >
        {message}
      </div>
      <Icon
        clickHandler={clickHandler}
        className={styles.close}
        name="close"
        strokeColor={type === "error" ? "#ffffff" : "#155724"}
      />
    </div>
  );
};

export default Alert;
