import { useDaysNotRegisteredCard } from "./useDaysNotRegisteredCard";
import { cn } from "../../../../../app/utils/cn";
import { AlertTriangle } from "lucide-react";
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

interface DaysNotRegisteredCardProps {
  className?: string;
}

export const DaysNotRegisteredCard = ({
  className,
}: DaysNotRegisteredCardProps) => {
  const { mappedRigsAverage } = useDaysNotRegisteredCard();

  return (
    <Card className={cn("", className)}>
      <CardHeader className="px-7">
        <CardTitle>Registros</CardTitle>
        <CardDescription>
          Lista dos dias sem registros de eficiência por sonda.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sonda</TableHead>
              <TableHead>
                <div className="flex gap-4 justify-center items-center">
                  Dias sem Registro
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mappedRigsAverage.map(({ rig, daysNotRegistered, rigId }) => (
              <TableRow key={rigId}>
                <TableCell>
                  <div className="font-medium">{rig}</div>
                </TableCell>
                <TableCell
                  className={cn(
                    " text-center",
                    daysNotRegistered > 3 && "text-redAccent-500",
                  )}
                >
                  <div>
                    <div className="flex gap-4 justify-center items-center">
                      {daysNotRegistered} Dias
                      {daysNotRegistered > 5 && <AlertTriangle />}
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
