import { Spinner } from "@/view/components/Spinner";
import { useOccurrencesContainer } from "./useOccurrencesContainer";
import { Input } from "@/view/components/Input";
import { Button } from "@/view/components/Button";
import { HardHat, TrashIcon } from "lucide-react";
import { formatDate } from "@/app/utils/formatDate";
import { occurrenceTypeSelectOptions } from "../../utils/occurrenceTypeSelectOptions";

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
                    className="bg-gray-200"
                    placeholder="Pesquisar..."
                  />
                </div>

                <Button variant="ghost" className="rounded-md w-56 h-[52px]">
                  Filtrar dados
                </Button>
              </header>
              <div className="flex flex-col gap-3 mt-6">
                {occurrences.map(
                  ({ id, date, type, baseId, base: { name, state } }) => (
                    <div
                      className="bg-gray-400 h-36 flex items-center py-6 px-4 justify-between"
                      key={id}
                    >
                      <div className="flex gap-6 items-center ">
                        <div className="bg-white p-4 rounded-full h-1/2">
                          <HardHat />
                        </div>
                        <div className=" flex flex-col gap-2 ">
                          <span className="text-lg text-primary font-bold">
                            {
                              occurrenceTypeSelectOptions.find(
                                ({ value }) => value === type
                              )?.label
                            }
                          </span>
                          <span className="text-primary">
                            {formatDate(new Date(date))}
                          </span>
                          <span className="text-primary">{name}</span>
                        </div>
                      </div>
                      <div className="flex gap-3 w-52 justify-end">
                        <Button
                          className="border-primary text-primary border-2 rounded-md px-4 flex-1"
                          variant="ghost"
                        >
                          Ver Detalhes
                        </Button>
                        <button className="text-white bg-redAccent-500 w-12 h-12 flex justify-center items-center rounded-md hover:bg-redAccent-400 duration-250 active:bg-redAccent-700 transition-all ">
                          <TrashIcon className="text-white" />
                        </button>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
