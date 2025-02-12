import { endOfYear, format, startOfYear } from "date-fns";
import { createContext, useState } from "react";
import { OccurrenceFilters } from "../services/occurrencesService/getAll";
import { BasesResponse } from "../services/basesService/getAll";
import { useBases } from "../hooks/useBases";
import { useOccurrences } from "../hooks/occurrences/useOccurrences";

interface OccurrenceFiltersContexContexValue {
  handleChangeFilters<TFilter extends keyof OccurrenceFilters>(
    filter: TFilter
  ): (value: OccurrenceFilters[TFilter]) => void;
  filters: OccurrenceFilters;
  handleClearFilters(): void;
  bases: BasesResponse;
  isFetchingBases: boolean;
  handleApplyFilters: () => void;
}

export const OccurrenceFiltersContext = createContext(
  {} as OccurrenceFiltersContexContexValue
);

export const OccurrenceFiltersProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { bases, isFetchingBases } = useBases();
  const currentDate = new Date();
  const currentDateForManipulation = new Date();
  const firstDayOfYear = startOfYear(currentDateForManipulation.setFullYear(2024));
  const lastDayOfYear = endOfYear(currentDate);
  const formattedFirstDay = format(firstDayOfYear, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
  const formattedLastDay = format(lastDayOfYear, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");

  const [selectedStartDate] = useState<string>(formattedFirstDay);
  const [selectedEndDate] = useState<string>(formattedLastDay);

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

  const { refetchOccurrences } = useOccurrences(filters);

  const handleApplyFilters = () => {
    refetchOccurrences();
  };

  function handleChangeFilters<TFilter extends keyof OccurrenceFilters>(filter: TFilter) {
    return (value: OccurrenceFilters[TFilter]) => {
      if (value === filters[filter]) return;

      setFilters((prevState) => ({
        ...prevState,
        [filter]: value,
      }));
    };
  }

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

  return (
    <OccurrenceFiltersContext.Provider
      value={{
        filters,
        handleClearFilters,
        handleChangeFilters,
        bases,
        isFetchingBases,
        handleApplyFilters,
      }}
    >
      {children}
    </OccurrenceFiltersContext.Provider>
  );
};
