import { OccurrenceAction } from "@/app/entities/OccurrenceAction";
import { useOccurrences } from "@/app/hooks/occurrences/useOccurrences";
import { useOccurrencesTaxes } from "@/app/hooks/occurrences/useOccurrencesTaxes";
import { useBases } from "@/app/hooks/useBases";
import { useOccurrencesFiltersContext } from "@/app/hooks/useOccurrencesFiltersContext";
import { BasesResponse } from "@/app/services/basesService/getAll";
import {
  OccurrenceFilters,
  OccurrencesResponse,
} from "@/app/services/occurrencesService/getAll";
import { OccurrencesTaxesResponse } from "@/app/services/occurrencesService/getTaxes";
import React, { createContext, useCallback, useEffect, useState } from "react";

// Definição do tipo do contexto
interface SmsDashboardContextValue {
  //isFetchingOccurrences: boolean;
  //occurrences: OccurrencesResponse;

  handleChangeFilters<TFilter extends keyof OccurrenceFilters>(
    filter: TFilter,
  ): (value: OccurrenceFilters[TFilter]) => void;
  occurrencesTaxes?: OccurrencesTaxesResponse;
  bases: BasesResponse;
  isFetchingBases: boolean;
  filters: OccurrenceFilters;
  handleApplyFilters(): void;
  handleClearFilters(): void;

  occurrences: OccurrencesResponse;
  isFetchingOccurrences: boolean;
  isInitialLoading: boolean;
  isFetchingOccurrencesTaxes: boolean;
  handleRefetchOccurrences(): void;

  closeEditOccurrenceActionModal: () => void;
  isEditOccurrenceActionModalOpen: boolean;
  occurrenceActionBeingSeen: null | OccurrenceAction;
  openEditOccurrenceActionModal: (occurrenceAction: OccurrenceAction) => void;
}

// Criação do contexto
export const SmsDashboardContext = createContext(
  {} as SmsDashboardContextValue,
);

export const SmsDashboardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  //const { isFetchingOccurrences, occurrences } = useOccurrences();

  const { bases, isFetchingBases } = useBases();

  const { filters, handleChangeFilters, handleClearFilters } =
    useOccurrencesFiltersContext();

  const {
    isFetchingOccurrences,
    occurrences,
    isInitialLoading,
    refetchOccurrences,
  } = useOccurrences(filters);
  const [occurrenceActionBeingSeen, setOccurrenceActionBeingSeen] =
    useState<null | OccurrenceAction>(null);
  const [isEditOccurrenceActionModalOpen, setIsEditOccurrenceActionModalOpen] =
    useState(false);

  const closeEditOccurrenceActionModal = useCallback(() => {
    setOccurrenceActionBeingSeen(null);
    setIsEditOccurrenceActionModalOpen(false);
  }, []);

  const openEditOccurrenceActionModal = useCallback(
    (occurrenceAction: OccurrenceAction) => {
      setIsEditOccurrenceActionModalOpen(true);
      setOccurrenceActionBeingSeen(occurrenceAction);
    },
    [],
  );

  const handleApplyFilters = () => {
    refetchOccurrences();
    refetchOccurrencesTaxes();
  };

  useEffect(() => {
    refetchOccurrencesTaxes();
  }, [occurrences]);

  const handleRefetchOccurrences = () => {
    refetchOccurrences();
  };

  const {
    occurrencesTaxes,
    isFetchingOccurrencesTaxes,
    refetchOccurrencesTaxes,
  } = useOccurrencesTaxes({
    baseId: filters.baseId,
    year: filters.year,
  });

  return (
    <SmsDashboardContext.Provider
      value={{
        // isFetchingOccurrences,
        // occurrences,
        isFetchingOccurrences,
        isFetchingOccurrencesTaxes,
        isInitialLoading,
        occurrences,
        bases,
        isFetchingBases,
        handleChangeFilters,
        filters,
        handleClearFilters,
        handleApplyFilters,
        handleRefetchOccurrences,
        occurrencesTaxes,
        closeEditOccurrenceActionModal,
        isEditOccurrenceActionModalOpen,
        occurrenceActionBeingSeen,
        openEditOccurrenceActionModal,
      }}
    >
      {children}
    </SmsDashboardContext.Provider>
  );
};
