import { Period } from "../entities/Period";
import { PeriodType } from "../entities/PeriodType";
import { EfficienciesResponse } from "../services/efficienciesService/getAll";

export const getGlossPeriods = (
  efficiencies: EfficienciesResponse
): Array<Period> | never[] => {
  const glossPeriods: Array<Period> = [];

  efficiencies.forEach((efficiency) => {
    const periodsFiltered = efficiency.periods.filter(
      (period) => period.type === ("GLOSS" as PeriodType)
    );

    const periodsMapped = periodsFiltered.map((period) => ({
      ...period,
      efficiency: efficiency,
    }));

    glossPeriods.push(...periodsMapped);
  });

  return glossPeriods;
};
