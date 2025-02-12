import { ResponsiveLine } from "@nivo/line";
import { useLineChart } from "./useLineChart";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/app/contexts/ThemeContext";

export const LineChart = () => {
  const { data } = useLineChart();
  const navigate = useNavigate();
  const { primaryColor } = useTheme();
  return (
    <div className="w-full h-full">
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 50, bottom: 40, left: 50 }}
        animate={true}
        enableSlices={"x"}
        yScale={{
          type: "linear",
          stacked: true,
          min: 0,
          max: 100,
        }}
        enablePointLabel={data[0].data.length > 31 ? false : true}
        pointLabel={(e) => {
          //if (e.y === 100) return "";
          return e.y + "%";
        }}
        enableArea={false}
        // @ts-ignore
        onClick={(e) => navigate(`/details/${e.points[0].data.id}`)}
        lineWidth={3}
        curve="cardinal"
        colors={[primaryColor, "#774dd7"]}
        enableGridX={true}
        enableGridY={false}
        pointSize={10}
        pointColor="white"
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        yFormat=" >-.2f"
        layers={[
          "grid",
          "markers",
          "areas",
          "lines",
          "slices",
          "axes",
          "points",
          "legends",
        ]}
        sliceTooltip={(event: any) => {
          const data = event.slice.points[0].data;
          const availableHours =
            data.totalAvailableHours -
            data.totalStandByHours -
            data.totalScheduledStoppedHours;
          return (
            <div className="flex flex-col bg-white p-4 rounded-md">
              <div
                className="text-sm flex gap-2 "
                style={{
                  color: primaryColor,
                }}
              >
                <span>Data:</span>
                <>{data.x}</>
              </div>
              <div
                className="text-sm flex gap-2 "
                style={{
                  color: primaryColor,
                }}
              >
                <span>Eficiência:</span>
                <>{data.y}%</>
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
                <span> {data.totalStandByHours} Hrs</span>
              </div>

              <div
                className="text-sm flex gap-2 "
                style={{
                  color: primaryColor,
                }}
              >
                <span>Reparo:</span>
                <span> {data.totalRepairHours.toFixed(2)}Hrs</span>
              </div>

              <div
                className="text-sm flex gap-2 "
                style={{
                  color: primaryColor,
                }}
              >
                <span>Glosa:</span>
                <span> {data.totalGlossHours.toFixed(2)} Hrs</span>
              </div>

              <div
                className="text-sm flex gap-2 "
                style={{
                  color: primaryColor,
                }}
              >
                <span>Parada comercial:</span>
                <span> {data.totalCommertialHours.toFixed(2)} Hrs</span>
              </div>

              <div
                className="text-sm flex gap-2 "
                style={{
                  color: primaryColor,
                }}
              >
                <span>Parada programada:</span>
                <span> {data.totalScheduledStoppedHours.toFixed(2)} Hrs</span>
              </div>

              <div
                className="text-sm flex gap-2 "
                style={{
                  color: primaryColor,
                }}
              >
                <span>Parada programada não faturada:</span>
                <span> {data.totalUnbilledScheduledStopHours.toFixed(2)} Hrs</span>
              </div>
            </div>
          );
        }}
        axisLeft={null}
        useMesh={true}
        theme={{
          axis: {
            domain: {
              line: {
                stroke: primaryColor,
              },
            },
            legend: {
              text: {
                fill: primaryColor,
              },
            },
            ticks: {
              line: {
                stroke: primaryColor,
                strokeWidth: 1,
              },
              text: {
                fill: primaryColor,
              },
            },
          },
          crosshair: {
            line: {
              strokeWidth: 2,
              stroke: "#774dd7",
              strokeOpacity: 1,
            },
          },
          legends: {
            text: {
              fill: primaryColor,
            },
          },
          tooltip: {
            container: {
              color: primaryColor,
            },
          },
        }}
      />
    </div>
  );
};
