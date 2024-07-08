import { useOccurrences } from "@/app/hooks/occurrences/useOccurrences";

export const useOccurrencesContainer = () => {
  const {
    isFetchingOccurrences,
    occurrences,
    refetchOccurrences,
    isInitialLoading,
  } = useOccurrences();

  return {
    isFetchingOccurrences,
    occurrences,
    isInitialLoading,
  };
};
