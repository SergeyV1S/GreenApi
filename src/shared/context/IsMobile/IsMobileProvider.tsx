import React from "react";

import { IsMobileContext } from "./IsMobileContext";

export interface IIsMobileProviderProps {
  children: React.ReactNode;
}

export const IsMobileProvider = ({ children }: IIsMobileProviderProps) => {
  const [isMobile] = React.useState(window.innerWidth <= 768);

  const value = React.useMemo(() => isMobile, [isMobile]);

  return <IsMobileContext.Provider value={value}>{children}</IsMobileContext.Provider>;
};
