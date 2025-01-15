import { useOccurrences } from "@/app/hooks/occurrences/useOccurrences";
import { useBases } from "@/app/hooks/useBases";
import { useOccurrencesFiltersContext } from "@/app/hooks/useOccurrencesFiltersContext";
import { BasesResponse } from "@/app/services/basesService/getAll";
import {
  OccurrenceFilters,
  OccurrencesResponse,
} from "@/app/services/occurrencesService/getAll";
import React, { createContext } from "react";

// Definição do tipo do contexto
interface SmsDashboardContextValue {
  //isFetchingOccurrences: boolean;
  //occurrences: OccurrencesResponse;

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
export const SmsDashboardContext = createContext({} as SmsDashboardContextValue);

export const SmsDashboardProvider = ({ children }: { children: React.ReactNode }) => {
  //const { isFetchingOccurrences, occurrences } = useOccurrences();

  const { bases, isFetchingBases } = useBases();

  const { filters, handleChangeFilters, handleClearFilters } =
    useOccurrencesFiltersContext();

  const { isFetchingOccurrences, occurrences, isInitialLoading, refetchOccurrences } =
    useOccurrences(filters);

  const handleApplyFilters = () => {
    refetchOccurrences();
  };

  const handleRefetchOccurrences = () => {
    refetchOccurrences();
  };

  return (
    <SmsDashboardContext.Provider
      value={{
        // isFetchingOccurrences,
        // occurrences,
        isFetchingOccurrences,
        isInitialLoading,
        occurrences,
        bases,
        isFetchingBases,
        handleChangeFilters,
        filters,
        handleClearFilters,
        handleApplyFilters,
        handleRefetchOccurrences,
      }}
    >
      {children}
    </SmsDashboardContext.Provider>
  );
};
