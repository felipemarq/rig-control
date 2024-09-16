import { useBarChart } from "./useBarChart";

import { Bar, BarChart as RechartBarChart, LabelList, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  total: {
    label: "Total Faturado",
    color: "#1c7b7b",
  },
  totalLost: {
    label: " Faturamento Perdido",
    color: "#fc5050",
  },
} satisfies ChartConfig;

export const BarChart = () => {
  const { data } = useBarChart();

  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-[400px] w-full"
    >
      <RechartBarChart accessibilityLayer data={data}>
        <XAxis
          dataKey="rig"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 10)}
        />
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar
          dataKey="total"
          stackId="a"
          fill="var(--color-total)"
          radius={[0, 0, 4, 4]}
          onClick={(event) => console.log("Clicou", event)}
        >
          <LabelList
            position="center"
            offset={12}
            dataKey="totalLabel"
            className="fill-white "
            fontSize={12}
          />
        </Bar>
        <Bar
          dataKey="totalLost"
          stackId="a"
          fill="var(--color-totalLost)"
          radius={[4, 4, 0, 0]}
        >
          <LabelList
            position="center"
            offset={12}
            dataKey="totalLostLabel"
            className="fill-white "
            fontSize={12}
          />
        </Bar>
      </RechartBarChart>
    </ChartContainer>
  );
};
