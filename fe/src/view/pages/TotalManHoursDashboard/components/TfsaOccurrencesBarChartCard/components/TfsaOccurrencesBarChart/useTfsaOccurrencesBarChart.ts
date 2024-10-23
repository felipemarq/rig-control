import { months } from "@/app/utils/months";
import { useTotalManHoursDashboard } from "@/view/pages/TotalManHoursDashboard/TotalManHoursDashboardContext/useTotalManHoursDashboard";
import { BarDatum } from "@nivo/bar";

export const useTfsaOccurrencesBarChart = () => {
  const { occurrencesTaxes } = useTotalManHoursDashboard();

  console.log("occurrencesTaxes", occurrencesTaxes);

  const tfsaOccurrences = occurrencesTaxes?.notAbsentOccurrences;

  const convertedResul: BarDatum[] = tfsaOccurrences?.map((occurrence) => {
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
