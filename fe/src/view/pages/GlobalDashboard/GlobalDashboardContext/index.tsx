import React, { createContext, useMemo, useState } from "react";
import { useAuth } from "../../../../app/hooks/useAuth";
import { useEfficienciesRigsAverage } from "../../../../app/hooks/efficiencies/useEfficienciesRigsAverage";
import { useGetUnbilledPeriods } from "../../../../app/hooks/periods/useGetUnbilledPeriods";
import { useFiltersContext } from "../../../../app/hooks/useFiltersContext";
import { User } from "../../../../app/entities/User";
import { differenceInDays, parse } from "date-fns";
import { RigsAverageResponse } from "../../../../app/services/efficienciesService/getRigsAverage";
import { GetUnbilledPeriodsResponse } from "../../../../app/services/periodsService/getUnbilledPeriods";
import { PeriodType } from "../../../../app/entities/PeriodType";
import { UF } from "../../../../app/entities/Rig";
import { PieChartData } from "../components/UnbilledPeriodsPieChartCard/UnbilledPeriodsPieChart/useUnbilledPeriodsPieChart";
import { getDiffInMinutes } from "../../../../app/utils/getDiffInMinutes";
import { formatNumberWithFixedDecimals } from "../../../../app/utils/formatNumberWithFixedDecimals";
import { useTheme } from "@/app/contexts/ThemeContext";

// Definição do tipo do contexto
interface GlobalDashboardContextValue {
  selectedPieChartView: PeriodType;
  selectedDetailPieChartView: null | string;
  isEmpty: boolean;
  handleSelectedPieChartViewChange(type: PeriodType): void;
  handleSelectedDetailPieChartViewChange(type: string): void;
  handleApplyFilters(): void;
  user: User | undefined;
  signout(): void;
  rigsAverage: RigsAverageResponse;
  filteredRigsAverage: RigsAverageResponse;
  isFetchingRigsAverage: boolean;
  totalDaysSelected: number;
  unbilledPeriods: GetUnbilledPeriodsResponse;
  isFetchingUnbilledPeriods: boolean;
  isDetailsGraphVisible: boolean;
  handleCloseDetailsGraph(): void;
  mappedRigsAverage: {
    rig: string;
    daysNotRegistered: number;
    state: UF;
    rigId: string;
  }[];
  isChartDataEmpty: boolean;
  chartData: PieChartData;
  statBox: {
    averageHours: number;
    averageHoursPercentage: number;
    averageUnavailableHours: number;
  };
  handleChangeDashboardView: (view: DashboardView) => void;
  selectedDashboardView: DashboardView;
}

type DashboardView = "ALL" | "BA" | "SE" | "AL";

// Criação do contexto
export const GlobalDashboardContext = createContext({} as GlobalDashboardContextValue);

