import Layout from "@/components/Layout/Layout";
import BrowserProvider from "@/providers/BrowserProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <BrowserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </BrowserProvider>
  );
}
