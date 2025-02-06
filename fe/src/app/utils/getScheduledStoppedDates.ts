import { Efficiency } from "@/view/pages/Dashboard/entities/Efficiency";
import { EfficienciesResponse } from "../services/efficienciesService/getAll";

export function getScheduledStoppedDates(efficiencies: EfficienciesResponse) {
  const allDates: string[] = [];

  efficiencies.forEach((efficiency: Efficiency) => {
    const hasScheduledStopped = efficiency.periods.find(
      (period) => period.type === "SCHEDULED_STOP"
    );

    if (hasScheduledStopped) {
      allDates.push((efficiency.date as string).split("T")[0]);
    }
  });
  return allDates;
}
