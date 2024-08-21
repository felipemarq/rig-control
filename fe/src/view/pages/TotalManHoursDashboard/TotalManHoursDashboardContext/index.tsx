import { useOccurrencesTaxes } from "@/app/hooks/occurrences/useOccurrencesTaxes";
import { useBases } from "@/app/hooks/useBases";
import { BasesResponse } from "@/app/services/basesService/getAll";
import { OccurrencesTaxesResponse } from "@/app/services/occurrencesService/getTaxes";

import { createContext, useMemo } from "react";

// Definição do tipo do contexto
interface TotalManHoursDashboardContextValue {
  bases: BasesResponse;
  isFetchingBases: boolean;
  occurrencesTaxes: OccurrencesTaxesResponse | undefined;
  isFetchingOccurrencesTaxes: boolean;
  totalOccurrences: {
    totalTarOccurrences: number;
    totalTorOccurrences: number;
    totalTfcaOccurrences: number;
    totalTfsaOccurrences: number;
  };
}

// Criação do contexto
export const TotalManHoursDashboardContext = createContext(
  {} as TotalManHoursDashboardContextValue
);

export const TotalManHoursDashboardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { bases, isFetchingBases } = useBases();

  const {
    occurrencesTaxes,
    isFetchingOccurrencesTaxes,
    isOccurrencesTaxesInitialLoading,
  } = useOccurrencesTaxes();

  const totalOccurrences = useMemo(() => {
    let totalTarOccurrences = 0;
    let totalTorOccurrences = 0;
    let totalTfsaOccurrences = 0;
    let totalTfcaOccurrences = 0;

    occurrencesTaxes?.tarOccurrences.forEach(
      ({ count }) => (totalTarOccurrences += count)
    );

    occurrencesTaxes?.torOccurrences.forEach(
      ({ count }) => (totalTorOccurrences += count)
    );

    occurrencesTaxes?.absentOccurrences.forEach(
      ({ count }) => (totalTfcaOccurrences += count)
    );

    occurrencesTaxes?.notAbsentOccurrences.forEach(
      ({ count }) => (totalTfsaOccurrences += count)
    );

    return {
      totalTarOccurrences,
      totalTorOccurrences,
      totalTfcaOccurrences,
      totalTfsaOccurrences,
    };
  }, [occurrencesTaxes]);

  return (
    <TotalManHoursDashboardContext.Provider
      value={{
        bases,
        isFetchingBases,
        occurrencesTaxes,
        isFetchingOccurrencesTaxes:
          isOccurrencesTaxesInitialLoading || isFetchingOccurrencesTaxes,
        totalOccurrences,
      }}
    >
      {children}
    </TotalManHoursDashboardContext.Provider>
  );
};
