import { Occurrence } from "@/app/entities/Occurrence";
import { HardHat, TrashIcon } from "lucide-react";
import { occurrenceTypeSelectOptions } from "../../utils/occurrenceTypeSelectOptions";
import { formatDate } from "@/app/utils/formatDate";
import { Button } from "@/view/components/Button";
import { useOccurrencesContext } from "../OccurrencesContext/useOccurencesContext";

interface OccurrenceItemProps {
  occurrence: Occurrence;
}

export const OccurrenceItem = ({ occurrence }: OccurrenceItemProps) => {
  const { openEditOccurrenceModal } = useOccurrencesContext();

  return (
    <div
      className="bg-gray-400 h-36 flex items-center py-6 px-4 justify-between"
      key={occurrence.id}
    >
      <div className="flex gap-6 items-center ">
        <div className="bg-white p-4 rounded-full h-1/2">
          <HardHat />
        </div>
        <div className=" flex flex-col gap-2 ">
          <span className="text-lg text-primary font-bold">
            {
              occurrenceTypeSelectOptions.find(
                ({ value }) => value === occurrence.type
              )?.label
            }
          </span>
          <span className="text-primary">
            {formatDate(new Date(occurrence.date))}
          </span>
          <span className="text-primary">{occurrence.base.name}</span>
        </div>
      </div>
      <div className="flex gap-3 w-52 justify-end">
        <Button
          className="border-primary text-primary border-2 rounded-md px-4 flex-1"
          variant="ghost"
          onClick={() => openEditOccurrenceModal(occurrence)}
        >
          Ver Detalhes
        </Button>
        <button className="text-white bg-redAccent-500 w-12 h-12 flex justify-center items-center rounded-md hover:bg-redAccent-400 duration-250 active:bg-redAccent-700 transition-all ">
          <TrashIcon className="text-white" />
        </button>
      </div>
    </div>
  );
};
