import { formatNumberWithFixedDecimals } from "@/app/utils/formatNumberWithFixedDecimals";
import { getDiffInMinutes } from "@/app/utils/getDiffInMinutes";
import { useDashboard } from "@/view/pages/Dashboard/DashboardContext/useDashboard";
import { parse } from "date-fns";

export type WellDataGridType = {
  id: string;
  wellName: string;
  totalEquipment: number;
  totalFluid: number;
  totalDtm: number;
  totalRepairHours: number;
  totalGlossHours: number;
  totalDtmHours: number;
  totalWorkHours: number;
}[];

export const useWellsDataGrid = () => {
  const { efficiencies } = useDashboard();

  const data: WellDataGridType = efficiencies.reduce(
    (acc: WellDataGridType, current) => {
      const wellExists = acc.find((item) => item.wellName === current.well);

      const totalFluid = current.fluidRatio.length;
      const totalEquipment = current.equipmentRatio.length;
      const hasDtm = current.periods.find((period) => period.type === "DTM");
      let totalRepairHours = 0;
      let totalGlossHours = 0;
      let totalDtmHours = 0;
      let totalWorkHours = 0;

      current.periods.forEach((current) => {
        const parsedStartHour = parse(
          current.startHour.split("T")[1].slice(0, 5),
          "HH:mm",
          new Date()
        );
        const parsedEndHour = parse(
          current.endHour.split("T")[1].slice(0, 5),
          "HH:mm",
          new Date()
        );
        if (current.type === "REPAIR") {
          totalRepairHours += formatNumberWithFixedDecimals(
            getDiffInMinutes(parsedEndHour, parsedStartHour) / 60,
            2
          );
        }

        if (current.type === "GLOSS") {
          totalGlossHours += formatNumberWithFixedDecimals(
            getDiffInMinutes(parsedEndHour, parsedStartHour) / 60,
            2
          );
        }

        if (current.type === "DTM") {
          totalDtmHours += formatNumberWithFixedDecimals(
            getDiffInMinutes(parsedEndHour, parsedStartHour) / 60,
            2
          );
        }

        if (current.type === "WORKING") {
          totalWorkHours += formatNumberWithFixedDecimals(
            getDiffInMinutes(parsedEndHour, parsedStartHour) / 60,
            2
          );
        }
      });

      if (!wellExists) {
        acc.push({
          id: current.well,
          wellName: current.well,
          totalEquipment: totalEquipment,
          totalFluid: totalFluid,
          totalDtm: hasDtm ? 1 : 0,
          totalRepairHours: totalRepairHours,
          totalGlossHours: totalGlossHours,
          totalDtmHours: totalDtmHours,
          totalWorkHours: totalWorkHours,
        });
      } else {
        acc = acc.map((accItem) => {
          if (accItem.wellName === current.well) {
            return {
              ...accItem,
              totalEquipment: (accItem.totalEquipment += totalEquipment),
              totalFluid: (accItem.totalFluid += totalFluid),
              totalGlossHours: (accItem.totalGlossHours += totalGlossHours),
              totalRepairHours: (accItem.totalRepairHours += totalRepairHours),
              totalDtmHours: (accItem.totalDtmHours += totalDtmHours),
              totalWorkHours: (accItem.totalWorkHours += totalWorkHours),
              totalDtm: hasDtm ? accItem.totalDtm + 1 : accItem.totalDtm,
            };
          }

          return accItem;
        });
      }

      return acc;
    },
    []
  );

  console.log(data);

  return { data };
};
