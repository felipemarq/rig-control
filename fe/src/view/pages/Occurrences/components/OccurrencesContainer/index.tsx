import { Spinner } from "@/view/components/Spinner";
import { useOccurrencesContainer } from "./useOccurrencesContainer";
import { Input } from "@/view/components/Input";
import { Button } from "@/view/components/Button";
import { OccurrenceItem } from "./OccurrenceItem";
import { NotFound } from "@/view/components/NotFound";

export const OccurrencesContainer = () => {
  const {
    occurrences,
    isFetchingOccurrences,
    isInitialLoading,
    filteredOccurrences,
    handleChangeSearchTerm,
  } = useOccurrencesContainer();

  const hasOccurrences = occurrences.length > 0;

  return (
    <div className=" h-full ">
      {isInitialLoading && (
        <div className="h-full w-full flex items-center justify-center">
          <Spinner />
        </div>
      )}
      {!isInitialLoading && (
        <div className="h-full w-full flex items-center justify-center ">
          {isFetchingOccurrences && (
            <div>
              <Spinner />
            </div>
          )}

          {!isFetchingOccurrences && !hasOccurrences && (
            <div className="h-full">
              <NotFound>Não foram encontrados registros</NotFound>
            </div>
          )}

          {!isFetchingOccurrences && hasOccurrences && (
            <div className="w-full h-full p-4 overflow-y-auto scrollbar-hide">
              <header className="flex gap-3 justify-between">
                <div className="w-3/4">
                  <Input
                    name="search"
                    onChange={(value) => handleChangeSearchTerm(value)}
                    variant="modal"
                    className="bg-gray-200 h-12"
                    placeholder="Pesquisar por título..."
                  />
                </div>

                <Button variant="ghost" className="rounded-md w-56 ">
                  Filtrar dados
                </Button>
              </header>
              <div className="flex flex-col gap-3 mt-6 mb-6 ">
                {filteredOccurrences.map((occurrence) => (
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
