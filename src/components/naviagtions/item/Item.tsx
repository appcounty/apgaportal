import React from "react";
import styles from "./Item.module.css";
import Link from "next/link";

type ItemProps = {
  text: string;
  link: string;
}

const Item = ({text, link}: ItemProps): JSX.Element => {
  return (
    <li className={styles.item}>
      <Link href={link}>{text}</Link>
    </li>
  );
}

export default Item;