import { useQuery } from "@tanstack/react-query";
import { occurrencesService } from "@/app/services/occurrencesService";
import { QueryKeys } from "@/app/config/QueryKeys";

export const useOccurrencesTaxesByBaseId = (baseId?: string) => {
  const { data, isFetching, refetch, isLoading } = useQuery({
    queryKey: [QueryKeys.OCCURRENCES_TAXES],
    queryFn: () => occurrencesService.getTaxesById(baseId),
    enabled: !!baseId,
    staleTime: 1000,
  });

  return {
    occurrencesTaxes: data,
    isFetchingOccurrencesTaxes: isFetching,
    isOccurrencesTaxesInitialLoading: isLoading,
    refetchOccurrencesTaxes: refetch,
  };
};
