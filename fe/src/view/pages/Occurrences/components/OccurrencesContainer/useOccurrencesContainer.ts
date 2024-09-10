import { useOccurrences } from "@/app/hooks/occurrences/useOccurrences";
import { ChangeEvent, useMemo, useState } from "react";
import { useOccurrencesContext } from "../OccurrencesContext/useOccurencesContext";

export const useOccurrencesContainer = () => {
  const { occurrences, isFetchingOccurrences, isInitialLoading } =
    useOccurrencesContext();

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
