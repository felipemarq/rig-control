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

import { useSmsDashboardContext } from "../../SmsDashboardContext/useSmsDashboardContext";

import { months } from "@/app/utils/months";
import { useTheme } from "@/app/contexts/ThemeContext";
import { Spinner } from "@/view/components/Spinner";

export const TfsaOccurrencesBarChartCard = () => {
  const { isFetchingOccurrencesTaxes, occurrencesTaxes } = useSmsDashboardContext();
  const { primaryColor } = useTheme();

  console.log(occurrencesTaxes);

  const chartConfig = {
    tax: {
      label: "Mês",
      color: primaryColor,
    },
  } satisfies ChartConfig;

  const convertedResul = occurrencesTaxes?.notAbsentOccurrences?.map((occurrence) => {
    if (!occurrence) {
      return {
        month: 0,
        tax: 0,
        count: 0,
      };
    }

    return {
      month: months[occurrence.month - 1].label,
      tax: Number(occurrence.tax.toFixed(2)),
      count: Number(occurrence.count),
    };
  })!;

  // Encontra o maior valor para ajustar o eixo Y dinamicamente
  //const maxTaxValue = Math.max(...convertedResul.map((item) => item.tax), 1); // Evita que seja 0

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Taxa de Frequência sem Afastamento (TSFA) por Mês </CardTitle>
        <CardDescription>
          O TSFA representa a taxa de ocorrências registradas sem afastamento, calculado
          com base no número de eventos por mês e nas horas trabalhadas.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isFetchingOccurrencesTaxes && <Spinner />}
        {!isFetchingOccurrencesTaxes && (
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={convertedResul}
              margin={{
                top: 0,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />

              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Bar
                dataKey="tax"
                fill="var(--color-tax)"
                radius={8}
                max={500}
                maxBarSize={500}
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
        )}
      </CardContent>
    </Card>
  );
};
