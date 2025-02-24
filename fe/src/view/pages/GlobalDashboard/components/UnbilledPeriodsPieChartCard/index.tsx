import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGlobalDashboard } from "../../GlobalDashboardContext/useDashboard";
import { NotFound } from "@/view/components/NotFound";
import { Spinner } from "@/view/components/Spinner";
import { UnbilledPeriodsPieChartCn } from "./components/UnbilledPeriodsPieChartCn";
import { cn } from "@/lib/utils";

interface UnbilledPeriodsPieChartCardProps {
  className?: string;
}

export const UnbilledPeriodsPieChartCard = ({
  className,
}: UnbilledPeriodsPieChartCardProps) => {
  const {
    isFetchingRigsAverage,
    isFetchingUnbilledPeriods,
    handleSelectedPieChartViewChange,
    unbilledPeriodsChartData,
    hasNoUnbilledPeriods,
  } = useGlobalDashboard();

  return (
    <Card className={cn("flex flex-col col-span-6", className)}>
      <CardHeader className="items-center pb-0">
        <CardTitle>Tempo não faturado</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {!isFetchingRigsAverage && !isFetchingUnbilledPeriods && (
          <>
            {" "}
            {!hasNoUnbilledPeriods && (
              <UnbilledPeriodsPieChartCn
                chartData={unbilledPeriodsChartData}
                handleSelectedPieChartViewChange={handleSelectedPieChartViewChange}
              />
            )}
            {hasNoUnbilledPeriods && (
              <div className="flex justify-center items-center mx-auto aspect-square max-h-[350px]">
                <NotFound>
                  <strong>Sem</strong> tempo não faturado no <strong>período</strong>{" "}
                  selecionado!
                </NotFound>
              </div>
            )}
          </>
        )}

        {(isFetchingRigsAverage || isFetchingUnbilledPeriods) && (
          <div className="mx-auto aspect-square max-h-[350px] flex justify-center items-center">
            <Spinner />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
