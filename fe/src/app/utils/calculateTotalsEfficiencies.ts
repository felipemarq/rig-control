import { PersistanceEfficiency } from "../entities/PersistanceEfficiency";
import { getDiffInMinutes } from "./getDiffInMinutes";

export function calculateTotalsEfficiencies(efficiencies: PersistanceEfficiency[]) {
  let totals = {
    totalAvailableHours: 0,
    totalMovimentations: 0,
    totalDtms: 0,
    totalUnavailableHours: 0,
    totalCommertialHours: 0,
    totalScheduledStoppedHours: 0,
    totalRepairHours: 0,
    totalGlossHours: 0,
    totalUnbilledScheduledStopHours: 0,
    totalStandByHours: 0,
  };

  efficiencies.forEach((efficiency) => {
    const {
      availableHours,
      standByHours,
      billedScheduledStopHours = 0,
      glossHours = 0,
      unbilledScheduledStopHours = 0,
      commercialHours = 0,
      fluidRatio,
      equipmentRatio,
      periods,
    } = efficiency;

    totals.totalAvailableHours +=
      availableHours + standByHours + billedScheduledStopHours;
    totals.totalScheduledStoppedHours += billedScheduledStopHours;
    totals.totalStandByHours += standByHours;
    totals.totalGlossHours += glossHours;
    totals.totalUnbilledScheduledStopHours += unbilledScheduledStopHours;
    totals.totalCommertialHours += commercialHours;

    const repairReduce = periods.reduce((acc, { type, startHour, endHour }) => {
      if (type === "REPAIR") {
        return acc + getDiffInMinutes(new Date(endHour), new Date(startHour)) / 60;
      }
      return acc;
    }, 0);

    totals.totalRepairHours += repairReduce;
    totals.totalUnavailableHours +=
      repairReduce + glossHours + unbilledScheduledStopHours + commercialHours;
    totals.totalMovimentations += fluidRatio.length + equipmentRatio.length;

    if (periods.some(({ type }) => type === "DTM")) {
      totals.totalDtms++;
    }
  });

  return totals;
}
