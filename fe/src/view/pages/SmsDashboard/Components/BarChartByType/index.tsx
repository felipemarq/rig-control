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
import { useSmsDashboardContext } from "../../SmsDashboardContext/useSmsDashboardContext";
import { OccurrenceType } from "@/app/entities/Occurrence";
import { occurrenceTypeTranslation } from "@/app/utils/occurrenceTypeTranslation";
import { useNavigate } from "react-router-dom";

type ChartData = { id: OccurrenceType; type: string; qtd: number }[];

export const BarChartByType = () => {
  const { primaryColor } = useTheme();
  const navigate = useNavigate();
  const { occurrences, handleChangeFilters } = useSmsDashboardContext();

  const chartConfig = {
    qtd: {
      label: "Quantidade",
      color: primaryColor,
    },
  } satisfies ChartConfig;

  const data = occurrences.reduce<ChartData>((acc, curr) => {
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
  }, []);

  console.log("data", data);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ocorrências por Tipo</CardTitle>
        <CardDescription>
          Quantidade de ocorrencias por tipo no período selecionado
        </CardDescription>
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
            <Bar
              dataKey="qtd"
              fill="var(--color-qtd)"
              radius={8}
              onClick={(event) => {
                handleChangeFilters("type")(event.id);
                navigate(`/occurrences`, {
                  state: { shouldApplyFilters: true },
                });
              }}
            >
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
