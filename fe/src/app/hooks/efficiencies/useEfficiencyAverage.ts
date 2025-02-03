import { useQuery } from "@tanstack/react-query";
import { efficienciesService } from "../../services/efficienciesService";
import { EfficienciesAverageFilters } from "@/app/services/efficienciesService/getAverage";

export const useEfficiencyAverage = (filters: EfficienciesAverageFilters) => {
  const { data, isFetching, refetch } = useQuery({
    queryKey: ["average"],
    enabled: true,
    queryFn: () => efficienciesService.getAverage(filters),
    staleTime: 24 * 60 * 60 * 1000,
  });

  return {
    average: data ?? [],
    isFetchingAverage: isFetching,
    refetchAverage: refetch,
  };
};
