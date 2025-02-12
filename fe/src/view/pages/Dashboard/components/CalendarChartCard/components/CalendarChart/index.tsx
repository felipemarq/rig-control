// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/calendar
import { ResponsiveCalendar } from "@nivo/calendar";
import { useCalendarChart } from "./useCalendarChart";
import { formatDate } from "@/app/utils/formatDate";
import { useTheme } from "@/app/contexts/ThemeContext";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

export const CalendarChart = () => {
  const { calendarRange, data, navigate } = useCalendarChart();
  const { primaryColor } = useTheme();
  return (
    <ResponsiveCalendar
      data={data}
      from={calendarRange.from}
      to={calendarRange.to}
      maxValue={10}
      emptyColor="#eeeeee"
      colors={["#FACC15", "#81c460", primaryColor]}
      margin={{ top: 0, right: 40, bottom: 0, left: 40 }}
      yearSpacing={40}
      monthBorderColor="#ffffff"
      monthSpacing={0}
      dayBorderWidth={2}
      dayBorderColor="#ffffff"
      tooltip={(e: any) => {
        const availableHours =
          e.data.totalAvailableHours -
          e.data.totalStandByHours -
          e.data.totalScheduledStoppedHours;
        return (
          <div className="flex flex-col bg-white p-4 rounded-md">
            <div
              className="text-sm flex gap-2 "
              style={{
                color: primaryColor,
              }}
            >
              <span>Data:</span>
              <>{formatDate(new Date(e.data.day))}</>
            </div>
            <div
              className="text-sm flex gap-2 "
              style={{
                color: primaryColor,
              }}
            >
              <span>Eficiência:</span>
              <>{e.data.efficiency}%</>
            </div>
            <div
              className="text-sm flex gap-2 "
              style={{
                color: primaryColor,
              }}
            >
              <span>Operando:</span>
              {/* //@ts-ignore */}
              <span> {availableHours.toFixed(2)} Hrs</span>
            </div>

            <div
              className="text-sm flex gap-2 "
              style={{
                color: primaryColor,
              }}
            >
              <span>StandBy:</span>
              <span> {e.data.totalStandByHours.toFixed(2)} Hrs</span>
            </div>

            <div
              className="text-sm flex gap-2 "
              style={{
                color: primaryColor,
              }}
            >
              <span>Reparo:</span>
              <span> {e.data.totalRepairHours.toFixed(2)}Hrs</span>
            </div>

            <div
              className="text-sm flex gap-2 "
              style={{
                color: primaryColor,
              }}
            >
              <span>Glosa:</span>
              <span> {e.data.totalGlossHours.toFixed(2)} Hrs</span>
            </div>

            <div
              className="text-sm flex gap-2 "
              style={{
                color: primaryColor,
              }}
            >
              <span>Parada comercial:</span>
              <span> {e.data.totalCommertialHours.toFixed(2)} Hrs</span>
            </div>

            <div
              className="text-sm flex gap-2 "
              style={{
                color: primaryColor,
              }}
            >
              <span>Parada programada:</span>
              <span> {e.data.totalScheduledStoppedHours.toFixed(2)} Hrs</span>
            </div>

            <div
              className="text-sm flex gap-2 "
              style={{
                color: primaryColor,
              }}
            >
              <span>Parada programada não faturada:</span>
              <span> {e.data.totalUnbilledScheduledStopHours.toFixed(2)} Hrs</span>
            </div>
          </div>
        );
      }}
      // @ts-ignore
      onClick={(e) => navigate(`/details/${e.data.id}`)}
      legends={[
        {
          anchor: "bottom-right",
          direction: "row",
          translateY: 36,
          itemCount: 4,
          itemWidth: 42,
          itemHeight: 36,
          itemsSpacing: 14,
          itemDirection: "right-to-left",
        },
      ]}
    />
  );
};
