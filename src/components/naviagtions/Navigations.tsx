import React, { ReactNode } from "react";
import styles from "./Navigations.module.css";
import Item from "./item/Item";

type Item = {
  text: string;
  link: string;
};

type NavProps = {
  items: Item[];
};

const Navigations = ({ items }: NavProps): JSX.Element | null => {
  if (!items.length) return null;
  return (
    <ul className={styles.navigations}>
      {items.map((item, index) => (
        <Item key={index} text={item.text} link={item.link} />
      ))}
    </ul>
  );
};

export default Navigations;
