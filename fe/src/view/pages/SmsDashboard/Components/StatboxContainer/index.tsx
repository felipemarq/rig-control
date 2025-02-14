import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { useSmsDashboardContext } from "../../SmsDashboardContext/useSmsDashboardContext";
import { differenceInMinutes } from "date-fns";

export const StatboxContainer = () => {
  const { occurrences } = useSmsDashboardContext();

  const totalOccurrences = occurrences.length;

  let totalOccurrenceActions = 0;
  let totalFinishedOccurrenceActions = 0;
  let totalMinutes = 0;
  let completedActionsCount = 0;

  occurrences.forEach((occurrence) => {
    totalOccurrenceActions += occurrence.occurrenceActions.length;

    occurrence.occurrenceActions.forEach((occurrenceAction) => {
      if (occurrenceAction.isFinished) {
        totalFinishedOccurrenceActions++;

        const createdAt = new Date(occurrence.date);
        const finishedAt = new Date(occurrenceAction.finishedAt!);

        let diffInMinutes = differenceInMinutes(finishedAt, createdAt);

        totalMinutes += diffInMinutes;
        completedActionsCount++;
      }
    });
  });

  // Calculate average time in days
  const averageResolutionTimeInDays =
    completedActionsCount > 0
      ? (totalMinutes / completedActionsCount / 1440).toFixed(2)
      : "0";

  let totalFinishedOccurrenceActionsPercentage =
    (totalFinishedOccurrenceActions / totalOccurrenceActions) * 100;

  if (isNaN(totalFinishedOccurrenceActions / totalOccurrenceActions)) {
    totalFinishedOccurrenceActionsPercentage = 0;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total de Ocorrências</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalOccurrences}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Planos de Ação criados</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalOccurrenceActions}</div>
          <p className="text-xs text-muted-foreground"></p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Planos de Ação Concluídos</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {totalFinishedOccurrenceActionsPercentage.toFixed(2)}%
          </div>
          <Progress value={totalFinishedOccurrenceActionsPercentage} className="mt-2" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tempo Médio de Resolução</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{averageResolutionTimeInDays}dias</div>
        </CardContent>
      </Card>
    </div>
  );
};
