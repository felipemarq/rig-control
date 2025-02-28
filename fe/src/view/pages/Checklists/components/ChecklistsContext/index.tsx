import { useAuth } from "@/app/hooks/useAuth";
import React, { createContext, useState } from "react";

// Definição do tipo do contexto
interface ChecklistsContextValue {
  isNewChecklistModalOpen: boolean;
  openNewChecklistModal: () => void;
  closeNewChecklistModal: () => void;
  rigs: {
    id: string;
    name: string;
  }[];
}

// Criação do contexto
export const ChecklistsContext = createContext({} as ChecklistsContextValue);

export const ChecklistsProvider = ({ children }: { children: React.ReactNode }) => {
  //const { isFetchingOccurrences, occurrences } = useOccurrences();
  const { user } = useAuth();
  const userRigs = user?.rigs.map(({ rig: { id, name } }) => ({ id, name })) || [];
  const [isNewChecklistModalOpen, setIsNewChecklistModalOpen] = useState(false);

  const openNewChecklistModal = () => {
    setIsNewChecklistModalOpen(true);
  };

  console.log("isNewChecklistModalOpen", isNewChecklistModalOpen);

  const closeNewChecklistModal = () => {
    setIsNewChecklistModalOpen(false);
  };

  return (
    <ChecklistsContext.Provider
      value={{
        closeNewChecklistModal,
        openNewChecklistModal,
        isNewChecklistModalOpen,
        rigs: userRigs,
      }}
    >
      {children}
    </ChecklistsContext.Provider>
  );
};
