import { EfficienciesResponse } from "../services/efficienciesService/getAll";

export function getCommertialyStoppedDates(efficiencies: EfficienciesResponse) {
  const allDates: string[] = [];
  efficiencies.forEach((efficiency) => {
    const hasCommertialStopped = efficiency.periods.find(
      (period) => period.type === "COMMERCIALLY_STOPPED"
    );

    if (hasCommertialStopped) {
      allDates.push((efficiency.date as string).split("T")[0]);
    }
  });
  return allDates;
}
