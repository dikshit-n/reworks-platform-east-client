import { SIDEBAR_CONTEXT } from "@/model";
import { createContext, useState } from "react";

export const SidebarContext = createContext({} as SIDEBAR_CONTEXT);

export const SidebarProvider: React.FC = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen((prev) => !prev);
  const closeSidebar = () => setIsOpen(false);

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar, closeSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};
