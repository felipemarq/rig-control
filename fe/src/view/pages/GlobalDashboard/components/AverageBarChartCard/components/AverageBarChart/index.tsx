import { ResponsiveBar } from "@nivo/bar";
import { useAverageBarChart } from "./useAverageBarChart";
import { useTheme } from "@/app/contexts/ThemeContext";

export const AverageBarChart = () => {
  const { data, getBarColor, handleChangeRig, navigate, windowWidth } =
    useAverageBarChart();
  const isSmallMobileScreen = windowWidth <= 768;
  const { primaryColor } = useTheme();
  return (
    <div className="w-full h-[80%] relative">
      <ResponsiveBar
        data={data}
        keys={["avg"]}
        indexBy="rig"
        layout="vertical"
        margin={{
          top: 30,
          right: isSmallMobileScreen ? 0 : 10,
          bottom: 110,
          left: isSmallMobileScreen ? 0 : 10,
        }}
        padding={0.3}
        layers={[
          "grid",
          "axes",
          "bars",
          "markers",
          "legends",
          "annotations", // Adiciona uma camada de rótulos
        ]}
        borderRadius={5}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={getBarColor}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "#38bcb2",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "#eed312",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: "fries",
            },
            id: "dots",
          },
          {
            match: {
              id: "sandwich",
            },
            id: "lines",
          },
        ]}
        borderColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "",
          legendPosition: "middle",
          legendOffset: -40,
        }}
        axisLeft={null}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor="#fff"
        valueFormat={(value) => `${value} %`}
        role="application"
        ariaLabel=""
        barAriaLabel={(e) =>
          e.id + ": " + e.formattedValue + " in country: " + e.indexValue
        }
        onClick={(event) => {
          handleChangeRig(event.data.rigId as string);
          navigate(`/dashboard`, { state: { shouldApplyFilters: true } });
        }}
        enableGridY={false}
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
          labels: {
            text: {
              fill: "#fff",
            },
          },
        }}
      />

      <small className="flex items-center justify-center gap-2 absolute bottom-2 right-10 italic text-gray-700">
        <div className="bg-secondaryAccent-500 p-1 w-3 h-3"></div>{" "}
        <span> Sondas com dias pendentes durante o periodo selecionado</span>
      </small>
    </div>
  );
};
