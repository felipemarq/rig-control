import { ResponsivePie } from "@nivo/pie";
import { useTheme } from "@/app/contexts/ThemeContext";

interface RepairDetailsPieChartProps {
  chartData: RepairDetailsPieChartData;
  handleSelectedRepairPeriodClassificationChange: (classification: string) => void;
}

export type RepairDetailsPieChartData = {
  id: string;
  label: string;
  value: number;
  color: string;
  classification: string;
  selectedPeriodClassification: string;
  percentage: number;
}[];

export const RepairDetailsPieChart = ({
  chartData,
  handleSelectedRepairPeriodClassificationChange,
}: RepairDetailsPieChartProps) => {
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
      arcLabel={(value) => (value.data.percentage < 15 ? "" : `${value.data.label}`)}
      enableArcLinkLabels={false}
      arcLinkLabelsTextColor={primaryColor}
      arcLinkLabelsThickness={1}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={1}
      arcLabelsTextColor="#fff"
      onClick={(event) => {
        console.log(event);
        //@ts-ignore
        handleSelectedRepairPeriodClassificationChange(event.data.classification);
      }}
      valueFormat={(value) => `${value} Hrs`}
      /*  legends={[
          {
            anchor: "bottom",
            direction: "column",
            justify: false,
            translateX: 200,
            translateY: 56,
            itemsSpacing: 10,
            itemWidth: 85,
            itemHeight: 24,
            itemTextColor: "#343A40",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: primaryColor,
                },
              },
            ],
          },
        ]} */
    />
  );
};
