import { useQuery } from "@tanstack/react-query";
import { efficienciesService } from "../../services/efficienciesService";
import { filters } from "../../services/efficienciesService/getRigsAverage";
import { QueryKeys } from "@/app/config/QueryKeys";

export const useEfficienciesRigsAverage = (
  filters: filters,
  enabled: boolean = false
) => {
  const { data, isFetching, refetch } = useQuery({
    queryKey: [QueryKeys.RIGS_AVERAGE],
    enabled: enabled,
    queryFn: () => efficienciesService.getRigsAverage(filters),
    staleTime: 24 * 60 * 60 * 1000,
  });

  return {
    rigsAverage: data ?? [],
    isFetchingRigsAverage: isFetching,
    refetchRigsAverage: refetch,
  };
};
