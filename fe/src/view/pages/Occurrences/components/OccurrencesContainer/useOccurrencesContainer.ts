import { useOccurrences } from "@/app/hooks/occurrences/useOccurrences";
import { ChangeEvent, useMemo, useState } from "react";

export const useOccurrencesContainer = () => {
  const { isFetchingOccurrences, occurrences, isInitialLoading } =
    useOccurrences();

  const [searchTerm, setSearchTerm] = useState("");

  const handleChangeSearchTerm = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredOccurrences = useMemo(() => {
    return occurrences.filter((occurrence) =>
      occurrence.title
        .toLocaleLowerCase()
        .includes(searchTerm.toLocaleLowerCase())
    );
  }, [searchTerm, occurrences]);

  return {
    isFetchingOccurrences,
    occurrences,
    isInitialLoading,
    filteredOccurrences,
    handleChangeSearchTerm,
  };
};
