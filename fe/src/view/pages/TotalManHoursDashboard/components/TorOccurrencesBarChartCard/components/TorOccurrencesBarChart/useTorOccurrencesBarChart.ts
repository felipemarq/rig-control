import { months } from "@/app/utils/months";
import { useTotalManHoursDashboard } from "@/view/pages/TotalManHoursDashboard/TotalManHoursDashboardContext/useTotalManHoursDashboard";
import { BarDatum } from "@nivo/bar";

export const useTorOccurrencesBarChart = () => {
  const { occurrencesTaxes } = useTotalManHoursDashboard();

  const torOccurrences = occurrencesTaxes?.torOccurrences;

  const convertedResul: BarDatum[] = torOccurrences?.map((occurrence) => {
    if (!occurrence) {
      return {
        month: 0,
        tax: 0,
      };
    }

    return {
      month: months[occurrence.month - 1].label,
      tax: occurrence.tax,
    };
  })!;

  return {
    data: convertedResul,
  };
};
