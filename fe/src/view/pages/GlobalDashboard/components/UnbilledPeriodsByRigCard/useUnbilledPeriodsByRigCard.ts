import { differenceInMinutes, parse } from "date-fns";
import { useGlobalDashboard } from "../../GlobalDashboardContext/useDashboard";
import { translateClassification } from "@/app/utils/translateClassification";

export const useUnbilledPeriodsByRigCard = () => {
  const { unbilledPeriods, selectedPieChartView, selectedDetailPieChartView } =
    useGlobalDashboard();

  const parseHour = (hourString: string) =>
    parse(hourString.split("T")[1].slice(0, 5), "HH:mm", new Date());

  const filteredPeriods = selectedDetailPieChartView
    ? unbilledPeriods.filter(
        (period) =>
          period.type === selectedPieChartView &&
          translateClassification(period.classification) ===
            selectedDetailPieChartView
      )
    : unbilledPeriods.filter((period) => period.type === selectedPieChartView);

  const mappedRigsUnbilledHours = filteredPeriods.reduce(
    (acc: { id: string; label: string; value: number }[], current) => {
      const rigName = current.efficiency?.rig.name!;

      const foundItem = acc.find((accItem) => accItem.id === rigName)!;

      const parsedStartHour = parseHour(current.startHour);
      const parsedEndHour = parseHour(current.endHour);
      const diffInHours =
        differenceInMinutes(parsedEndHour, parsedStartHour) / 60;

      if (!foundItem) {
        acc.push({
          id: rigName,
          label: rigName,
          value: Number(diffInHours.toFixed(2)),
        });
      } else {
        acc = acc.map((accItem) =>
          accItem.id === rigName
            ? {
                ...accItem,
                value: Number((accItem.value + diffInHours).toFixed(2)),
              }
            : accItem
        );
      }

      return acc;
    },
    []
  );
  // const classification = translateClassification(current.classification)!;
  console.log("filteredPeriods", filteredPeriods);

  return {
    mappedRigsUnbilledHours,
    selectedPieChartView,
    selectedDetailPieChartView,
  };
};
