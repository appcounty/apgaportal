import styles from './Item.module.css';

type ItemProps = {
  label: string;
  value: string;
  style?: React.CSSProperties;
}

const Item = ({label, value, style}: ItemProps):JSX.Element => {
  return (
    <div style={style} className={styles.item}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{value}</span>
    </div>
  );
}

export default Item;