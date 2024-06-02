import React, { ReactNode } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Container from "../container/Container";
import Head from "next/head";
import { useBroswer } from "@/providers/BrowserProvider";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps): JSX.Element | null => {
  const { browserTitle } = useBroswer();

  if (!children) return null;

  return (
    <>
      <Head>
        <title>{browserTitle}</title>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Head>
      <Header />
      <Container>{children}</Container>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
