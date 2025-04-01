import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NotFound } from "@/view/components/NotFound";
import { Spinner } from "@/view/components/Spinner";
import { cn } from "@/lib/utils";
import { PeriodsDetailsPieChartCn } from "./components/PeriodsDetailsPieChartCn";
import { usePeriodActionPlansContext } from "../PeriodActionPlansContext/usePeriodActionPlansContext";
import { translateClassification } from "@/app/utils/translateClassification";

interface PeriodsDetailsPieChartCardProps {
  className?: string;
}

export const PeriodsDetailsPieChartCard = ({
  className,
}: PeriodsDetailsPieChartCardProps) => {
  const {
    isFetchingPeriodsActionPlans,
    periodActionPlans,
    dashboardIndicators: { periodClassifications },
  } = usePeriodActionPlansContext();

  const chartData = Object.entries(periodClassifications).map(
    ([key, value], index) => ({
      id: translateClassification(key) ?? "",
      label: translateClassification(key) ?? "",
      value: value,
      fill: `hsl(var(--chart-${index + 1}))`,
    }),
  );
  return (
    <Card className={cn("flex flex-col col-span-1", className)}>
      <CardHeader className="pl-7 ">
        <div className="flex gap-2 items-center justify-between cursor-pointer">
          <CardTitle className="text-sm">
            Planos de ação por equipamento
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="px-2 h-full">
        {isFetchingPeriodsActionPlans && <Spinner />}

        {periodActionPlans.length === 0 && !isFetchingPeriodsActionPlans && (
          <div className="flex justify-center items-center mx-auto aspect-square max-h-[350px]">
            <NotFound>
              <strong>Sem</strong> tempo não faturado com os{" "}
              <strong>filtros</strong> selecionados!
            </NotFound>
          </div>
        )}
        {!isFetchingPeriodsActionPlans && !(periodActionPlans.length === 0) && (
          <div className="w-full h-full">
            <PeriodsDetailsPieChartCn chartData={chartData} />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
