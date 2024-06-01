import Separator from "../ui/separator/Separator";
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
  return (
    <div className={styles.main}>
      <h2>{title}</h2>
      <Separator />
      {items.length ? (
        items.map((item, index) => (
          <Item key={index} label={item.label} value={item.value} />
        ))
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Display;
