import styles from './Item.module.css';

type ItemProps = {
  label: string;
  value: string;
}

const Item = ({label, value}: ItemProps):JSX.Element => {
  return (
    <div className={styles.item}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

export default Item;