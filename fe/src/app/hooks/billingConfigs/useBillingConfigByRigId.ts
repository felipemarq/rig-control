import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../config/QueryKeys";
import { billingConfigService } from "@/app/services/billingConfigServices";

export const useBillingConfigByRigId = (rigId: string) => {
  const { data, isFetching, refetch } = useQuery({
    queryKey: [QueryKeys.CONFIG_BILLINGS],
    queryFn: () => billingConfigService.getAllByRigId(rigId),
  });

  return {
    billingConfigs: data ?? [],
    isFetchingbillingConfigs: isFetching,
    refetchbillingConfigs: refetch,
  };
};
