// Importações necessárias - useDashboard e Efficiency
import { useTheme } from "@/app/contexts/ThemeContext";
import { useDashboard } from "../../../../DashboardContext/useDashboard";

import { PersistanceEfficiency } from "@/app/entities/PersistanceEfficiency";
import { calculateTotalsEfficiencies } from "@/app/utils/calculateTotalsEfficiencies";

// Definição da estrutura de saída para o gráfico de linha
interface OutputData {
  id: string;
  x: string;
  y: number;
  totalAvailableHours: number;
  totalCommertialHours: number;
  totalRepairHours: number;
  totalGlossHours: number;
  totalStandByHours: number;
  totalScheduledStoppedHours: number;
  totalDtms: number;
  totalMovimentations: number;
  totalUnavailableHours: number;
  totalUnbilledScheduledStopHours: number;
}

// Hook responsável por formatar dados para o gráfico de linha
export const useLineChart = () => {
  // Obtém as eficiências e o usuário do contexto do Dashboard
  const { efficiencies } = useDashboard();
  const { primaryColor } = useTheme();
  // Inicializa a estrutura de dados para o gráfico de linha
  let data: [
    {
      id: string;
      color: string;
      data: OutputData[];
    }
  ] = [
    {
      id: "SPT", // Usando o nome da sonda como ID inicial
      color: primaryColor,
      data: [],
    },
  ];

  // Função para formatar as eficiências para o gráfico de linha
  const formatEfficiencyToLineChart = (efficiencies: PersistanceEfficiency[]) => {
    //Coloca o nome da sonda no ID para aparecer no Hover do gráfico
    data[0]["id"] = efficiencies[0].rig.name;
    // Itera sobre as eficiências para formatar os dados
    efficiencies.forEach((efficiency) => {
      // Formata a data no formato desejado para o gráfico de linha (dia/mês)
      const formattedDate = `${new Date(efficiency.date)
        .getDate()
        .toString()
        .padStart(2, "0")}/${(new Date(efficiency.date).getMonth() + 1)
        .toString()
        .padStart(2, "0")}`;

      const billedScheduledStopHoursNumber =
        efficiency.billedScheduledStopHours ??
        0 + (efficiency.unbilledScheduledStopHours ?? 0);

      // Calcula a porcentagem de horas disponíveis
      const availableHoursPercentage =
        ((efficiency.availableHours +
          efficiency.standByHours +
          billedScheduledStopHoursNumber) *
          100) /
        24;

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

      // Adiciona os dados formatados ao array de dados do gráfico
      data[0].data.push({
        id: efficiency.id,
        x: formattedDate,
        y: Number(availableHoursPercentage.toFixed(2)), // Ajusta para duas casas decimais
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
      });
    });
  };

  // Chama a função para formatar eficiências para o gráfico de linha
  formatEfficiencyToLineChart(efficiencies);

  // Retorna os dados formatados para o gráfico de linha
  return { data };
};
