import { useFiltersContext } from "@/app/hooks/useFiltersContext";
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

  const data = efficiencies.map(({ id, availableHours, date }) => {
    // Converte a string de data para um objeto Date
    const originalDate = new Date(date.toString());

    // Adiciona um dia à data
    originalDate.setDate(originalDate.getDate() + 1);

    // Formata a data de volta para o formato original de string
    const formattedDate = originalDate.toISOString().split("T")[0];

    return {
      id,
      value: availableHours === 24 ? 1 : 0,
      availableHours,
      efficiency: ((availableHours / 24) * 100).toFixed(2) + "%",
      day: formattedDate, // Usa a data formatada
      date: new Date(formattedDate), // Garante que a data é o objeto Date correto
    };
  });

  return {
    calendarRange,
    data,
    navigate,
  };
};
