import { useQuery } from "@tanstack/react-query";
import { occurrencesService } from "@/app/services/occurrencesService";
import { QueryKeys } from "@/app/config/QueryKeys";
import { OccurrenceFilters } from "@/app/services/occurrencesService/getAll";

export const useOccurrences = (filters: OccurrenceFilters) => {
  const { data, isFetching, refetch, isLoading } = useQuery({
    queryKey: [QueryKeys.OCCURRENCES],
    queryFn: () => occurrencesService.getAll(filters),
    enabled: true,
    staleTime: 1000,
  });

  return {
    occurrences: data ?? [],
    isFetchingOccurrences: isFetching,
    isInitialLoading: isLoading,
    refetchOccurrences: refetch,
  };
};
