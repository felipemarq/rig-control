import { months } from "@/app/utils/months";
import { useManHoursDashboard } from "@/view/pages/ManHoursDashboard/ManHourDashboardContext/useManHoursDashboard";
import { BarDatum } from "@nivo/bar";

export const useTfcaOccurrencesBarChart = () => {
  const { occurrencesTaxes } = useManHoursDashboard();

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
