import { ResponsiveBar } from "@nivo/bar";
import { formatCurrency } from "../../../../../../../app/utils/formatCurrency";
import { useBarChart } from "./useBarChart";

export const BarChart = () => {
  const { data } = useBarChart();

  return (
    <ResponsiveBar
      data={data}
      keys={["total", "totalLost"]}
      indexBy="rig"
      margin={{ top: 10, right: 20, bottom: 120, left: 20 }}
      padding={0.2}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={({ id }) =>
        id === "total" ? "#1c7b7b" : id === "totalLost" ? "#fc5050" : "grey"
      }
      /*  defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: ["#38bcb2", "#f00"],
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
      ]} */
      borderRadius={0}
      fill={[
        {
          match: {
            id: "total",
          },
          id: "dots",
        },
        {
          match: {
            id: "totalLost",
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
        legend: "Faturamento",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={
        null /* {
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "",
        legendPosition: "middle",
        legendOffset: -40,
      } */
      }
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor="#fff"
      enableGridY={false}
      /* legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]} */

      valueFormat={(value) => `${formatCurrency(value)}`}
      role="application"
      ariaLabel=""
      barAriaLabel={(e) =>
        e.id + ": " + e.formattedValue + " in country: " + e.indexValue
      }
      theme={{
        axis: {
          domain: {
            line: {
              stroke: "#1c7b7b",
            },
          },
          legend: {
            text: {
              fill: "#1c7b7b",
            },
          },
          ticks: {
            line: {
              stroke: "#1c7b7b",
              strokeWidth: 1,
            },
            text: {
              fill: "#1c7b7b",
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
            fill: "#1c7b7b",
          },
        },
        tooltip: {
          container: {
            color: "#1c7b7b",
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
