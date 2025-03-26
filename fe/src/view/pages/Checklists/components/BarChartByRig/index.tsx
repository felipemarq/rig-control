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
import { useChecklistsContext } from "../ChecklistsContext/useChecklistsContext";

export const BarChartByRig = () => {
  const { primaryColor } = useTheme();
  const {
    averages: { avgByRig },
  } = useChecklistsContext();

  /*   const allEvaluations: Evaluation[] = checklists.flatMap(
    (checklist) => checklist.evaluations,
  ); */

  const chartConfig = {
    average: {
      label: "Média",
      color: primaryColor,
    },
  } satisfies ChartConfig;

  /*   const data = occurrences.reduce<ChartData>((acc, curr) => {
    const translatedType =
      occurrenceTypeTranslation.find((item) => item.value === curr.type)
        ?.label ?? "-";
    const foundItem = acc.find((item) => item.id === curr.type);

    if (!foundItem) {
      acc.push({ id: curr.type, type: translatedType, qtd: 1 });
      return acc;
    } else {
      acc = acc.map((item) => {
        if (item.id === curr.type) {
          item.qtd++;
        }
        return item;
      });
      return acc;
    }
  }, []); */

  return (
    <Card>
      <CardHeader>
        <CardTitle>Média de Desempenho</CardTitle>
        <CardDescription>Média de desempenho por sonda</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={avgByRig}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="rigName"
              tickLine={false}
              tickMargin={10}
              axisLine={false}

              //tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="average" fill="var(--color-average)" radius={8}>
              <LabelList
                position="top"
                offset={6}
                className="fill-foreground"
                fontSize={12}
                formatter={(value: number) => {
                  return `${value.toFixed(2)} %`;
                }}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
