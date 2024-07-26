import { useOccurrences } from "@/app/hooks/occurrences/useOccurrences";

export const useOccurrencesContainer = () => {
  const { isFetchingOccurrences, occurrences, isInitialLoading } =
    useOccurrences();

  console.log("Occurrences: ", occurrences);

  return {
    isFetchingOccurrences,
    occurrences,
    isInitialLoading,
  };
};
