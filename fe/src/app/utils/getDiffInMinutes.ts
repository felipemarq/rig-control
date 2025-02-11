import { differenceInMinutes } from "date-fns";

export const getDiffInMinutes = (endHour: Date, startHour: Date) => {
  const isoEndDate = endHour.toISOString().split("T")[0];
  const isoHour = endHour.toISOString().split("T")[1];

  let endDate = endHour;
  if (isoHour === "02:59:00.000Z") {
    endDate = new Date(`${isoEndDate}T03:00:00.000Z`);
  }

  return differenceInMinutes(endDate, startHour);
};
