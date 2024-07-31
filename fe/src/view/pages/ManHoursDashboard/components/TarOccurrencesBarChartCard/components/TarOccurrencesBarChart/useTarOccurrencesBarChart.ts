import { useManHoursDashboard } from "@/view/pages/ManHoursDashboard/ManHourDashboardContext/useManHoursDashboard";
import { BarDatum } from "@nivo/bar";
import { months } from "@/app/utils/months";

export const useTarOccurrencesBarChart = () => {
  const { occurrencesTaxes } = useManHoursDashboard();

  const tarOccurrences = occurrencesTaxes?.tarOccurrences;

  const convertedResul: BarDatum[] = tarOccurrences?.map((occurrence) => {
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
