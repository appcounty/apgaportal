import { useRef } from "react";
import Button from "../ui/button/Button";
import Separator from "../ui/separator/Separator";
import Icon from "../utilities/Icons";
import styles from "./Display.module.css";
import Item from "./item/Item";

interface Item {
  label: string;
  value: string;
}

type DisplayProps = {
  items: Item[];
  title: string;
};

const Display = ({ items, title }: DisplayProps): JSX.Element => {
  const printContent = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const printHandler = () => {
    if (printContent.current && iframeRef.current) {
      const printContents = printContent.current.innerHTML;
      const doc = iframeRef.current.contentWindow?.document;

      if (doc) {
        doc.open();
        doc.write("<html><head><title>Print Div</title>");
        doc.write("<style>");
        doc.write(`.${styles.main} {
                    width: var(--full-width);
                    height: auto;

                    background-color: var(--white);
                    padding: 4rem;

                    border-radius: 1rem;

                    box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.15);
                  }`);
        doc.write(`.${styles.header} {
                    width: var(--full-width);
                    height: auto;

                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                  }`);
        doc.write("</style>");
        doc.write("</head><body >");
        doc.write(printContents);
        doc.write("</body></html>");
        doc.close();
        iframeRef.current.contentWindow.focus();
        iframeRef.current.contentWindow.print();
      }
    }
  };

  return (
    <div className={styles.main} ref={printContent}>
      <div className={styles.header}>
        <h2>{title}</h2>
        <Button
          style={{
            width: "fit-content",
            borderRadius: "0.3rem",
            boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.2)",
          }}
          content={<Icon name="printer" strokeColor="white" />}
          clickHandler={printHandler}
        />
      </div>
      <Separator />
      {items.length ? (
        items.map((item, index) => {
          let rowColor = "white";
          if (index % 2 === 0) {
            rowColor = "#eeeeee";
          }
          return (
            <Item
              style={{ backgroundColor: rowColor }}
              key={index}
              label={item.label}
              value={item.value}
            />
          );
        })
      ) : (
        <div></div>
      )}
      <iframe ref={iframeRef} style={{ display: "none" }} />
    </div>
  );
};

export default Display;
