import { BrowserContext } from "@/contexts/BrowserContext";
import { ReactNode, useContext, useState } from "react";

type BrowserProviderProps = {
  children: ReactNode;
};

const BrowserProvider = ({ children }: BrowserProviderProps): JSX.Element => {
  const [browserTitle, setBrowserTitle] = useState<string>("Welcome");

  return (
    <BrowserContext.Provider value={{ browserTitle, setBrowserTitle }}>
      {children}
    </BrowserContext.Provider>
  );
};

export default BrowserProvider;

export const useBroswer = () => {
  const context = useContext(BrowserContext);

  if (!context) {
    throw new Error(
      "useBroswer must be used within the BrowserProvider component."
    );
  }

  return context;
};
