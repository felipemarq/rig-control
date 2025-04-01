import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useTheme } from "@/app/contexts/ThemeContext";
import { OccurrenceType } from "@/app/entities/Occurrence";
import { usePeriodActionPlansContext } from "../PeriodActionPlansContext/usePeriodActionPlansContext";

type ChartData = { id: OccurrenceType; type: string; qtd: number }[];

export const BarChartByRig = () => {
  const { primaryColor } = useTheme();

  const {
    dashboardIndicators: { actionPlansPerRig },
  } = usePeriodActionPlansContext();

  const chartConfig = {
    qtd: {
      label: "Quantidade",
      color: primaryColor,
    },
  } satisfies ChartConfig;

  const data = Object.entries(actionPlansPerRig).map(([key, value]) => ({
    id: key,
    type: key,
    qtd: value,
  }));
  console.log("data", data);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Planos de ação por Sonda</CardTitle>
        {/* <CardDescription>
          Quantidade de ocorrencias por tipo no período selecionado
        </CardDescription> */}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={data}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="type"
              tickLine={false}
              tickMargin={10}
              axisLine={false}

              //tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="qtd" fill="var(--color-qtd)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
