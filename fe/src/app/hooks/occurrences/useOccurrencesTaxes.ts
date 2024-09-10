import { useQuery } from "@tanstack/react-query";
import { occurrencesService } from "@/app/services/occurrencesService";
import { QueryKeys } from "@/app/config/QueryKeys";

export const useOccurrencesTaxes = () => {
  const { data, isFetching, refetch, isLoading } = useQuery({
    queryKey: [QueryKeys.TOTAL_OCCURRENCES_TAXES],
    queryFn: () => occurrencesService.getTaxes(),
    enabled: true,
    staleTime: 1000,
  });

  return {
    occurrencesTaxes: data,
    isFetchingOccurrencesTaxes: isFetching,
    isOccurrencesTaxesInitialLoading: isLoading,
    refetchOccurrencesTaxes: refetch,
  };
};
