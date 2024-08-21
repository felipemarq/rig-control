import { ResponsivePie } from "@nivo/pie";
import { useUnbilledPeriodsPieChart } from "./useUnbilledPeriodsPieChart";
import { PeriodType } from "../../../../../../app/entities/PeriodType";

export const UnbilledPeriodsPieChart = () => {
  const { chartData, handleSelectedPieChartViewChange } =
    useUnbilledPeriodsPieChart();
  return (
    <div className="w-full h-full relative">
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
              color: "#1c7b7b",
            },
          },
        }}
        colors={{ datum: "data.color" }}
        margin={{ top: 10, right: 10, bottom: 90, left: 10 }}
        sortByValue={true}
        innerRadius={0.45}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        onClick={(event) =>
          handleSelectedPieChartViewChange(event.id as PeriodType)
        }
        valueFormat={(value) => `${value} Hrs`}
        enableArcLinkLabels={false}
        arcLinkLabelsTextColor={"#679d4d"}
        arcLinkLabelsThickness={1}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsTextColor="#fff"
        arcLabelsSkipAngle={10}
        /* legends={[
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
                  itemTextColor: "#1c7b7b",
                },
              },
            ],
          },
        ]} */
      />
      <small className="absolute bottom-12 right-14 italic text-gray-700 text-xs">
        * Clique no gráfico para ver detalhes
      </small>
    </div>
  );
};
