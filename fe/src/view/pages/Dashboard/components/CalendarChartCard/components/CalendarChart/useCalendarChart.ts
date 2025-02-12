import { useFiltersContext } from "@/app/hooks/useFiltersContext";
import { calculateTotalsEfficiencies } from "@/app/utils/calculateTotalsEfficiencies";
import { useDashboard } from "@/view/pages/Dashboard/DashboardContext/useDashboard";
import { useNavigate } from "react-router-dom";

export const useCalendarChart = () => {
  const { filters } = useFiltersContext();
  const navigate = useNavigate();

  let dataString = filters.startDate.split("T")[0];

  if (dataString.slice(5) === "01-01") {
    let date = new Date(dataString);
    date.setDate(date.getDate() + 1);
    dataString = date.toISOString().slice(0, 10);
  }

  const calendarRange = {
    from: dataString,
    to: filters.endDate.split("T")[0],
  };

  const { efficiencies } = useDashboard();

  const data = efficiencies.map((efficiency) => {
    // Converte a string de data para um objeto Date
    const originalDate = new Date(efficiency.date.toString());

    // Adiciona um dia à data
    originalDate.setDate(originalDate.getDate() + 1);

    // Formata a data de volta para o formato original de string
    const formattedDate = originalDate.toISOString().split("T")[0];

    const realAvailabeHours =
      efficiency.availableHours +
      efficiency.standByHours +
      (efficiency.billedScheduledStopHours ?? 0);

    let dataItemValue = 0;

    if (realAvailabeHours === 24) {
      dataItemValue = 10;
    }

    const hasCommeciallyStoppedPeriod = efficiency.periods.some(
      ({ type }) => type === "COMMERCIALLY_STOPPED"
    );

    if (hasCommeciallyStoppedPeriod) {
      dataItemValue = 5;
    }

    const {
      totalAvailableHours,
      totalCommertialHours,
      totalRepairHours,
      totalGlossHours,
      totalStandByHours,
      totalScheduledStoppedHours,
      totalDtms,
      totalMovimentations,
      totalUnavailableHours,
      totalUnbilledScheduledStopHours,
    } = calculateTotalsEfficiencies([efficiency]);

    return {
      id: efficiency.id,
      value: dataItemValue,
      availableHours: realAvailabeHours,
      efficiency: ((realAvailabeHours / 24) * 100).toFixed(2) + "%",
      day: formattedDate, // Usa a data formatada
      date: new Date(formattedDate), // Garante que a data é o objeto Date correto
      totalAvailableHours,
      totalCommertialHours,
      totalRepairHours,
      totalGlossHours,
      totalStandByHours,
      totalScheduledStoppedHours,
      totalDtms,
      totalMovimentations,
      totalUnavailableHours,
      totalUnbilledScheduledStopHours,
    };
  });

  return {
    calendarRange,
    data,
    navigate,
  };
};
