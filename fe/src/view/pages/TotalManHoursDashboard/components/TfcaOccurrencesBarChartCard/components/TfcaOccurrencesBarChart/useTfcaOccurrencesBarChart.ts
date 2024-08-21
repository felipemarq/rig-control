import { months } from "@/app/utils/months";
import { useTotalManHoursDashboard } from "@/view/pages/TotalManHoursDashboard/TotalManHoursDashboardContext/useTotalManHoursDashboard";
import { BarDatum } from "@nivo/bar";

export const useTfcaOccurrencesBarChart = () => {
  const { occurrencesTaxes } = useTotalManHoursDashboard();

  const tfcaOccurrences = occurrencesTaxes?.absentOccurrences;

  const convertedResul: BarDatum[] = tfcaOccurrences?.map((occurrence) => {
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
