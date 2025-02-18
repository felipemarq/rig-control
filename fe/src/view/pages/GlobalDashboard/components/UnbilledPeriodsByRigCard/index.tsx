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
  className?: string;
}

export const UnbilledPeriodsByRigCard = ({
  selectedView,
  selectedDetailView,
  selectedRepairClassification,
  rigsData,
  className,
}: UnbilledPeriodsByRigCardProps) => {
  const { handleChangeRig } = useFiltersContext();

  const navigate = useNavigate();

  return (
    <>
      <Card className={cn("", className)}>
        <CardHeader className="px-7">
          <CardTitle>Periodo não faturado por sonda</CardTitle>
          <CardDescription className="flex gap-2 items-center">
            {selectedView === "GLOSS" && <Badge>Glosas</Badge>}

            {selectedView === "REPAIR" && <Badge>Reparos</Badge>}

            {selectedView === "COMMERCIALLY_STOPPED" && <Badge>Paradas Comerciais</Badge>}

            {selectedView === "SCHEDULED_STOP" && <Badge>Paradas Programadas</Badge>}

            {!selectedDetailView && <Badge>Todos</Badge>}

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
