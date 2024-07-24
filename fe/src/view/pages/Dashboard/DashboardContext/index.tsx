import React, { createContext, useEffect, useState } from "react";
import { useEfficiencies } from "../../../../app/hooks/efficiencies/useEfficiencies";
import { useAuth } from "../../../../app/hooks/useAuth";
import { User } from "../../../../app/entities/User";
import { Efficiency } from "../entities/Efficiency";
import { EfficienciesResponse } from "../../../../app/services/efficienciesService/getAll";
import { getRepairPeriods } from "../../../../app/utils/getRepairPeriods";
import { Period } from "../../../../app/entities/Period";
import { useFiltersContext } from "../../../../app/hooks/useFiltersContext";
import { getGlossPeriods } from "../../../../app/utils/getGlossPeriods";
import { useWindowWidth } from "@/app/hooks/useWindowWidth";
import { useMutation } from "@tanstack/react-query";
import { MutationKeys } from "@/app/config/MutationKeys";
import { userLogCreateParams } from "@/app/services/userLogsService/create";
import { userLogsService } from "@/app/services/userLogsService";
import { getCurrentISOString } from "@/app/utils/getCurrentISOString";
import { AverageResponse } from "@/app/services/efficienciesService/getAverage";
import { useEfficiencyAverage } from "@/app/hooks/efficiencies/useEfficiencyAverage";

// Definição do tipo do contexto
interface DashboardContextValue {
  isFetchingEfficiencies: boolean;
  handleApplyFilters(): void;
  user: User | undefined;
  signout(): void;
  isEmpty: boolean;
  repairPeriods: Period[] | never[];
  glossPeriods: Period[] | never[];
  efficiencies: EfficienciesResponse;
  totalAvailableHours: number;
  availableHoursPercentage: number;
  totalUnavailableHours: number;
  unavailableHoursPercentage: number;
  totalDtms: number;
  totalMovimentations: number;
  selectedGloss: string | null;
  handleSelectGloss: (gloss: string) => void;
  selectedEquipment: string | null;
  handleSelectEquipment: (equipment: string) => void;
  handleRemoveSelectedEquipment: () => void;
  windowWidth: number;
  selectedRig: string;
  exceedsEfficiencyThreshold: boolean;
  isWrongVersion: boolean;
  average: AverageResponse;
  handleOpenPeriodDataGridModal: (periods: Period[]) => void;
  handleClosePeriodDataGridModal: () => void;
  isPeriodDataGridModalOpen: boolean;
  periodDataGridModalData: Period[] | null;
  handleFilterPeriods: (
    type: "REPAIR" | "GLOSS",
    classification: string
  ) => void;
}

// Criação do contexto
export const DashboardContext = createContext({} as DashboardContextValue);

export const DashboardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Utilização dos hooks para autenticação e contexto da barra lateral
  const { user, signout, isWrongVersion } = useAuth();

  const windowWidth = useWindowWidth();

  const { filters, selectedRig } = useFiltersContext();

  // Utilização dos hooks para eficiências e médias de eficiência
  const { efficiencies, isFetchingEfficiencies, refetchEffciencies } =
    useEfficiencies(filters);

  const { average, refetchAverage } = useEfficiencyAverage(filters.rigId);

  const isEmpty: boolean = efficiencies.length === 0;
  const exceedsEfficiencyThreshold: boolean = efficiencies.length >= 35;

  // Funções para manipulação das datas e filtros
  const handleApplyFilters = () => {
    refetchEffciencies();

    refetchAverage();
  };

  const repairPeriods = getRepairPeriods(efficiencies);

  const glossPeriods = getGlossPeriods(efficiencies);

  const [selectedEquipment, setSelectedEquipment] = useState<string | null>(
    null
  );

  const [selectedGloss, setSelectedGloss] = useState<string | null>(null);
  const [isPeriodDataGridModalOpen, setIsPeriodDataGridModalOpen] =
    useState(false);

  const [periodDataGridModalData, setPeriodDataGridModalData] = useState<
    null | Period[]
  >(null);

  const handleFilterPeriods = (
    type: "REPAIR" | "GLOSS",
    classification: string
  ) => {
    let periods: Period[] | null = null;

    if (type === "REPAIR") {
      periods = repairPeriods.filter(
        (period) =>
          period.classification === selectedEquipment &&
          period.repairClassification === classification
      );
    }

    if (periods) {
      handleOpenPeriodDataGridModal(periods);
    }
  };

  const handleOpenPeriodDataGridModal = (periods: Period[]) => {
    setIsPeriodDataGridModalOpen(true);
    setPeriodDataGridModalData(periods);
  };

  const handleClosePeriodDataGridModal = () => {
    setIsPeriodDataGridModalOpen(false);
    setPeriodDataGridModalData(null);
  };

  const handleSelectGloss = (gloss: string) => {
    setSelectedGloss(gloss);
  };

  const handleSelectEquipment = (equipment: string) => {
    setSelectedEquipment(equipment);
  };

  const handleRemoveSelectedEquipment = () => {
    setSelectedEquipment(null);
  };

  const { mutateAsync: mutateAsyncUserLog } = useMutation({
    mutationKey: [MutationKeys.USER_LOG],
    mutationFn: async (data: userLogCreateParams) => {
      return await userLogsService.create(data);
    },
  });

  useEffect(() => {
    mutateAsyncUserLog({ loginTime: getCurrentISOString() });
  }, []);

  // Cálculos para estatísticas das eficiências
  let totalAvailableHours: number = 0;
  let totalUnavailableHours: number = 0;
  let totalDtms: number = 0;
  let totalMovimentations: number = 0;

  efficiencies.forEach((efficiency: Efficiency) => {
    totalAvailableHours += efficiency.availableHours;
    totalUnavailableHours += 24 - efficiency.availableHours;

    totalMovimentations +=
      efficiency.fluidRatio.length + efficiency.equipmentRatio.length;

    const dtmFound = efficiency.periods.find(({ type }) => type === "DTM");

    if (dtmFound) {
      totalDtms++;
    }
  });

  const totalHours: number = totalAvailableHours + totalUnavailableHours;
  let availableHoursPercentage: number = Number(
    ((totalAvailableHours * 100) / totalHours).toFixed(2)
  );
  let unavailableHoursPercentage: number = Number(
    ((totalUnavailableHours * 100) / totalHours).toFixed(2)
  );

  // Retorno do provedor do contexto com os valores e funções necessárias
  return (
    <DashboardContext.Provider
      value={{
        average,
        windowWidth,
        handleRemoveSelectedEquipment,
        handleSelectEquipment,
        selectedEquipment,
        glossPeriods,
        repairPeriods,
        handleApplyFilters,
        efficiencies,
        isFetchingEfficiencies,
        user,
        signout,
        isEmpty,
        totalAvailableHours,
        availableHoursPercentage,
        totalUnavailableHours,
        unavailableHoursPercentage,
        totalDtms,
        totalMovimentations,
        handleSelectGloss,
        selectedRig,
        selectedGloss,
        exceedsEfficiencyThreshold,
        isWrongVersion,
        handleClosePeriodDataGridModal,
        handleOpenPeriodDataGridModal,
        isPeriodDataGridModalOpen,
        periodDataGridModalData,
        handleFilterPeriods,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