export const GlobalDashboardProvider = ({ children }: { children: React.ReactNode }) => {
  // Utilização dos hooks para autenticação e contexto da barra lateral
  const { user, signout } = useAuth();

  // Estados iniciais para as datas (primeiro e último dia do mês atual)
  const { filters } = useFiltersContext();
  const { primaryColor } = useTheme();
  const [isDetailsGraphVisible, setIsDetailsGraphVisible] = useState(false);
  const [selectedPieChartView, setSelectedPieChartView] = useState(PeriodType.REPAIR);

  const [selectedDetailPieChartView, setSelectedDetailPieChartView] = useState<
    null | string
  >(null);

  const handleSelectedPieChartViewChange = (type: PeriodType) => {
    setIsDetailsGraphVisible(true);
    setSelectedPieChartView(type);
    setSelectedDetailPieChartView(null);
  };

  const handleSelectedDetailPieChartViewChange = (classification: string) => {
    setSelectedDetailPieChartView(classification);
  };

  const handleCloseDetailsGraph = () => {
    setIsDetailsGraphVisible(false);
  };

  // Utilização dos hooks para eficiências e médias de eficiência

  const { rigsAverage, refetchRigsAverage, isFetchingRigsAverage } =
    useEfficienciesRigsAverage(
      {
        startDate: filters.startDate,
        endDate: filters.endDate,
      },
      true
    );

  const [selectedDashboardView, setSelectedDashboardView] =
    useState<DashboardView>("ALL");

  const filteredRigsAverage = useMemo(() => {
    if (selectedDashboardView === "ALL") {
      return rigsAverage;
    }

    return rigsAverage.filter(({ state }) => (state as string) === selectedDashboardView);
  }, [selectedDashboardView, rigsAverage]);

  const handleChangeDashboardView = (view: DashboardView) => {
    setSelectedDashboardView(view);
  };

  let rigsAverageTotalHours = 0;

  filteredRigsAverage.forEach((rigAverage) => {
    rigsAverageTotalHours += Math.round(rigAverage.avg);
  });

  const {
    unbilledPeriods: notFilteredUnbilledPeriods,
    refetchUnbilledPeriods,
    isFetchingUnbilledPeriods,
  } = useGetUnbilledPeriods(
    {
      startDate: filters.startDate,
      endDate: filters.endDate,
    },
    true
  );

  let unbilledPeriods = notFilteredUnbilledPeriods.filter(
    (period) => period.classification !== "SCHEDULED_STOP"
  );

  const averageHours = formatNumberWithFixedDecimals(
    rigsAverageTotalHours / filteredRigsAverage.length,
    2
  );

  const isAverageHoursNaN = isNaN(averageHours);

  const statBox = {
    averageHours: isAverageHoursNaN ? 0 : averageHours,
    averageUnavailableHours: isAverageHoursNaN ? 0 : 24 - averageHours,
    averageHoursPercentage:
      formatNumberWithFixedDecimals(
        ((rigsAverageTotalHours / filteredRigsAverage.length) * 100) / 24,
        2
      ) ?? 0,
  };

  const isEmpty: boolean = filteredRigsAverage.length === 0;

  const [totalDaysSelected, setTotalDaysSelected] = useState(
    differenceInDays(filters.endDate, filters.startDate) + 1
  );

  const mappedRigsAverage = filteredRigsAverage
    .map(({ count, rig, rigId, state, commercialDays }) => {
      return {
        rig,
        daysNotRegistered: totalDaysSelected - (count + commercialDays),
        state,
        rigId,
      };
    })
    .sort((a, b) => b.daysNotRegistered - a.daysNotRegistered);

  const chartData: PieChartData = unbilledPeriods.reduce((acc: PieChartData, current) => {
    const parsedStartHour = parse(
      current.startHour.split("T")[1].slice(0, 5),
      "HH:mm",
      new Date()
    );
    const parsedEndHour = parse(
      current.endHour.split("T")[1].slice(0, 5),
      "HH:mm",
      new Date()
    );

    const foundIndex = acc.findIndex((item) => item.id === current.type);

    const diffInHours = getDiffInMinutes(parsedEndHour, parsedStartHour) / 60;

    if (foundIndex === -1) {
      acc.push({
        id: current.type,
        label: current.type,
        value: Number(diffInHours.toFixed(2)),
        color: current.type === "REPAIR" ? primaryColor : "#81c460",
      });
    } else {
      acc = acc.map((accItem) =>
        accItem.id === current.type
          ? {
              ...accItem,
              value: Number((accItem.value + diffInHours).toFixed(2)),
            }
          : accItem
      );
    }

    return acc;
  }, []);

  const isChartDataEmpty = chartData.every((data) => data.value === 0);

  // Funções para manipulação das datas e filtros
  const handleApplyFilters = () => {
    setTotalDaysSelected(differenceInDays(filters.endDate, filters.startDate) + 1);
    refetchRigsAverage();
    refetchUnbilledPeriods();
  };

  // Retorno do provedor do contexto com os valores e funções necessárias
  return (
    <GlobalDashboardContext.Provider
      value={{
        handleSelectedDetailPieChartViewChange,
        selectedDetailPieChartView,
        handleChangeDashboardView,
        selectedDashboardView,
        statBox,
        filteredRigsAverage,
        chartData,
        isChartDataEmpty,
        unbilledPeriods,
        mappedRigsAverage,
        selectedPieChartView,
        isFetchingUnbilledPeriods,
        isDetailsGraphVisible,
        handleSelectedPieChartViewChange,
        handleApplyFilters,
        user,
        handleCloseDetailsGraph,
        signout,
        totalDaysSelected,
        rigsAverage,
        isFetchingRigsAverage,
        isEmpty,
      }}
    >
      {children}
    </GlobalDashboardContext.Provider>
  );
};
