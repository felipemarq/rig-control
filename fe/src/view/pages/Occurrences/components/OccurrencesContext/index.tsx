import { Occurrence } from "@/app/entities/Occurrence";
import React, { createContext, useCallback, useState } from "react";

// Definição do tipo do contexto
interface OccurrencesContextValue {
  //isFetchingOccurrences: boolean;
  //occurrences: OccurrencesResponse;
  isNewOccurrenceModalOpen: boolean;
  closeNewOccurrenceModal(): void;
  openNewOccurrenceModal(): void;

  isEditOccurrenceModalOpen: boolean;
  closeEditOccurrenceModal(): void;
  openEditOccurrenceModal(occurrence: Occurrence): void;
  occurrenceBeingSeen: null | Occurrence;
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

  const [isEditOccurrenceModalOpen, setIsEditOccurrenceModalOpen] =
    useState(false);

  const [occurrenceBeingSeen, setOccurrenceBeingSeen] =
    useState<null | Occurrence>(null);

  const closeNewOccurrenceModal = useCallback(() => {
    setIsNewOccurrenceModalOpen(false);
  }, []);

  const openNewOccurrenceModal = useCallback(() => {
    setIsNewOccurrenceModalOpen(true);
  }, []);

  const closeEditOccurrenceModal = useCallback(() => {
    setOccurrenceBeingSeen(null);
    setIsEditOccurrenceModalOpen(false);
  }, []);

  const openEditOccurrenceModal = useCallback((occurrence: Occurrence) => {
    setIsEditOccurrenceModalOpen(true);
    setOccurrenceBeingSeen(occurrence);
  }, []);
  return (
    <OccurrencesContext.Provider
      value={{
        // isFetchingOccurrences,
        // occurrences,
        isNewOccurrenceModalOpen,
        closeNewOccurrenceModal,
        openNewOccurrenceModal,

        isEditOccurrenceModalOpen,
        closeEditOccurrenceModal,
        openEditOccurrenceModal,
        occurrenceBeingSeen,
      }}
    >
      {children}
    </OccurrencesContext.Provider>
  );
};
