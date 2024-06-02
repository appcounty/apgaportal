import { createContext } from "react";

type ProviderValue = {
  browserTitle: string;
  setBrowserTitle: (value: string) => void;
};

export const BrowserContext = createContext<ProviderValue | undefined>(undefined);