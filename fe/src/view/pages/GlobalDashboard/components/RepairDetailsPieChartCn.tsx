import { Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface RepairDetailsPieChartProps {
  chartData: RepairDetailsPieChartData;
  handleSelectedRepairPeriodClassificationChange: (
    classification: string,
  ) => void;
}

export type RepairDetailsPieChartData = {
  id: string;
  label: string;
  value: number;
  fill: string;
  classification: string;
  selectedPeriodClassification: string;
  percentage: number;
}[];

export const RepairDetailsPieChartCn = ({
  chartData,
  handleSelectedRepairPeriodClassificationChange,
}: RepairDetailsPieChartProps) => {
  const chartConfig: ChartConfig = {};

  chartData.forEach((repair) => {
    const repairKey = repair.id;

    if (!chartConfig[repairKey]) {
      chartConfig[repairKey] = {
        label: repairKey,
        color: repair.fill,
      };
    }
  });

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[350px] [&_.recharts-pie-label-text]:fill-foreground"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              hideLabel
              formatter={(value, name) => {
                return (
                  <div className="flex min-w-[200px] items-center text-xs text-muted-foreground h-11">
                    <div className="flex gap-2 items-center px-4">
                      <div
                        className="h-2 w-2 shrink-0 rounded-[2px]"
                        style={{
                          backgroundColor:
                            chartConfig[name as keyof typeof chartConfig]
                              ?.color,
                        }}
                      />
                      <span className="text-lg">
                        {" "}
                        {chartConfig[name as keyof typeof chartConfig]?.label ||
                          name}
                      </span>
                    </div>

                    <div className="text-lg ml-auto flex items-baseline gap-0.5 font-mono font-bold tabular-nums text-foreground">
                      {value}
                      <span className="font-normal text-muted-foreground">
                        Hrs
                      </span>
                    </div>
                  </div>
                );
              }}
            />
          }
        />
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="id"
          innerRadius={50}
          onClick={(event) => {
            console.log(event);
            handleSelectedRepairPeriodClassificationChange(
              event.payload.classification,
            );
          }}
        />
      </PieChart>
    </ChartContainer>
  );
};
