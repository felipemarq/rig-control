import { useQuery } from "@tanstack/react-query";
import { occurrencesService } from "@/app/services/occurrencesService";
import { QueryKeys } from "@/app/config/QueryKeys";
import { OccurrencesTaxesFilters } from "@/app/services/occurrencesService/getTaxes";

export const useOccurrencesTaxes = (filters: OccurrencesTaxesFilters) => {
  const { data, isFetching, refetch, isLoading } = useQuery({
    queryKey: [QueryKeys.TOTAL_OCCURRENCES_TAXES],
    queryFn: () => occurrencesService.getTaxes(filters),
    enabled: !!filters.year,
    staleTime: 1000,
  });

  return {
    occurrencesTaxes: data,
    isFetchingOccurrencesTaxes: isFetching,
    isOccurrencesTaxesInitialLoading: isLoading,
    refetchOccurrencesTaxes: refetch,
  };
};
