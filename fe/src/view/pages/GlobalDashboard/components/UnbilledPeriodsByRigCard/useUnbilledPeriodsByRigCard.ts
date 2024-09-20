import { differenceInMinutes, parse } from "date-fns";
import { useGlobalDashboard } from "../../GlobalDashboardContext/useDashboard";
import { translateClassification } from "@/app/utils/translateClassification";
import { useFiltersContext } from "@/app/hooks/useFiltersContext";
import { useNavigate } from "react-router-dom";

export const useUnbilledPeriodsByRigCard = () => {
  const { unbilledPeriods, selectedPieChartView, selectedDetailPieChartView } =
    useGlobalDashboard();

  const { handleChangeRig } = useFiltersContext();

  const navigate = useNavigate();

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
      const rigId = current.efficiency?.rigId!;

      const foundItem = acc.find((accItem) => accItem.id === rigId)!;

      const parsedStartHour = parseHour(current.startHour);
      const parsedEndHour = parseHour(current.endHour);
      const diffInHours =
        differenceInMinutes(parsedEndHour, parsedStartHour) / 60;

      if (!foundItem) {
        acc.push({
          id: rigId,
          label: rigName,
          value: Number(diffInHours.toFixed(2)),
        });
      } else {
        acc = acc.map((accItem) =>
          accItem.id === rigId
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

  return {
    mappedRigsUnbilledHours,
    selectedPieChartView,
    selectedDetailPieChartView,
    handleChangeRig,
    navigate,
  };
};
