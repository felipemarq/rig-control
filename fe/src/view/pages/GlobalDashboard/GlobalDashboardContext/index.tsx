import React, { createContext, useMemo, useState } from "react";
import { useAuth } from "../../../../app/hooks/useAuth";
import { useEfficienciesRigsAverage } from "../../../../app/hooks/efficiencies/useEfficienciesRigsAverage";
import { useGetUnbilledPeriods } from "../../../../app/hooks/periods/useGetUnbilledPeriods";
import { useFiltersContext } from "../../../../app/hooks/useFiltersContext";
import { User } from "../../../../app/entities/User";
import { differenceInDays, differenceInMinutes, parse } from "date-fns";
import { RigsAverageResponse } from "../../../../app/services/efficienciesService/getRigsAverage";
import { GetUnbilledPeriodsResponse } from "../../../../app/services/periodsService/getUnbilledPeriods";
import { PeriodType } from "../../../../app/entities/PeriodType";
import { UF } from "../../../../app/entities/Rig";
import { getDiffInMinutes } from "../../../../app/utils/getDiffInMinutes";
import { formatNumberWithFixedDecimals } from "../../../../app/utils/formatNumberWithFixedDecimals";
import { useTheme } from "@/app/contexts/ThemeContext";
import { translateType } from "@/app/utils/translateType";
import { translateClassification } from "@/app/utils/translateClassification";
import { RepairClassification } from "@/app/entities/RepairClassification";
import { translateRepairClassification } from "@/app/utils/translateRepairClassification";
import { UnbilledPeriodsPieChartData } from "../components/UnbilledPeriodsPieChartCard/components/UnbilledPeriodsPieChartCn";
import { RepairDetailsPieChartData } from "../components/RepairDetailsPieChartCard/components/RepairDetailsPieChartCn";
import { PeriodsDetailsPieChartData } from "../components/PeriodsDetailsPieChartCard/components/PeriodsDetailsPieChartCn";
import { getAllRigsReport } from "@/app/services/excelService/excelPeriodsReport";
import { saveAs } from "file-saver";

/* import { useEfficiencies } from "@/app/hooks/efficiencies/useEfficiencies";
import { useGetByPeriodType } from "@/app/hooks/periods/useGetByPeriodType";
import { OrderByType } from "@/app/entities/OrderBy"; */

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
  unbilledPeriodsChartData: UnbilledPeriodsPieChartData;
  statBox: {
    averageHours: number;
    averageHoursPercentage: number;
    averageUnavailableHours: number;
  };
  handleChangeDashboardView: (view: DashboardView) => void;
  selectedDashboardView: DashboardView;
  selectedPeriodClassification: string | null;
  unbilledPeriodsDetailsChartData: PeriodsDetailsPieChartData;
  handleChangePeriodDetailsGraphView: () => void;
  isPeriodDetailsGraphExpanded: boolean;
  selectedPeriodDetailsGraphView: "HOURS" | "PERCENTAGE";
  handleExpandPeriodDetailsGraph: () => void;
  repairDetailsChartData: RepairDetailsPieChartData;
  mappedRigsUnbilledHours: {
    id: string;
    label: string;
    value: number;
  }[];
  mappedRigsRepairHours: {
    id: string;
    label: string;
    value: number;
  }[];
  handleSelectedRepairPeriodClassificationChange: (
    classification: string,
  ) => void;
  selectedRepairPeriodClassification: string | null;
  hasNoUnbilledPeriods: boolean;
  handleExcelDownload: () => Promise<void>;
  isFetchingReport: boolean;
}

type DashboardView = "ALL" | "BA" | "SE" | "AL";

// Criação do contexto
export const GlobalDashboardContext = createContext(
  {} as GlobalDashboardContextValue,
);

