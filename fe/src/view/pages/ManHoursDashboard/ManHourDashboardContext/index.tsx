import { useOccurrencesTaxesByBaseId } from "@/app/hooks/occurrences/useOccurrencesTaxesByBaseId";
import { useBases } from "@/app/hooks/useBases";
import { BasesResponse } from "@/app/services/basesService/getAll";
import { OccurrencesTaxesResponse } from "@/app/services/occurrencesService/getTaxes";
import { createContext, useMemo, useState } from "react";

// Definição do tipo do contexto
interface ManHourDashboardContextValue {
  handleChangeBaseId(baseId: string): void;
  selectedBaseId: string;
  bases: BasesResponse;
  isFetchingBases: boolean;
  occurrencesTaxes: OccurrencesTaxesResponse | undefined;
  applyFilters(): void;
  isFetchingOccurrencesTaxes: boolean;
  selectedBaseName: string | undefined;
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
export const ManHourDashboardContext = createContext({} as ManHourDashboardContextValue);

export const ManHourDashboardProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedBaseId, setSelectedBaseId] = useState<string>("");

  const { bases, isFetchingBases } = useBases();

  const {
    occurrencesTaxes,
    refetchOccurrencesTaxes,
    isFetchingOccurrencesTaxes,
    isOccurrencesTaxesInitialLoading,
  } = useOccurrencesTaxesByBaseId(selectedBaseId);

  const selectedBaseName = useMemo(() => {
    return bases.find((base) => base.id === selectedBaseId)?.name;
  }, [selectedBaseId]);

  const handleChangeBaseId = (baseId: string) => {
    setSelectedBaseId(baseId);
  };

  const applyFilters = () => {
    refetchOccurrencesTaxes();
  };

  const totalOccurrences = useMemo(() => {
    let totalTarOccurrences = 0;
    let totalTorOccurrences = 0;
    let totalTfsaOccurrences = 0;
    let totalTfcaOccurrences = 0;

    console.log("Occurences Taxex", occurrencesTaxes);

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
    <ManHourDashboardContext.Provider
      value={{
        bases,
        isEmpty,
        applyFilters,
        selectedBaseId,
        isFetchingBases,
        hasTorOccurrence,
        hasTarOccurrence,
        occurrencesTaxes,
        handleChangeBaseId,
        hasNotAbsentOccurrence,
        hasCommutingOccurrence,
        isFetchingOccurrencesTaxes:
          isOccurrencesTaxesInitialLoading || isFetchingOccurrencesTaxes,
        selectedBaseName,
        totalOccurrences,
        hasAbsentOccurrencesOccurrence,
      }}
    >
      {children}
    </ManHourDashboardContext.Provider>
  );
};
