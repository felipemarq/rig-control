import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGlobalDashboard } from "../../GlobalDashboardContext/useDashboard";
import { NotFound } from "@/view/components/NotFound";
import { Spinner } from "@/view/components/Spinner";
import { PeriodsDetailsPieChart } from "./components/PeriodsDetailsPieChart";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Maximize, X } from "lucide-react";

export const PeriodsDetailsPieChartCard = () => {
  const {
    isFetchingRigsAverage,
    rigsAverage,
    isFetchingUnbilledPeriods,
    unbilledPeriodsDetailsChartData,
    handleSelectedDetailPieChartViewChange,
    isPeriodDetailsGraphExpanded,
    handleChangePeriodDetailsGraphView,
    selectedPeriodDetailsGraphView,
    handleExpandPeriodDetailsGraph,
  } = useGlobalDashboard();
  ("");

  return (
    <Card
      className={cn(
        "col-span-12 lg:col-span-4 row-span-2 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] ",
        isPeriodDetailsGraphExpanded && "lg:col-span-12 row-span-4"
      )}
    >
      <CardHeader className="pl-7 ">
        <div className="flex gap-2 items-center justify-between cursor-pointer">
          <CardTitle className="text-sm">
            Detalhes do periodo não faturado selecionado{" "}
          </CardTitle>
          <div className="flex gap-2 items-center">
            <Button size="sm" onClick={() => handleChangePeriodDetailsGraphView()}>
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
        {rigsAverage.length === 0 && !isFetchingUnbilledPeriods && (
          <div className="flex justify-center items-center">
            <NotFound>
              <strong>Não</strong> existem dados para a <strong>sonda</strong> no{" "}
              <strong>período</strong> selecionado!
            </NotFound>
          </div>
        )}
        {!isFetchingUnbilledPeriods && rigsAverage.length > 0 && (
          <div className="w-full h-full">
            <PeriodsDetailsPieChart
              isExpanded={isPeriodDetailsGraphExpanded}
              selectedView={selectedPeriodDetailsGraphView}
              chartData={unbilledPeriodsDetailsChartData}
              handleSelectedDetailPieChartViewChange={
                handleSelectedDetailPieChartViewChange
              }
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
