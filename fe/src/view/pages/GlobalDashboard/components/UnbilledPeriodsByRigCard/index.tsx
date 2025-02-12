import { useUnbilledPeriodsByRigCard } from "./useUnbilledPeriodsByRigCard";
import { cn } from "../../../../../app/utils/cn";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

export const UnbilledPeriodsByRigCard = () => {
  const {
    mappedRigsUnbilledHours,
    selectedPieChartView,
    selectedDetailPieChartView,
    handleChangeRig,
    navigate,
  } = useUnbilledPeriodsByRigCard();

  return (
    <>
      <Card
        className={cn(
          "col-span-12 row-span-2 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] lg:col-span-4 bg-red-500",
          mappedRigsUnbilledHours.length > 5 && "row-span-3"
        )}
      >
        <CardHeader className="px-7">
          <CardTitle>Periodo não faturado por sonda</CardTitle>
          <CardDescription className="flex gap-2 items-center">
            <span>Selecionado:</span>
            {selectedPieChartView === "GLOSS" && <Badge>Todos as Glosas</Badge>}

            {selectedPieChartView === "REPAIR" && <Badge>Todos os Reparos</Badge>}

            {selectedDetailPieChartView && <Badge>{selectedDetailPieChartView}</Badge>}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sonda</TableHead>
                <TableHead>
                  <div className="flex gap-4 justify-center items-center">Horas</div>
                </TableHead>
                <TableHead>
                  <div className="flex gap-4 justify-center items-center">Ver mais</div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mappedRigsUnbilledHours
                .sort((a, b) => b.value - a.value)
                .map(({ id, label, value }) => (
                  <TableRow key={id}>
                    <TableCell>
                      <div className="font-medium">{label}</div>
                    </TableCell>
                    <TableCell className={cn(" text-center")}>
                      <div>
                        <div className="flex gap-4 justify-center items-center">
                          {value} Hrs
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className={cn("text-center")}>
                      <div
                        onClick={() => {
                          handleChangeRig(id);
                          navigate(`/dashboard`, { state: { shouldApplyFilters: true } });
                        }}
                      >
                        <div className="flex gap-4 justify-center items-center">
                          <ExternalLink />
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};
