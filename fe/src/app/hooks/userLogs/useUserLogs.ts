import { useQuery } from "@tanstack/react-query";

import { GetUserLogsFilters } from "@/app/services/userLogsService/getAll";
import { userLogsService } from "@/app/services/userLogsService";
import { QueryKeys } from "@/app/config/QueryKeys";

export const useUserLogs = (filters: GetUserLogsFilters) => {
  const { data, isFetching, refetch } = useQuery({
    queryKey: [QueryKeys.USER_LOGS],
    queryFn: () => userLogsService.getAll(filters),
    enabled: true,
  });

  return {
    userLogsResponse: data ?? { data: [], totalItems: 0 },
    isFetchingUserLogs: isFetching,
    refetchUserLogs: refetch,
  };
};
