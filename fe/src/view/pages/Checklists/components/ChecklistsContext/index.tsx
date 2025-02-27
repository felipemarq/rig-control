import React, { createContext } from "react";

// Definição do tipo do contexto
interface ChecklistsContextValue {}

// Criação do contexto
export const ChecklistsContext = createContext({} as ChecklistsContextValue);

export const ChecklistsProvider = ({ children }: { children: React.ReactNode }) => {
  //const { isFetchingOccurrences, occurrences } = useOccurrences();

  return <ChecklistsContext.Provider value={{}}>{children}</ChecklistsContext.Provider>;
};
