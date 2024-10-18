import { Occurrence, OccurrenceType } from "@/app/entities/Occurrence";
import {
  Cross,
  DownloadIcon,
  Eye,
  HardHat,
  List,
  Paperclip,
  PlusCircle,
  TreePine,
  Waypoints,
} from "lucide-react";
import { formatDate } from "@/app/utils/formatDate";
import { useOccurrencesContext } from "../OccurrencesContext/useOccurencesContext";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { differenceInDays, isPast, isToday } from "date-fns";
import { OccurrenceAction } from "@/app/entities/OccurrenceAction";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface OccurrenceItemProps {
  occurrence: Occurrence;
}

export const OccurrenceItem = ({ occurrence }: OccurrenceItemProps) => {
  const {
    openEditOccurrenceModal,
    openNewOccurrenceActionModal,
    openEditOccurrenceActionModal,
  } = useOccurrencesContext();
  const hasFile = occurrence.files.length > 0;

  const getStatusBadge = (occurrenceAction: OccurrenceAction) => {
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
  return (
    <Card key={occurrence.id} className="bg-gray-100">
      <CardContent className="p-4 flex flex-col  justify-between">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-white p-2 rounded-full">
              {occurrence.type === OccurrenceType.SAFETY && (
                <HardHat className="text-orange-400" />
              )}
              {occurrence.type === OccurrenceType.ENVIRONMENT && (
                <TreePine className="text-green-500" />
              )}
              {occurrence.type === OccurrenceType.HEALTH && (
                <Cross className="text-red-500" />
              )}
              {occurrence.type === OccurrenceType.PROCESS && (
                <Waypoints className="text-blue-500" />
              )}
            </div>
            <div>
              <h2 className="font-semibold text-primary-600">{occurrence.title}</h2>
              <p className="text-sm text-gray-600">
                {formatDate(new Date(occurrence.date))}
              </p>
              <p className="text-sm text-gray-600">{occurrence.base.name}</p>
              {/*  {getStatusBadge(occurrence.occurrenceActions)} */}
            </div>
          </div>
          <div className="flex space-x-2">
            <TooltipProvider>
              <Tooltip delayDuration={200}>
                <TooltipTrigger>
                  {" "}
                  <div
                    onClick={() => openNewOccurrenceActionModal(occurrence.id)}
                    className="text-white bg-primary w-12 h-12 flex justify-center items-center rounded-md hover:bg-primaryAccent-400 duration-250 active:bg-primaryAccent-700 transition-all "
                  >
                    <PlusCircle className="text-white" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Criar Plano de Ação</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* {occurrence.occurrenceActions[0] && (
            <TooltipProvider>
              <Tooltip delayDuration={200}>
                <TooltipTrigger>
                  {" "}
                  <div
                    onClick={() =>
                      openEditOccurrenceActionModal(occurrence.occurrenceActions[0])
                    }
                    className="text-white bg-primary w-12 h-12 flex justify-center items-center rounded-md hover:bg-primaryAccent-400 duration-250 active:bg-primaryAccent-700 transition-all "
                  >
                    <Eye className="text-white" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Visualizar plano de ação</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )} */}

            <TooltipProvider>
              <Tooltip delayDuration={100}>
                <TooltipTrigger>
                  {" "}
                  <div
                    className="text-white bg-primary w-12 h-12 flex justify-center items-center rounded-md hover:bg-primaryAccent-400 duration-250 active:bg-primaryAccent-700 transition-all "
                    onClick={() => openEditOccurrenceModal(occurrence)}
                  >
                    <List className="text-white" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Ver Detalhes</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {hasFile && (
              <TooltipProvider>
                <Tooltip delayDuration={100}>
                  <TooltipTrigger>
                    {" "}
                    <a
                      href={occurrence.files[0]?.path}
                      className="text-white bg-primary w-12 h-12 flex justify-center items-center rounded-md hover:bg-primaryAccent-400 duration-250 active:bg-primaryAccent-700 transition-all "
                    >
                      <DownloadIcon className="text-white" />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Baixar arquivo anexado</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}

            {!hasFile && (
              <TooltipProvider>
                <Tooltip delayDuration={200}>
                  <TooltipTrigger>
                    {" "}
                    <button
                      onClick={() => openEditOccurrenceModal(occurrence)}
                      className="text-white bg-primary w-12 h-12 flex justify-center items-center rounded-md hover:bg-primaryAccent-400 duration-250 active:bg-primaryAccent-700 transition-all "
                    >
                      <Paperclip className="text-white" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Anexar arquivo</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>
        <Accordion type="single" collapsible>
          <AccordionItem value="installments">
            <AccordionTrigger className="px-6 py-4 border-t flex items-center justify-between">
              <span>Ver Planos de ação</span>
            </AccordionTrigger>
            <AccordionContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[300px]">Título</TableHead>
                    <TableHead>Responsável</TableHead>
                    <TableHead>Vencimento</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {occurrence.occurrenceActions.map((action) => (
                    <TableRow key={action.id}>
                      <TableCell className="font-medium">{action.title}</TableCell>
                      <TableCell>{action.responsible}</TableCell>
                      <TableCell>
                        {new Date(action.dueDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{getStatusBadge(action)}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditOccurrenceActionModal(action)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Visualizar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};
