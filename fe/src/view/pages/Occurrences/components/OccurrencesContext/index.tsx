import React, { createContext, useCallback, useState } from "react";

// Definição do tipo do contexto
interface OccurrencesContextValue {
  //isFetchingOccurrences: boolean;
  //occurrences: OccurrencesResponse;
  isNewOccurrenceModalOpen: boolean;
  closeNewOccurrenceModal(): void;
  openNewOccurrenceModal(): void;
}

// Criação do contexto
export const OccurrencesContext = createContext({} as OccurrencesContextValue);

export const OccurrencesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  //const { isFetchingOccurrences, occurrences } = useOccurrences();

  const [isNewOccurrenceModalOpen, setIsNewOccurrenceModalOpen] =
    useState(false);

  const closeNewOccurrenceModal = useCallback(() => {
    setIsNewOccurrenceModalOpen(false);
  }, []);

  const openNewOccurrenceModal = useCallback(() => {
    setIsNewOccurrenceModalOpen(true);
  }, []);
  return (
    <OccurrencesContext.Provider
      value={{
        // isFetchingOccurrences,
        // occurrences,
        isNewOccurrenceModalOpen,
        closeNewOccurrenceModal,
        openNewOccurrenceModal,
      }}
    >
      {children}
    </OccurrencesContext.Provider>
  );
};
