import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@/app/config/QueryKeys";
import { periodActionPlanServices } from "@/app/services/periodActionPlanServices";

export const usePeriodActionPlan = (actionPlanId: string) => {
  const { data, isFetching, refetch } = useQuery({
    queryKey: [QueryKeys.PERIOD_ACTION_PLAN],
    queryFn: () => periodActionPlanServices.getById(actionPlanId),
    enabled: true,
  });

  return {
    periodActionPlan: data ?? null,
    isFetchingPeriodsActionPlan: isFetching,
    refetchPeriodsActionPlan: refetch,
  };
};
