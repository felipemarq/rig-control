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
  isEmpty: boolean | undefined;
  hasTorOccurrence: boolean | undefined;
  hasTarOccurrence: boolean | undefined;
  hasNotAbsentOccurrence: boolean | undefined;
  hasCommutingOccurrence: boolean | undefined;
  hasAbsentOccurrencesOccurrence: boolean | undefined;
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

  const allTaxes = occurrencesTaxes?.absentOccurrences.concat(
    occurrencesTaxes?.commutingOccurrences,
    occurrencesTaxes?.notAbsentOccurrences,
    occurrencesTaxes?.tarOccurrences,
    occurrencesTaxes?.torOccurrences
  );
  const isEmpty = allTaxes?.every((tax) => tax.count === 0);

  const hasTorOccurrence = occurrencesTaxes?.torOccurrences.some((tax) => tax.count > 0);
  const hasTarOccurrence = occurrencesTaxes?.tarOccurrences.some((tax) => tax.count > 0);
  const hasNotAbsentOccurrence = occurrencesTaxes?.notAbsentOccurrences.some(
    (tax) => tax.count > 0
  );
  const hasCommutingOccurrence = occurrencesTaxes?.commutingOccurrences.some(
    (tax) => tax.count > 0
  );
  const hasAbsentOccurrencesOccurrence = occurrencesTaxes?.absentOccurrences.some(
    (tax) => tax.count > 0
  );

  return (
    <TotalManHoursDashboardContext.Provider
      value={{
        hasAbsentOccurrencesOccurrence,
        hasCommutingOccurrence,
        hasNotAbsentOccurrence,
        hasTarOccurrence,
        hasTorOccurrence,
        isEmpty,
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
