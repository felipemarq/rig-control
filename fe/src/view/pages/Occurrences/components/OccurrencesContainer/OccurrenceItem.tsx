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

interface OccurrenceItemProps {
  occurrence: Occurrence;
}

export const OccurrenceItem = ({ occurrence }: OccurrenceItemProps) => {
  const { openEditOccurrenceModal, openNewOccurrenceActionModal } =
    useOccurrencesContext();
  const hasFile = occurrence.files.length > 0;
  return (
    <div
      className="bg-gray-400 h-36 flex items-center py-6 px-4 justify-between"
      key={occurrence.id}
    >
      <div className="flex gap-6 items-center ">
        <div className="bg-white p-4 rounded-full h-1/2">
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
        <div className=" flex flex-col gap-2 ">
          <span className="text-lg text-primary font-bold">{occurrence.title}</span>
          <span className="text-primary">{formatDate(new Date(occurrence.date))}</span>
          <span className="text-primary">{occurrence.base.name}</span>
        </div>
      </div>
      <div className="flex gap-3 w-auto justify-end ">
        {!occurrence.occurrenceActions[0] && (
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
        )}

        {occurrence.occurrenceActions[0] && (
          <TooltipProvider>
            <Tooltip delayDuration={200}>
              <TooltipTrigger>
                {" "}
                <div
                  onClick={() => openNewOccurrenceActionModal(occurrence.id)}
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
        )}

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
  );
};
