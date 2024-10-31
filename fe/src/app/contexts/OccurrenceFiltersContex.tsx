import { endOfYear, format, startOfYear } from "date-fns";
import { createContext, useState } from "react";
import { OccurrenceFilters } from "../services/occurrencesService/getAll";

interface OccurrenceFiltersContexContexValue {
  handleChangeFilters<TFilter extends keyof OccurrenceFilters>(
    filter: TFilter
  ): (value: OccurrenceFilters[TFilter]) => void;
  filters: OccurrenceFilters;
  handleClearFilters(): void;
}

export const OccurrenceFiltersContext = createContext(
  {} as OccurrenceFiltersContexContexValue
);

export const OccurrenceFiltersProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const currentDate = new Date();
  const firstDayOfYear = startOfYear(currentDate);
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
      }}
    >
      {children}
    </OccurrenceFiltersContext.Provider>
  );
};
