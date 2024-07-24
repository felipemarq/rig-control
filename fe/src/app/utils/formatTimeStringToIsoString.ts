import dayjs from "dayjs";

/**
 * Converts a time string to an ISO string adjusted to UTC (GMT-0).
 *
 * @param timeString - The time string to convert, in the format "HH:mm".
 * @returns The ISO string representation of the current date with the specified time, adjusted to UTC.
 * @example
 * // Example usage:
 * // Returns: "2024-07-07T12:00:00.000Z" (if current date is 2024-07-07 and timeString is "15:00")
 * formatTimeStringToIsoString("15:00");
 */
export const formatTimeStringToIsoString = (timeString: string): string => {
  const [hourString, minuteString] = timeString.split(":");

  const dateWithTime = dayjs()
    .hour(Number(hourString))
    .minute(Number(minuteString))
    .format();

  return dateWithTime.replace(/-03:00$/, "-00:00");
};
