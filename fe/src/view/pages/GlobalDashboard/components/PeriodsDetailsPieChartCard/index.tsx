import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGlobalDashboard } from "../../GlobalDashboardContext/useDashboard";
import { NotFound } from "@/view/components/NotFound";
import { Spinner } from "@/view/components/Spinner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Maximize, X } from "lucide-react";
import { PeriodsDetailsPieChartCn } from "./components/PeriodsDetailsPieChartCn";

interface PeriodsDetailsPieChartCardProps {
  className?: string;
}

export const PeriodsDetailsPieChartCard = ({
  className,
}: PeriodsDetailsPieChartCardProps) => {
  const {
    isFetchingRigsAverage,
    isFetchingUnbilledPeriods,
    unbilledPeriodsDetailsChartData,
    handleSelectedDetailPieChartViewChange,
    isPeriodDetailsGraphExpanded,
    handleChangePeriodDetailsGraphView,
    selectedPeriodDetailsGraphView,
    handleExpandPeriodDetailsGraph,
    hasNoUnbilledPeriods,
  } = useGlobalDashboard();

  return (
    <Card
      className={cn(
        "flex flex-col col-span-6",
        className,
        isPeriodDetailsGraphExpanded && "col-span-6",
      )}
    >
      <CardHeader className="pl-7 ">
        <div className="flex gap-2 items-center justify-between cursor-pointer">
          <CardTitle className="text-sm">
            Detalhes do periodo não faturado selecionado{" "}
          </CardTitle>
          <div className="flex gap-2 items-center">
            <Button
              size="sm"
              onClick={() => handleChangePeriodDetailsGraphView()}
            >
              {selectedPeriodDetailsGraphView === "HOURS" ? "%" : "Horas"}
            </Button>
            <Button size="sm" onClick={() => handleExpandPeriodDetailsGraph()}>
              {isPeriodDetailsGraphExpanded ? <X /> : <Maximize />}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-2 h-full">
        {isFetchingRigsAverage && <Spinner />}

        {hasNoUnbilledPeriods && !isFetchingUnbilledPeriods && (
          <div className="flex justify-center items-center mx-auto aspect-square max-h-[350px]">
            <NotFound>
              <strong>Sem</strong> tempo não faturado com os{" "}
              <strong>filtros</strong> selecionados!
            </NotFound>
          </div>
        )}
        {!isFetchingUnbilledPeriods && !hasNoUnbilledPeriods && (
          <div className="w-full h-full">
            <PeriodsDetailsPieChartCn
              isExpanded={isPeriodDetailsGraphExpanded}
              selectedView={selectedPeriodDetailsGraphView}
              chartData={unbilledPeriodsDetailsChartData}
              handleSelectedDetailPieChartViewChange={
                handleSelectedDetailPieChartViewChange
              }
              isPeriodDetailsGraphExpanded={isPeriodDetailsGraphExpanded}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
