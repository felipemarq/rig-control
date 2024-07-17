import { useManHoursDashboard } from "@/view/pages/ManHoursDashboard/ManHourDashboardContext/useManHoursDashboard";
import { BarDatum } from "@nivo/bar";

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
      month: occurrence.month,
      tax: occurrence.tax,
    };
  })!;

  return {
    data: convertedResul,
  };
};
