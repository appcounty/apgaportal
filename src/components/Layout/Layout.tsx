import React, { ReactNode } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Container from "../container/Container";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps): JSX.Element | null => {
  if (!children) return null;

  return (
    <>
      <Header />
      <Container>{children}</Container>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
