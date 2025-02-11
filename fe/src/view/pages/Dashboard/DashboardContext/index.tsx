import React, { createContext, useEffect, useState } from "react";
import { useEfficiencies } from "../../../../app/hooks/efficiencies/useEfficiencies";
import { useAuth } from "../../../../app/hooks/useAuth";
import { User } from "../../../../app/entities/User";
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
import { useGetWellsCountByRig } from "@/app/hooks/efficiencies/useGetWellsCountByRig";
import { RigWellsCountResponse } from "@/app/services/efficienciesService/getWellsCountByRig";
import { useNotifications } from "@/app/hooks/useNotifications";
import { Notification } from "@/app/entities/Notification";
import { useLocation } from "react-router-dom";
import { addDays, differenceInDays, parseISO } from "date-fns";
import { getCommertialyStoppedDates } from "@/app/utils/getCommertialyStoppedDates";
import { getScheduledStoppedDates } from "@/app/utils/getScheduledStoppedDates";
import { calculateTotalsEfficiencies } from "@/app/utils/calculateTotalsEfficiencies";

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
  handleFilterPeriods: (type: "REPAIR" | "GLOSS", classification: string) => void;
  wellsCount: RigWellsCountResponse;
  showNotifications: boolean;
  setShowNotifications: (showNotifications: boolean) => void;
  notifications: Notification[];
  handleMarkNotificationAsRead: (notificationId: string) => Promise<void>;
  isPending: boolean;
  missingDates: string[];
  scheduledStoppedDates: string[];
  commerciallyStoppedDates: string[];
  userHasPendingNotifications: boolean;
}

// Criação do contexto
export const DashboardContext = createContext({} as DashboardContextValue);

export const DashboardProvider = ({ children }: { children: React.ReactNode }) => {
  // Utilização dos hooks para autenticação e contexto da barra lateral
  const { user, signout, isWrongVersion } = useAuth();
  const {
    showNotifications,
    setShowNotifications,
    notifications,
    handleMarkNotificationAsRead,
    isPending,
  } = useNotifications();

  const userHasPendingNotifications = notifications.some(
    (notification) => !notification.isRead
  );

  const windowWidth = useWindowWidth();
  const location = useLocation();

  const { filters, selectedRig } = useFiltersContext();

  // Utilização dos hooks para eficiências e médias de eficiência
  const { efficiencies, isFetchingEfficiencies, refetchEffciencies } =
    useEfficiencies(filters);

  const commerciallyStoppedDates = getCommertialyStoppedDates(efficiencies);
  const scheduledStoppedDates = getScheduledStoppedDates(efficiencies);

  function getMissingDates(
    startDate: string,
    endDate: string,
    efficiencies: EfficienciesResponse
  ) {
    // Converte as datas para objetos Date
    const start = parseISO(startDate);
    const end = parseISO(endDate);

    // Cria um conjunto de todas as datas no intervalo
    const allDates = [];
    for (let i = 0; i <= differenceInDays(end, start); i++) {
      allDates.push(addDays(start, i).toISOString().split("T")[0]); // Formata como "YYYY-MM-DD"
    }

    // Obtem as datas presentes em efficiencies
    const efficiencyDates = efficiencies.map(
      (efficiency) => (efficiency.date as string).split("T")[0] // Formata como "YYYY-MM-DD"
    );

    // Calcula as datas que estão faltando
    const missingDates = allDates.filter((date) => !efficiencyDates.includes(date));

    return missingDates;
  }

  const missingDates = getMissingDates(filters.startDate, filters.endDate, efficiencies);

  const { wellsCount, refetchWellsCount } = useGetWellsCountByRig(filters.rigId);
  const { average, refetchAverage } = useEfficiencyAverage({
    rigId: filters.rigId,
    year: new Date(filters.startDate).getFullYear(),
  });

  console.log("efficiencies", efficiencies);

  const isEmpty: boolean = efficiencies.length === 0;
  const exceedsEfficiencyThreshold: boolean = efficiencies.length >= 35;

  // Funções para manipulação das datas e filtros
  const handleApplyFilters = () => {
    refetchEffciencies();
    refetchWellsCount();
    refetchAverage();
  };

  const repairPeriods = getRepairPeriods(efficiencies);

  const glossPeriods = getGlossPeriods(efficiencies);

  const [selectedEquipment, setSelectedEquipment] = useState<string | null>(null);

  const [selectedGloss, setSelectedGloss] = useState<string | null>(null);
  const [isPeriodDataGridModalOpen, setIsPeriodDataGridModalOpen] = useState(false);

  const [periodDataGridModalData, setPeriodDataGridModalData] = useState<null | Period[]>(
    null
  );

  /*  console.log(
    "Gloss periods",
    glossPeriods.filter((period) => period.classification === "LABOR")
  ); */

  const handleFilterPeriods = (type: "REPAIR" | "GLOSS", classification: string) => {
    let periods: Period[] | null = null;

    if (type === "REPAIR") {
      periods = repairPeriods.filter(
        (period) =>
          period.classification === selectedEquipment &&
          period.repairClassification === classification
      );
    }

    if (type === "GLOSS") {
      periods = glossPeriods.filter((period) => period.classification === classification);
    }

    if (periods) {
      handleOpenPeriodDataGridModal(periods);
    }
  };

  const handleOpenPeriodDataGridModal = (periods: Period[]) => {
    setIsPeriodDataGridModalOpen(true);
    console.log(periods);
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

  useEffect(() => {
    if (location.state?.shouldApplyFilters) {
      handleApplyFilters();
    }
  }, [location.state?.shouldApplyFilters]);

  const {
    totalAvailableHours,
    /*  totalCommertialHours, */
    totalRepairHours,
    totalGlossHours,
    totalStandByHours,
    totalScheduledStoppedHours,
    totalDtms,
    totalMovimentations,
    totalUnavailableHours,
    /*  totalUnbilledScheduledStopHours, */
  } = calculateTotalsEfficiencies(efficiencies);

  const totalHoursToCalculateEfficiency =
    totalAvailableHours +
    totalRepairHours +
    totalGlossHours +
    totalStandByHours +
    totalScheduledStoppedHours;

  const totalHours: number = totalAvailableHours + totalUnavailableHours;

  let availableHoursPercentage: number = Number(
    ((totalAvailableHours * 100) / totalHoursToCalculateEfficiency).toFixed(2)
  );
  let unavailableHoursPercentage: number = Number(
    ((totalUnavailableHours * 100) / totalHours).toFixed(2)
  );

  // Retorno do provedor do contexto com os valores e funções necessárias
  return (
    <DashboardContext.Provider
      value={{
        missingDates,
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
        wellsCount,
        showNotifications,
        setShowNotifications,
        notifications,
        handleMarkNotificationAsRead,
        isPending,
        scheduledStoppedDates,
        commerciallyStoppedDates,
        userHasPendingNotifications,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
