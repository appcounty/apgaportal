import React from "react";
import styles from "./Header.module.css";
import logo from "@/img/apga-logo.png";
import Navigations from "@/components/naviagtions/Navigations";

const navItems = [
  { text: "Home", link: "/" },
  { text: "Register", link: "/register" },
  { text: "Check Registration", link: "/check-registration" },
];

const Header = (): JSX.Element => {
  return <header className={styles.header}>
    <div className={styles.logo}>
      <img src={logo.src} alt="Apga logo" width={"100%"} />
    </div>
    <Navigations items={navItems}/>
  </header>
};

export default Header;
