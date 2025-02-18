import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useGlobalDashboard } from "../../GlobalDashboardContext/useDashboard";
import { RepairDetailsPieChartCn } from "./components/RepairDetailsPieChartCn";

export const RepairDetailsPieChartCard = () => {
  const {
    unbilledPeriods,
    selectedPieChartView,
    selectedPeriodClassification,
    repairDetailsChartData,
    handleSelectedRepairPeriodClassificationChange,
  } = useGlobalDashboard();

  return (
    <Card
      className={cn(
        "col-span-12 lg:col-span-4 row-span-2 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]",
        !selectedPieChartView && "hidden"
      )}
    >
      <CardHeader className="pl-7 ">
        <div className="flex gap-2 items-center justify-between cursor-pointer">
          <CardTitle>Detalhes do Reparo: </CardTitle>
          {selectedPeriodClassification && <Badge>{selectedPeriodClassification}</Badge>}
        </div>
      </CardHeader>

      <CardDescription></CardDescription>

      <CardContent className="px-2 h-full">
        {selectedPeriodClassification && unbilledPeriods.length > 0 && (
          <div className="max-w-full h-full">
            <RepairDetailsPieChartCn
              chartData={repairDetailsChartData}
              handleSelectedRepairPeriodClassificationChange={
                handleSelectedRepairPeriodClassificationChange
              }
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
