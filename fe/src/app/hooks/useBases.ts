import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../config/QueryKeys";
import { basesService } from "../services/basesService";

export const useBases = () => {
  const { data, isFetching, refetch } = useQuery({
    queryKey: [QueryKeys.BASES],
    queryFn: () => basesService.getAll(),
    staleTime: 24 * 60 * 60 * 1000,
    enabled: true,
  });

  return {
    bases: data ?? [],
    isFetchingBases: isFetching,
    refetchBases: refetch,
  };
};
