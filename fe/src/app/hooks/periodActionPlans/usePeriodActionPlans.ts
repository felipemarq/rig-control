import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@/app/config/QueryKeys";
import { periodActionPlanServices } from "@/app/services/periodActionPlanServices";

export const usePeriodActionPlans = () => {
  const { data, isFetching, refetch } = useQuery({
    queryKey: [QueryKeys.PERIOD_ACTION_PLANS],
    queryFn: () => periodActionPlanServices.getAll(),
    enabled: true,
  });

  return {
    periodActionPlans: data ?? [],
    isFetchingPeriodsActionPlans: isFetching,
    refetchPeriodsActionPlans: refetch,
  };
};
