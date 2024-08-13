import { useQuery } from "@tanstack/react-query";
import { efficienciesService } from "../../services/efficienciesService";
import { QueryKeys } from "@/app/config/QueryKeys";

export const useGetWellsCountByRig = (rigId: string) => {
  const { data, isFetching, refetch } = useQuery({
    queryKey: [QueryKeys.WELLS_COUNT],
    enabled: true,
    queryFn: () => efficienciesService.getWellsCountByRig(rigId),
    staleTime: 24 * 60 * 60 * 1000,
  });

  return {
    wellsCount: data ?? [],
    isFetchingWellsCount: isFetching,
    refetchWellsCount: refetch,
  };
};
