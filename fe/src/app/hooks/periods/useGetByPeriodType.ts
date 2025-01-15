import { useQuery } from "@tanstack/react-query";
import { GetByPeriodTypeFilters } from "../../services/periodsService/getByPeriodType";
import { periodsService } from "../../services/periodsService";
import { QueryKeys } from "@/app/config/QueryKeys";

export const useGetByPeriodType = (filters: GetByPeriodTypeFilters) => {
  const { data, isFetching, refetch } = useQuery({
    queryKey: [QueryKeys.PERIODS],
    queryFn: () => periodsService.getByPeriodType(filters),
    enabled: false,
  });

  return {
    periodsResponse: data ?? { data: [], totalItems: 0 },
    isFetchingPeriods: isFetching,
    refetchPeriods: refetch,
  };
};
