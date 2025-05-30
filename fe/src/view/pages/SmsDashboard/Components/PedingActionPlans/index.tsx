import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSmsDashboardContext } from "../../SmsDashboardContext/useSmsDashboardContext";
import { useMemo } from "react";
import { OccurrenceAction } from "@/app/entities/OccurrenceAction";
import { OccurenceActionBadgeStatus } from "@/view/components/OccurrenceActionBagdeStatus";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

export const PedingActionPlans = () => {
  const { occurrences, openEditOccurrenceActionModal } =
    useSmsDashboardContext();

  const { pendingActions } = useMemo(() => {
    let pendingActions: OccurrenceAction[] = [];

    occurrences.forEach((occurrence) => {
      occurrence.occurrenceActions.forEach((occurrenceAction) => {
        if (!occurrenceAction.isFinished) {
          pendingActions.push(occurrenceAction);
        }
      });
    });

    return {
      pendingActions,
    };
  }, [occurrences]);

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Ações Pendentes</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[400px]">Título</TableHead>
              <TableHead>Responsável</TableHead>
              <TableHead>Vencimento</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pendingActions.map((action) => (
              <TableRow key={action.id}>
                <TableCell className="font-medium">{action.title}</TableCell>
                <TableCell>{action.responsible}</TableCell>
                <TableCell>
                  {new Date(action.dueDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <OccurenceActionBadgeStatus occurrenceAction={action} />
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => openEditOccurrenceActionModal(action)}
                    className="rounded-md"
                    variant="outline"
                  >
                    <Pencil />
                    Editar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
