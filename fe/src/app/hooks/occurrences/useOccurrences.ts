import { useQuery } from "@tanstack/react-query";
import { occurrencesService } from "@/app/services/occurrencesService";
import { QueryKeys } from "@/app/config/QueryKeys";

export const useOccurrences = () => {
  const { data, isFetching, refetch } = useQuery({
    queryKey: [QueryKeys.OCCURRENCES],
    queryFn: () => occurrencesService.getAll(),
    enabled: true,
    staleTime: 1000,
  });

  console.log("dataee", data);

  return {
    occurrences: data ?? [],
    isFetchingOccurrences: isFetching,
    refetchOccurrences: refetch,
  };
};
