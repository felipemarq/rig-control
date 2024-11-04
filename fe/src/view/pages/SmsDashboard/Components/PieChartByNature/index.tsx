import { Pie, PieChart } from "recharts";
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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useTheme } from "@/app/contexts/ThemeContext";
import { useSmsDashboardContext } from "../../SmsDashboardContext/useSmsDashboardContext";
import { OccurenceNature } from "@/app/entities/Occurrence";
import { natureTranslation } from "@/app/utils/natureTranslation";

type ChartData = { id: OccurenceNature; nature: string; qtd: number; fill: string }[];

export const PieChartByNature = () => {
  const { primaryColor } = useTheme();
  const { occurrences } = useSmsDashboardContext();

  const chartConfig = {
    visitors: {
      label: "Visitors",
    },
    ACCIDENT: {
      label: "Acidente",
      color: "hsl(var(--chart-1))",
    },
    INCIDENT: {
      label: "Incidente",
      color: primaryColor,
    },
    COMMUTING_ACCIDENT: {
      label: "Acidente de Trajeto",
      color: "hsl(var(--chart-3))",
    },
    DEATH: {
      label: "Morte",
      color: "hsl(var(--chart-4))",
    },
    other: {
      label: "Outros",
      color: "hsl(var(--chart-5))",
    },
  } satisfies ChartConfig;

  const data = occurrences.reduce<ChartData>((acc, curr) => {
    const translatedNature =
      natureTranslation.find((item) => item.value === curr.nature)?.label ?? "-";
    const foundItem = acc.find((item) => item.id === curr.nature);

    if (!foundItem) {
      acc.push({
        id: curr.nature,
        nature: translatedNature,
        qtd: 1,
        fill: `var(--color-${curr.nature})`,
      });
      return acc;
    } else {
      acc = acc.map((item) => {
        if (item.id === curr.nature) {
          item.qtd++;
        }
        return item;
      });
      return acc;
    }
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-0">
        <CardTitle>Ocorrências por Natureza</CardTitle>
        <CardDescription>
          Quantidade de ocorrencias por natureza no período selecionado
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent nameKey="id" hideLabel />} />
            <Pie
              data={data}
              dataKey="qtd"
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
                    {payload.qtd}
                  </text>
                );
              }}
            />
            <ChartLegend
              content={<ChartLegendContent nameKey="id" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
