import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@/app/config/QueryKeys";
import { manHoursService } from "@/app/services/manHoursService";
import { ManHourFilters } from "@/app/services/manHoursService/getAll";

export const useManHours = (filters: ManHourFilters) => {
  const { data, isFetching, refetch, isLoading } = useQuery({
    queryKey: [QueryKeys.MAN_HOURS],
    queryFn: () => manHoursService.getAll(filters),
    enabled: true,
  });

  return {
    manHours: data ?? [],
    isFetchingManHours: isFetching,
    isInitialLoading: isLoading,
    refetchManHours: refetch,
  };
};
