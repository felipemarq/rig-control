import { ResponsivePie } from "@nivo/pie";
import { EquipmentData } from "../../useGrouppedRepairsPieChartCard";

interface GrouppedRepairPieChartProps {
  data: EquipmentData[];
}

export const GrouppedRepairPieChart = ({
  data,
}: GrouppedRepairPieChartProps) => {
  console.log("data in chart", data);
  return (
    <ResponsivePie
      data={data}
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
            color: "#1c7b7b",
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
      arcLabel={(value) =>
        value.data.percentage < 15 ? "" : `${value.data.label}`
      }
      /* onClick={(event) =>
        handleFilterPeriods("REPAIR", event.data.classification)
      }
      arcLabel={(value) =>
        value.data.percentage < 15 ? "" : `${value.data.label}`
      } */
      enableArcLinkLabels={false}
      arcLinkLabelsTextColor={"#1c7b7b"}
      arcLinkLabelsThickness={1}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={1}
      arcLabelsTextColor="#fff"
      valueFormat={(value) => `${value} Hrs`}
    />
  );
};
