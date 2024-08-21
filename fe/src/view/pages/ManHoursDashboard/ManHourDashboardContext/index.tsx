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
}

// Criação do contexto
export const ManHourDashboardContext = createContext(
  {} as ManHourDashboardContextValue
);

export const ManHourDashboardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
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
    <ManHourDashboardContext.Provider
      value={{
        handleChangeBaseId,
        selectedBaseId,
        bases,
        isFetchingBases,
        occurrencesTaxes,
        applyFilters,
        isFetchingOccurrencesTaxes:
          isOccurrencesTaxesInitialLoading || isFetchingOccurrencesTaxes,
        selectedBaseName,
        totalOccurrences,
      }}
    >
      {children}
    </ManHourDashboardContext.Provider>
  );
};
