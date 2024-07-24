import { useManHoursDashboard } from "@/view/pages/ManHoursDashboard/ManHourDashboardContext/useManHoursDashboard";
import { BarDatum } from "@nivo/bar";

export const useTorOccurrencesBarChart = () => {
  const { occurrencesTaxes } = useManHoursDashboard();

  const torOccurrences = occurrencesTaxes?.torOccurrences;

  const convertedResul: BarDatum[] = torOccurrences?.map((occurrence) => {
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
