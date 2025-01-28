import { useQuery } from "@tanstack/react-query";
import { efficienciesService } from "../../services/efficienciesService";
import { QueryKeys } from "@/app/config/QueryKeys";

export const useGetEfficiencyPedingConfirmation = (enabled: boolean = false) => {
  const { data, isFetching, refetch } = useQuery({
    queryKey: [QueryKeys.EFFICIENCIES_PENDING_CONFIRMATION],
    enabled: enabled,
    queryFn: () => efficienciesService.getPedingConfirmation(),
    staleTime: 24 * 60 * 60 * 1000,
  });

  return {
    pendingEfficienciesConfirmation: data ?? [],
    isFetchingpendingEfficienciesConfirmation: isFetching,
    refetchpendingEfficienciesConfirmation: refetch,
  };
};
