import { Occurrence } from "@/app/entities/Occurrence";
import { OccurrenceAction } from "@/app/entities/OccurrenceAction";

import { useOccurrences } from "@/app/hooks/occurrences/useOccurrences";

import { useOccurrencesFiltersContext } from "@/app/hooks/useOccurrencesFiltersContext";
import { BasesResponse } from "@/app/services/basesService/getAll";
import {
  OccurrenceFilters,
  OccurrencesResponse,
} from "@/app/services/occurrencesService/getAll";
import React, { createContext, useCallback, useState } from "react";

// Definição do tipo do contexto
interface OccurrencesContextValue {
  //isFetchingOccurrences: boolean;
  //occurrences: OccurrencesResponse;
  isNewOccurrenceModalOpen: boolean;
  closeNewOccurrenceModal(): void;
  openNewOccurrenceModal(): void;

  isNewOccurrenceActionModalOpen: boolean;
  closeNewOccurrenceActionModal(): void;
  openNewOccurrenceActionModal(occurenceId: string): void;
  occurenceIdActionPlanBeingSeen: string | null;

  isEditOccurrenceActionModalOpen: boolean;
  occurrenceActionBeingSeen: OccurrenceAction | null;
  closeEditOccurrenceActionModal: () => void;
  openEditOccurrenceActionModal: (occurrenceAction: OccurrenceAction) => void;

  isEditOccurrenceModalOpen: boolean;
  closeEditOccurrenceModal(): void;
  openEditOccurrenceModal(occurrence: Occurrence): void;
  occurrenceBeingSeen: null | Occurrence;

  handleChangeFilters<TFilter extends keyof OccurrenceFilters>(
    filter: TFilter
  ): (value: OccurrenceFilters[TFilter]) => void;

  bases: BasesResponse;
  isFetchingBases: boolean;
  filters: OccurrenceFilters;
  handleApplyFilters(): void;
  handleClearFilters(): void;

  occurrences: OccurrencesResponse;
  isFetchingOccurrences: boolean;
  isInitialLoading: boolean;

  handleRefetchOccurrences(): void;
}

// Criação do contexto
export const OccurrencesContext = createContext({} as OccurrencesContextValue);

export const OccurrencesProvider = ({ children }: { children: React.ReactNode }) => {
  //const { isFetchingOccurrences, occurrences } = useOccurrences();

  const [occurenceIdActionPlanBeingSeen, setOccurenceIdActionPlanBeingSeen] = useState<
    string | null
  >(null);

  const { filters, handleChangeFilters, handleClearFilters, bases, isFetchingBases } =
    useOccurrencesFiltersContext();

  const { isFetchingOccurrences, occurrences, isInitialLoading, refetchOccurrences } =
    useOccurrences(filters);

  const handleApplyFilters = () => {
    refetchOccurrences();
  };

  const handleRefetchOccurrences = () => {
    refetchOccurrences();
  };

  const [isNewOccurrenceModalOpen, setIsNewOccurrenceModalOpen] = useState(false);

  const [isNewOccurrenceActionModalOpen, setIsNewOccurrenceActionModalOpen] =
    useState(false);

  const [isEditOccurrenceActionModalOpen, setIsEditOccurrenceActionModalOpen] =
    useState(false);

  const [isEditOccurrenceModalOpen, setIsEditOccurrenceModalOpen] = useState(false);

  const [occurrenceBeingSeen, setOccurrenceBeingSeen] = useState<null | Occurrence>(null);

  const [occurrenceActionBeingSeen, setOccurrenceActionBeingSeen] =
    useState<null | OccurrenceAction>(null);

  const closeNewOccurrenceModal = useCallback(() => {
    setIsNewOccurrenceModalOpen(false);
  }, []);

  const openNewOccurrenceModal = useCallback(() => {
    setIsNewOccurrenceModalOpen(true);
  }, []);

  const openNewOccurrenceActionModal = useCallback((occurenceId: string) => {
    setIsNewOccurrenceActionModalOpen(true);
    setOccurenceIdActionPlanBeingSeen(occurenceId);
  }, []);

  const closeNewOccurrenceActionModal = useCallback(() => {
    setIsNewOccurrenceActionModalOpen(false);
    setOccurenceIdActionPlanBeingSeen(null);
  }, []);

  const closeEditOccurrenceActionModal = useCallback(() => {
    setOccurrenceActionBeingSeen(null);
    setIsEditOccurrenceActionModalOpen(false);
  }, []);

  const openEditOccurrenceActionModal = useCallback(
    (occurrenceAction: OccurrenceAction) => {
      setIsEditOccurrenceActionModalOpen(true);
      setOccurrenceActionBeingSeen(occurrenceAction);
    },
    []
  );

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
        isFetchingOccurrences,
        isInitialLoading,
        occurrences,
        closeNewOccurrenceActionModal,
        isNewOccurrenceActionModalOpen,
        occurenceIdActionPlanBeingSeen,
        openNewOccurrenceActionModal,
        isNewOccurrenceModalOpen,
        closeNewOccurrenceModal,
        openNewOccurrenceModal,
        bases,
        isFetchingBases,
        isEditOccurrenceModalOpen,
        closeEditOccurrenceModal,
        openEditOccurrenceModal,
        occurrenceBeingSeen,
        handleChangeFilters,
        filters,
        handleClearFilters,
        handleApplyFilters,
        closeEditOccurrenceActionModal,
        isEditOccurrenceActionModalOpen,
        occurrenceActionBeingSeen,
        openEditOccurrenceActionModal,
        handleRefetchOccurrences,
      }}
    >
      {children}
    </OccurrencesContext.Provider>
  );
};
