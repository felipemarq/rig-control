import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGrouppedRepairsPieChartCard } from "./useGrouppedRepairsPieChartCard";
import { GrouppedRepairPieChart } from "./components/GrouppedRepairPieChart";
import { cn } from "@/lib/utils";

export const GrouppedRepairPieChartCard = () => {
  const { hasRepairData, chartData, selectedEquipment } =
    useGrouppedRepairsPieChartCard();
  return (
    <Card
      className={cn(
        "col-span-12 lg:col-span-5 row-span-3",
        selectedEquipment && "hidden"
      )}
    >
      <CardHeader className="pl-7 ">
        <div className="flex gap-2 items-center justify-between cursor-pointer">
          <CardTitle>Detalhes do Reparo: </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="px-2 h-full">
        {!selectedEquipment && hasRepairData && (
          <div className="max-w-full h-full">
            <GrouppedRepairPieChart data={chartData} />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
