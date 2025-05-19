import { useQuery } from "@tanstack/react-query";

import { billingServices } from "../../services/billingServices";
import { BillingsByRigIFilters } from "../../services/billingServices/getbyRigId";
import { QueryKeys } from "../../config/QueryKeys";

export const useBillingByRigId = (filters: BillingsByRigIFilters) => {
  const { data, isFetching, refetch } = useQuery({
    queryKey: [QueryKeys.BILLING],
    queryFn: () => billingServices.getbyRigId(filters),
    enabled: Boolean(filters.rigId),
  });

  return {
    billing: data ?? [],
    isFetchingBilling: isFetching,
    refetchBilling: refetch,
  };
};
