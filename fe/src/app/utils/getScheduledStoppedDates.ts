import { EfficienciesResponse } from "../services/efficienciesService/getAll";
import { PersistanceEfficiency } from "../entities/PersistanceEfficiency";

export function getScheduledStoppedDates(efficiencies: EfficienciesResponse) {
  const allDates: string[] = [];

  efficiencies.forEach((efficiency: PersistanceEfficiency) => {
    const hasScheduledStopped = efficiency.periods.find(
      (period) => period.type === "SCHEDULED_STOP"
    );

    if (hasScheduledStopped) {
      allDates.push((efficiency.date as string).split("T")[0]);
    }
  });
  return allDates;
}
