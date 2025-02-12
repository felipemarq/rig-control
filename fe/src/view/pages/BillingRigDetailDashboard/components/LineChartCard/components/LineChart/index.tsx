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
        pointLabel={(e) => {
          //if (e.y === 100) return "";
          return e.y + "%";
        }}
        enableArea={false}
        // @ts-ignore
        onClick={(e) => navigate(`/details/${e.points[0].data.id}`)}
        lineWidth={3}
        curve="cardinal"
        enablePointLabel={true}
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
