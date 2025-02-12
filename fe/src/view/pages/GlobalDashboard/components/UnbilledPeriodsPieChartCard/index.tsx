import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGlobalDashboard } from "../../GlobalDashboardContext/useDashboard";
import { NotFound } from "@/view/components/NotFound";
import { Spinner } from "@/view/components/Spinner";
import { UnbilledPeriodsPieChart } from "./components/UnbilledPeriodsPieChart";

export const UnbilledPeriodsPieChartCard = () => {
  const {
    isFetchingRigsAverage,
    rigsAverage,
    isFetchingUnbilledPeriods,
    handleSelectedPieChartViewChange,
    unbilledPeriodsChartData,
  } = useGlobalDashboard();
  return (
    <Card className="col-span-12 lg:col-span-4 row-span-2 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] bg-green-400">
      <CardHeader className="pl-7 ">
        <div className="flex gap-2 items-center justify-between cursor-pointer">
          <CardTitle>Tempo não faturado </CardTitle>
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
            <UnbilledPeriodsPieChart
              chartData={unbilledPeriodsChartData}
              handleSelectedPieChartViewChange={handleSelectedPieChartViewChange}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
