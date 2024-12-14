import { Period } from "../entities/Period";
import { PeriodType } from "../entities/PeriodType";
import { EfficienciesResponse } from "../services/efficienciesService/getAll";

export const getRepairPeriods = (
  efficiencies: EfficienciesResponse
): Array<Period> | never[] => {
  const repairPeriods: Array<Period> = [];

  efficiencies.forEach((efficiency) => {
    const periodsFiltered = efficiency.periods.filter(
      (period) => period.type === ("REPAIR" as PeriodType)
    );
    const periodsMapped = periodsFiltered.map((period) => ({
      ...period,
      efficiency: efficiency,
    }));

    repairPeriods.push(...periodsMapped);
  });

  return repairPeriods;
};
