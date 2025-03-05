"use client";

import { createContext, useContext, useState, ReactNode } from "react";

const BreadcrumbContext = createContext<{
  activeItem: string;
  setActiveItem: (item: string) => void;
}>({
  activeItem: "/",
  setActiveItem: () => {},
});

export function BreadcrumbProvider({ children }: { children: ReactNode }) {
  const [activeItem, setActiveItem] = useState("/");
  return (
    <BreadcrumbContext.Provider value={{ activeItem, setActiveItem }}>
      {children}
    </BreadcrumbContext.Provider>
  );
}

export const useBreadcrumb = () => useContext(BreadcrumbContext);
