import { ResponsivePie } from "@nivo/pie";
import { useGlossDetailsPieChart } from "./useGlossDetailsPieChart";
import { useTheme } from "@/app/contexts/ThemeContext";

export const GlossDetailsPieChart = () => {
  const { chartData /* handleCloseDetailsGraph */, handleFilterPeriods } =
    useGlossDetailsPieChart();
  const { primaryColor } = useTheme();
  return (
    <ResponsivePie
      data={chartData}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: "#679d4d",
            },
          },
          legend: {
            text: {
              fill: "#679d4d",
            },
          },
          ticks: {
            line: {
              stroke: "#679d4d",
              strokeWidth: 1,
            },
            text: {
              fill: "#679d4d",
            },
          },
        },
        labels: {
          text: {
            fontSize: 14,

            fill: "#679d4d",
          },
        },
        legends: {
          text: {
            fill: "#fff",
            fontSize: 12,
            fontStyle: "italic",
          },
        },
        tooltip: {
          container: {
            color: primaryColor,
          },
        },
      }}
      colors={{ datum: "data.color" }}
      margin={{ top: 10, right: 80, bottom: 100, left: 80 }}
      sortByValue={true}
      innerRadius={0}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      onClick={(event) => {
        handleFilterPeriods("GLOSS", event.data.classification);
      }}
      enableArcLinkLabels={true}
      arcLinkLabelsTextColor={primaryColor}
      arcLinkLabelsThickness={1}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={1}
      arcLabelsTextColor="#fff"
      valueFormat={(value) => `${value} Hrs`}
    />
  );
};
