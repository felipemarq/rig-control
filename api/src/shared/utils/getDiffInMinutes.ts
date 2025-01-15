import { differenceInMinutes } from 'date-fns';

export const getDiffInMinutes = (finalHour: Date, initialHour: Date) => {
  // Get the ISO hour from the finalHour
  const isoHour = finalHour.toISOString().split('T')[1];

  // Adjust endDate if isoHour is '23:59'
  let endDate = finalHour;
  if (isoHour.slice(0, 5) === '23:59') {
    return differenceInMinutes(endDate, initialHour) + 1; // Adding 1 minute
  }

  // Return the difference in minutes between endDate and initialHour
  return differenceInMinutes(endDate, initialHour);
};
