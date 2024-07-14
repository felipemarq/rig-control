import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@/app/config/QueryKeys";
import { manHoursService } from "@/app/services/manHoursService";

export const useManHours = () => {
  const { data, isFetching, refetch, isLoading } = useQuery({
    queryKey: [QueryKeys.MAN_HOURS],
    queryFn: () => manHoursService.getAll(),
    enabled: true,
  });

  return {
    manHours: data ?? [],
    isFetchingManHours: isFetching,
    isInitialLoading: isLoading,
    refetchManHours: refetch,
  };
};
