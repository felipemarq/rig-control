import { Spinner } from "@/view/components/Spinner";
import { useOccurrencesContainer } from "./useOccurrencesContainer";
import { Input } from "@/view/components/Input";
import { Button } from "@/view/components/Button";
import { HardHat, TrashIcon } from "lucide-react";
import { formatDate } from "@/app/utils/formatDate";
import { occurrenceTypeSelectOptions } from "../../utils/occurrenceTypeSelectOptions";
import { OccurrenceItem } from "./OccurrenceItem";

export const OccurrencesContainer = () => {
  const { occurrences, isFetchingOccurrences, isInitialLoading } =
    useOccurrencesContainer();

  const hasOccurrences = occurrences.length > 0;

  return (
    <div className=" h-full overflow-y-auto">
      {isInitialLoading && (
        <div>
          <Spinner />
        </div>
      )}
      {!isInitialLoading && (
        <div>
          {isFetchingOccurrences && (
            <div>
              <Spinner />
            </div>
          )}

          {!isFetchingOccurrences && !hasOccurrences && <p>Empty</p>}

          {!isFetchingOccurrences && hasOccurrences && (
            <div className="w-full h-full p-4">
              <header className="flex gap-3 justify-between">
                <div className="w-3/4">
                  <Input
                    name="search"
                    variant="modal"
                    className="bg-gray-200 h-12"
                    placeholder="Pesquisar..."
                  />
                </div>

                <Button variant="ghost" className="rounded-md w-56 ">
                  Filtrar dados
                </Button>
              </header>
              <div className="flex flex-col gap-3 mt-6">
                {occurrences.map((occurrence) => (
                  <OccurrenceItem occurrence={occurrence} key={occurrence.id} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