export const GlobalDashboardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Utilização dos hooks para autenticação e contexto da barra lateral
  const { user, signout } = useAuth();

  // Estados iniciais para as datas (primeiro e último dia do mês atual)
  const { filters } = useFiltersContext();
  const { primaryColor } = useTheme();
  const [isDetailsGraphVisible, setIsDetailsGraphVisible] = useState(false);
  const [selectedPieChartView, setSelectedPieChartView] = useState(
    PeriodType.REPAIR,
  );
  const [selectedPeriodClassification, setSelectedPeriodClassification] =
    useState<string | null>(null);
  const [
    selectedRepairPeriodClassification,
    setSelectedRepairPeriodClassification,
  ] = useState<string | null>(null);
  const [isPeriodDetailsGraphExpanded, setIsPeriodDetailsGraphExpanded] =
    useState(false);
  const [selectedPeriodDetailsGraphView, setSelectedPeriodDetailsGraphView] =
    useState<"HOURS" | "PERCENTAGE">("PERCENTAGE");

  const [selectedDetailPieChartView, setSelectedDetailPieChartView] = useState<
    null | string
  >(null);
  const [isFetchingReport, setIsFetchingReport] = useState(false);

  const handleExcelDownload = async () => {
    try {
      setIsFetchingReport(true);
      const data = await getAllRigsReport({
        startDate: filters.startDate,
        endDate: filters.endDate,
      });

      const blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, "relatorio.xlsx");
    } catch (error) {
      console.error("Erro ao baixar o relatório", error);
    } finally {
      setIsFetchingReport(false);
    }
  };

  const handleChangePeriodDetailsGraphView = () => {
    setSelectedPeriodDetailsGraphView((prev) =>
      prev === "HOURS" ? "PERCENTAGE" : "HOURS",
    );
  };

  const handleExpandPeriodDetailsGraph = () => {
    setIsPeriodDetailsGraphExpanded((prev) => !prev);
  };

  const handleSelectedPieChartViewChange = (type: PeriodType) => {
    setIsDetailsGraphVisible(true);
    setSelectedPieChartView(type);
    setSelectedDetailPieChartView(null);
  };

  const handleSelectedDetailPieChartViewChange = (classification: string) => {
    setSelectedDetailPieChartView(classification);
    setSelectedPeriodClassification(classification);
  };

  const handleSelectedRepairPeriodClassificationChange = (
    classification: string,
  ) => {
    setSelectedRepairPeriodClassification(classification);
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
      true,
    );

  const [selectedDashboardView, setSelectedDashboardView] =
    useState<DashboardView>("ALL");

  const filteredRigsAverage = useMemo(() => {
    if (selectedDashboardView === "ALL") {
      return rigsAverage;
    }

    return rigsAverage.filter(
      ({ state }) => (state as string) === selectedDashboardView,
    );
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
    true,
  );

  const unbilledPeriods = useMemo(() => {
    return notFilteredUnbilledPeriods
      .filter((period) => period.classification !== "SCHEDULED_STOP")
      .filter((period) => {
        if (selectedDashboardView === "ALL") {
          return true;
        }

        return period.efficiency?.rig.state === selectedDashboardView;
      });
  }, [notFilteredUnbilledPeriods, selectedDashboardView]);

  const averageHours = formatNumberWithFixedDecimals(
    rigsAverageTotalHours / filteredRigsAverage.length,
    2,
  );

  const isAverageHoursNaN = isNaN(averageHours);

  const statBox = {
    averageHours: isAverageHoursNaN ? 0 : averageHours,
    averageUnavailableHours: isAverageHoursNaN ? 0 : 24 - averageHours,
    averageHoursPercentage:
      formatNumberWithFixedDecimals(
        ((rigsAverageTotalHours / filteredRigsAverage.length) * 100) / 24,
        2,
      ) ?? 0,
  };

  const isEmpty: boolean = filteredRigsAverage.length === 0;

  const hasNoUnbilledPeriods: boolean = unbilledPeriods.length === 0;

  const [totalDaysSelected, setTotalDaysSelected] = useState(
    differenceInDays(filters.endDate, filters.startDate) + 1,
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

  //Reduce para criar o chart de detalhes para todos os tipos de periodo
  const unbilledPeriodsChartData: UnbilledPeriodsPieChartData =
    unbilledPeriods.reduce((acc: UnbilledPeriodsPieChartData, current) => {
      const parsedStartHour = parse(
        current.startHour.split("T")[1].slice(0, 5),
        "HH:mm",
        new Date(),
      );
      const parsedEndHour = parse(
        current.endHour.split("T")[1].slice(0, 5),
        "HH:mm",
        new Date(),
      );

      const translatedType = translateType(current.type);

      const foundIndex = acc.findIndex((item) => item.id === translatedType);

      const diffInHours = getDiffInMinutes(parsedEndHour, parsedStartHour) / 60;

      let color = primaryColor;

      if (current.type === "REPAIR") {
        color = "#81c460";
      }

      if (current.type === "SCHEDULED_STOP") {
        color = "#f87171";
      }

      if (current.type === "COMMERCIALLY_STOPPED") {
        color = "#FACC15";
      }

      if (foundIndex === -1) {
        acc.push({
          id: translatedType!,
          label: current.type,
          value: Number(diffInHours.toFixed(2)),
          fill: color,
        });
      } else {
        acc = acc.map((accItem) =>
          accItem.id === translatedType
            ? {
                ...accItem,
                value: Number((accItem.value + diffInHours).toFixed(2)),
              }
            : accItem,
        );
      }

      return acc;
    }, []);

 

  //Dados para o grafico de detalhes por tipo de periodo selecionado

  const pieChartColors = [
    primaryColor, // primary 500
    "#81c460",
    "#ffda79", // Amarelo
    "#564787", // Roxo
    "#f38181", // Rosa
    "#84fab0", // Verde claro
    "#ff5722", // Laranja
    "#416788", // Azul marinho
    "#b8de6f", // Verde limão
    "#94618e", // Roxo claro
    "#ffa45b", // Pêssego
    "#a3de83", // Verde pastel
  ];

  const parseHour = (hourString: string) =>
    parse(hourString.split("T")[1].slice(0, 5), "HH:mm", new Date());

  const filteredUnbilledPeriodsByType = useMemo(() => {
    return unbilledPeriods.filter((period) =>
      selectedPieChartView ? period.type === selectedPieChartView : true,
    );
  }, [selectedPieChartView, unbilledPeriods]);

  const unbilledPeriodsDetailsChartData = useMemo(() => {
    const chartData = filteredUnbilledPeriodsByType.reduce(
      (acc: PeriodsDetailsPieChartData, current) => {
        const classification = translateClassification(current.classification)!;
        const foundItem = acc.find((accItem) => accItem.id === classification)!;

        const parsedStartHour = parseHour(current.startHour);
        const parsedEndHour = parseHour(current.endHour);

        const diffInHours =
          differenceInMinutes(parsedEndHour, parsedStartHour) / 60;

        if (!foundItem) {
          acc.push({
            id: classification,
            label: classification,
            value: Number(diffInHours.toFixed(2)),
            fill: pieChartColors[acc.length % pieChartColors.length], // Use modulo para evitar estouro de índice
          });
        } else {
          acc = acc.map((accItem) =>
            accItem.id === classification
              ? {
                  ...accItem,
                  value: Number((accItem.value + diffInHours).toFixed(2)),
                }
              : accItem,
          );
        }

        return acc;
      },
      [],
    );

    let totalHours = 0;

    chartData.forEach((item) => (totalHours += item.value));

    const mappedChartData: PeriodsDetailsPieChartData = chartData.map(
      (item) => ({
        ...item,
        value:
          selectedPeriodDetailsGraphView === "HOURS"
            ? item.value
            : Number(((item.value / totalHours) * 100).toFixed(2)),
      }),
    );

    return mappedChartData;
  }, [
    filteredUnbilledPeriodsByType,
    selectedPieChartView,
    selectedPeriodDetailsGraphView,
  ]);

  const mappedRigsUnbilledHours = useMemo(() => {
    let filteredPeriods = filteredUnbilledPeriodsByType;

    if (selectedDetailPieChartView) {
      filteredPeriods = filteredPeriods.filter(
        (period) =>
          translateClassification(period.classification) ===
          selectedDetailPieChartView,
      );
    }

    return filteredPeriods.reduce(
      (acc: { id: string; label: string; value: number }[], current) => {
        const rigName = current.efficiency?.rig.name!;
        const rigId = current.efficiency?.rigId!;

        const foundItem = acc.find((accItem) => accItem.id === rigId)!;

        const parsedStartHour = parseHour(current.startHour);
        const parsedEndHour = parseHour(current.endHour);
        const diffInHours =
          differenceInMinutes(parsedEndHour, parsedStartHour) / 60;

        if (!foundItem) {
          acc.push({
            id: rigId,
            label: rigName,
            value: Number(diffInHours.toFixed(2)),
          });
        } else {
          acc = acc.map((accItem) =>
            accItem.id === rigId
              ? {
                  ...accItem,
                  value: Number((accItem.value + diffInHours).toFixed(2)),
                }
              : accItem,
          );
        }

        return acc;
      },
      [],
    );
  }, [filteredUnbilledPeriodsByType, selectedDetailPieChartView]);

  const mappedRigsRepairHours = useMemo(() => {
    let filteredPeriods = filteredUnbilledPeriodsByType;

    if (selectedRepairPeriodClassification) {
      filteredPeriods = filteredPeriods.filter(
        (period) =>
          period.repairClassification === selectedRepairPeriodClassification &&
          translateClassification(period.classification) ===
            selectedDetailPieChartView,
      );
    }

    return filteredPeriods.reduce(
      (acc: { id: string; label: string; value: number }[], current) => {
        const rigName = current.efficiency?.rig.name!;
        const rigId = current.efficiency?.rigId!;

        const foundItem = acc.find((accItem) => accItem.id === rigId)!;

        const parsedStartHour = parseHour(current.startHour);
        const parsedEndHour = parseHour(current.endHour);
        const diffInHours =
          differenceInMinutes(parsedEndHour, parsedStartHour) / 60;

        if (!foundItem) {
          acc.push({
            id: rigId,
            label: rigName,
            value: Number(diffInHours.toFixed(2)),
          });
        } else {
          acc = acc.map((accItem) =>
            accItem.id === rigId
              ? {
                  ...accItem,
                  value: Number((accItem.value + diffInHours).toFixed(2)),
                }
              : accItem,
          );
        }

        return acc;
      },
      [],
    );
  }, [selectedRepairPeriodClassification]);

  const repairDetailsChartData = useMemo(() => {
    let totalHours = 0;

    const filteredPeriodsByRepairClassification =
      filteredUnbilledPeriodsByType.filter(
        (period) =>
          translateClassification(period.classification) ===
          selectedDetailPieChartView,
      );

    const repairDetailsChartData = filteredPeriodsByRepairClassification
      .reduce((acc: RepairDetailsPieChartData, current) => {
        const classification = translateRepairClassification(
          current.repairClassification as RepairClassification,
        );
        const foundItem = acc.find((accItem) => accItem.id === classification)!;

        const parsedStartHour = parseHour(current.startHour);
        const parsedEndHour = parseHour(current.endHour);
        const diffInHours =
          differenceInMinutes(parsedEndHour, parsedStartHour) / 60;

        totalHours += Number(diffInHours.toFixed(2));

        if (!foundItem) {
          acc.push({
            id: classification,
            label: classification,
            classification: current.repairClassification!,
            selectedPeriodClassification: selectedDetailPieChartView!,
            value: Number(diffInHours.toFixed(2)),
            fill: pieChartColors[acc.length % pieChartColors.length],
            percentage: Number(((0 / totalHours) * 100).toFixed(2)), // Use modulo para evitar estouro de índice
          });
        } else {
          acc = acc.map((accItem) =>
            accItem.id === classification
              ? {
                  ...accItem,
                  value: Number((accItem.value + diffInHours).toFixed(2)),
                }
              : accItem,
          );
        }

        return acc;
      }, [])
      .map((data) => ({
        ...data,
        percentage: Number(((data.value / totalHours) * 100).toFixed(2)),
      }));

    return repairDetailsChartData;
  }, [selectedDetailPieChartView]);

  const isChartDataEmpty = unbilledPeriodsChartData.every(
    (data) => data.value === 0,
  );

  // Funções para manipulação das datas e filtros
  const handleApplyFilters = () => {
    setTotalDaysSelected(
      differenceInDays(filters.endDate, filters.startDate) + 1,
    );
    refetchRigsAverage();
    refetchUnbilledPeriods();
  };

  // Retorno do provedor do contexto com os valores e funções necessárias
  return (
    <GlobalDashboardContext.Provider
      value={{
        handleExcelDownload,
        mappedRigsRepairHours,
        handleSelectedRepairPeriodClassificationChange,
        selectedRepairPeriodClassification,
        repairDetailsChartData,
        isFetchingReport,
        handleChangePeriodDetailsGraphView,
        handleExpandPeriodDetailsGraph,
        isPeriodDetailsGraphExpanded,
        selectedPeriodDetailsGraphView,
        handleSelectedDetailPieChartViewChange,
        selectedDetailPieChartView,
        handleChangeDashboardView,
        selectedDashboardView,
        statBox,
        filteredRigsAverage,
        hasNoUnbilledPeriods,
        unbilledPeriodsChartData,
        isChartDataEmpty,
        unbilledPeriods,
        mappedRigsAverage,
        selectedPieChartView,
        isFetchingUnbilledPeriods,
        isDetailsGraphVisible,
        unbilledPeriodsDetailsChartData,
        handleSelectedPieChartViewChange,
        handleApplyFilters,
        user,
        handleCloseDetailsGraph,
        signout,
        totalDaysSelected,
        rigsAverage,
        isFetchingRigsAverage,
        selectedPeriodClassification,
        isEmpty,
        mappedRigsUnbilledHours,
      }}
    >
      {children}
    </GlobalDashboardContext.Provider>
  );
};
