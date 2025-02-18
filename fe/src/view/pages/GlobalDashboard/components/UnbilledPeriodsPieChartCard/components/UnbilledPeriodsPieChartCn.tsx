import { Pie, PieChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { PeriodType } from "@/app/entities/PeriodType";

export type UnbilledPeriodsPieChartData = {
  id: string;
  label: string;
  value: number;
  fill: string;
}[];

interface UnbilledPeriodsPieChartProps {
  handleSelectedPieChartViewChange: (type: PeriodType) => void;
  chartData: UnbilledPeriodsPieChartData;
}

export function UnbilledPeriodsPieChartCn({
  chartData,
  handleSelectedPieChartViewChange,
}: UnbilledPeriodsPieChartProps) {
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
      className="mx-auto aspect-square max-h-[350px] [&_.recharts-pie-label-text]:fill-foreground "
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
                            chartConfig[name as keyof typeof chartConfig]?.color,
                        }}
                      />
                      <span className="text-lg">
                        {" "}
                        {chartConfig[name as keyof typeof chartConfig]?.label || name}
                      </span>
                    </div>

                    <div className="text-lg ml-auto flex items-baseline gap-0.5 font-mono font-bold tabular-nums text-foreground">
                      {value}
                      <span className="font-normal text-muted-foreground">Hrs</span>
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
            handleSelectedPieChartViewChange(event.payload.label as PeriodType);
          }}
          label={({ payload, ...props }) => {
            return (
              <text
                cx={props.cx}
                cy={props.cy}
                x={props.x}
                y={props.y}
                textAnchor={props.textAnchor}
                dominantBaseline={props.dominantBaseline}
                fill="hsla(var(--foreground))"
              >
                {payload.value} hrs
              </text>
            );
          }}
        />

        <ChartLegend
          content={<ChartLegendContent nameKey="id" />}
          className="-translate-y-2 flex-wrap gap-2 [&>]:basis-1/4 [&>]:justify-center"
        />
      </PieChart>
    </ChartContainer>
  );
}
