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
import { useFiltersContext } from "@/app/hooks/useFiltersContext";
import { useNavigate } from "react-router-dom";
import { PeriodType } from "@/app/entities/PeriodType";

interface UnbilledPeriodsByRigCardProps {
  selectedView?: PeriodType;
  selectedDetailView?: string;
  selectedRepairClassification?: string;
  rigsData: {
    id: string;
    label: string;
    value: number;
  }[];
}

export const UnbilledPeriodsByRigCard = ({
  selectedView,
  selectedDetailView,
  selectedRepairClassification,
  rigsData,
}: UnbilledPeriodsByRigCardProps) => {
  const { handleChangeRig } = useFiltersContext();

  const navigate = useNavigate();

  return (
    <>
      <Card
        className={cn(
          "col-span-12 row-span-2 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] lg:col-span-4",
          rigsData.length > 5 && "row-span-3"
        )}
      >
        <CardHeader className="px-7">
          <CardTitle>Periodo não faturado por sonda</CardTitle>
          <CardDescription className="flex gap-2 items-center">
            <span>Selecionado:</span>
            {selectedView === "GLOSS" && <Badge>Todos as Glosas</Badge>}

            {selectedView === "REPAIR" && <Badge>Todos os Reparos</Badge>}

            {selectedDetailView && <Badge>{selectedDetailView}</Badge>}

            {selectedRepairClassification && (
              <Badge>{selectedRepairClassification}</Badge>
            )}
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
              {rigsData
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
