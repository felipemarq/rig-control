import {
  OccurenceNature,
  Occurrence,
  OccurrenceCategory,
  OccurrenceType,
} from "@/app/entities/Occurrence";
import { OccurrenceSeverity } from "@/app/entities/OccurrenceSeverity";
import { UF } from "@/app/entities/Rig";
import { useOccurrences } from "@/app/hooks/occurrences/useOccurrences";
import { useBases } from "@/app/hooks/useBases";
import { BasesResponse } from "@/app/services/basesService/getAll";
import {
  OccurrenceFilters,
  OccurrencesResponse,
} from "@/app/services/occurrencesService/getAll";
import { endOfYear, format, startOfYear } from "date-fns";
import React, { createContext, useCallback, useEffect, useState } from "react";

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
}

// Criação do contexto
export const OccurrencesContext = createContext({} as OccurrencesContextValue);

export const OccurrencesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  //const { isFetchingOccurrences, occurrences } = useOccurrences();

  const currentDate = new Date();
  const firstDayOfYear = startOfYear(currentDate);
  const lastDayOfYear = endOfYear(currentDate);
  const formattedFirstDay = format(
    firstDayOfYear,
    "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"
  );
  const formattedLastDay = format(
    lastDayOfYear,
    "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"
  );

  const [selectedStartDate, setSelectedStartDate] =
    useState<string>(formattedFirstDay);
  const [selectedEndDate, setSelectedEndDate] =
    useState<string>(formattedLastDay);

  const { bases, isFetchingBases } = useBases();

  const [filters, setFilters] = useState<OccurrenceFilters>({
    nature: undefined,
    category: undefined,
    severity: undefined,
    type: undefined,
    uf: undefined,
    baseId: undefined,
    startDate: selectedStartDate,
    endDate: selectedEndDate,
  });
  const {
    isFetchingOccurrences,
    occurrences,
    isInitialLoading,
    refetchOccurrences,
  } = useOccurrences(filters);

  function handleChangeFilters<TFilter extends keyof OccurrenceFilters>(
    filter: TFilter
  ) {
    return (value: OccurrenceFilters[TFilter]) => {
      if (value === filters[filter]) return;

      setFilters((prevState) => ({
        ...prevState,
        [filter]: value,
      }));
    };
  }

  const handleApplyFilters = () => {
    refetchOccurrences();
  };

  const handleClearFilters = () => {
    setFilters({
      nature: undefined,
      category: undefined,
      severity: undefined,
      type: undefined,
      uf: undefined,
      baseId: undefined,
      startDate: selectedStartDate,
      endDate: selectedEndDate,
    });
  };

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
        isFetchingOccurrences,
        isInitialLoading,
        occurrences,

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
      }}
    >
      {children}
    </OccurrencesContext.Provider>
  );
};
