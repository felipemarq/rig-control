import { ResponsiveBar } from "@nivo/bar";
import { useWellsCountBarChart } from "./useWellsCountBarChart";
import { useTheme } from "@/app/contexts/ThemeContext";

export const WellsCountBarChart = () => {
  const { data, selectedRig } = useWellsCountBarChart();
  const { primaryColor } = useTheme();
  return (
    <ResponsiveBar
      data={data}
      keys={["wellCount"]}
      indexBy="month"
      layout="vertical"
      margin={{ top: 0, right: 10, bottom: 150, left: 10 }}
      padding={0.3}
      layers={[
        "grid",
        "axes",
        "bars",
        "markers",
        "legends",
        "annotations", // Adiciona uma camada de rótulos
      ]}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={(params) => {
        return params.data.rigId === selectedRig ? "#38bcb2" : primaryColor;
      }}
      borderRadius={5}
      enableGridX={false}
      enableGridY={false}
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

        {
          match: (bar) => bar.data.data.rigId === selectedRig,
          id: "highlight-color", // ID para referenciar o estilo de cor de destaque
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
      //valueFormat={(value) => `${value} %`}
      role="application"
      ariaLabel=""
      barAriaLabel={(e) =>
        e.id + ": " + e.formattedValue + " in country: " + e.indexValue
      }
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
  );
};
