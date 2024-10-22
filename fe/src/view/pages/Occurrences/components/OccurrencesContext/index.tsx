import { Occurrence } from "@/app/entities/Occurrence";
import { OccurrenceAction } from "@/app/entities/OccurrenceAction";

import { useOccurrences } from "@/app/hooks/occurrences/useOccurrences";
import { useBases } from "@/app/hooks/useBases";
import { BasesResponse } from "@/app/services/basesService/getAll";
import {
  OccurrenceFilters,
  OccurrencesResponse,
} from "@/app/services/occurrencesService/getAll";
import { endOfYear, format, startOfYear } from "date-fns";
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

  const currentDate = new Date();
  const firstDayOfYear = startOfYear(currentDate);
  const lastDayOfYear = endOfYear(currentDate);
  const formattedFirstDay = format(firstDayOfYear, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
  const formattedLastDay = format(lastDayOfYear, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");

  const [selectedStartDate] = useState<string>(formattedFirstDay);
  const [selectedEndDate] = useState<string>(formattedLastDay);
  const [occurenceIdActionPlanBeingSeen, setOccurenceIdActionPlanBeingSeen] = useState<
    string | null
  >(null);

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
  const { isFetchingOccurrences, occurrences, isInitialLoading, refetchOccurrences } =
    useOccurrences(filters);

  function handleChangeFilters<TFilter extends keyof OccurrenceFilters>(filter: TFilter) {
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

  const handleRefetchOccurrences = () => {
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

  console.log("clic", occurrenceActionBeingSeen);

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
