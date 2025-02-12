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

export const PedingActionPlans = () => {
  const { occurrences } = useSmsDashboardContext();

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
              <TableHead>Descrição</TableHead>
              <TableHead>Prazo</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pendingActions.length > 0 ? (
              <>
                {" "}
                {pendingActions.map((acao) => (
                  <TableRow key={acao.id}>
                    <TableCell>{acao.description}</TableCell>
                    <TableCell>{acao.dueDate}</TableCell>
                    <TableCell>{acao.responsible}</TableCell>
                  </TableRow>
                ))}
              </>
            ) : (
              <>
                <TableRow>
                  <TableCell colSpan={3}>
                    <div className="flex justify-center">
                      <p className="text-muted-foreground">Não há ações pendentes</p>
                    </div>
                  </TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
