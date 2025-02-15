import { OccurrenceAction } from "@/app/entities/OccurrenceAction";
import { Badge } from "@/components/ui/badge";
import { differenceInDays, isPast, isToday } from "date-fns";

interface OccurrenceActionBadgeStatusProps {
  occurrenceAction: OccurrenceAction;
}

export const OccurenceActionBadgeStatus = ({
  occurrenceAction,
}: OccurrenceActionBadgeStatusProps) => {
  if (!occurrenceAction) {
    return <Badge>Sem plano de ação</Badge>;
  }

  if (occurrenceAction.isFinished) {
    return <Badge>Finalizado</Badge>;
  }

  const dueDate = occurrenceAction.dueDate;

  const today = new Date(); // Data de hoje
  const daysDifference = differenceInDays(new Date(dueDate), today);

  if (isPast(new Date(dueDate))) {
    // Caso a dueDate tenha passado
    return <Badge className="bg-red-500">Vencido</Badge>;
  }

  if (isToday(new Date(dueDate))) {
    // Caso seja o mesmo dia
    return <Badge className="bg-yellow-500">Vence hoje</Badge>;
  }

  if (daysDifference <= 3) {
    // Caso esteja próximo da data (você pode ajustar o limite)
    return <Badge className="bg-orange-500">Próximo</Badge>;
  }

  // Caso esteja "em dia" (a data está longe o suficiente)
  return <Badge className="bg-green-500">Em dia</Badge>;
};
