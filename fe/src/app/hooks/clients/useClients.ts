import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../config/QueryKeys";
import { clientsService } from "@/app/services/clientsService";

export const useClients = () => {
  const { data, isFetching, refetch } = useQuery({
    queryKey: [QueryKeys.CLIENTS],
    queryFn: () => clientsService.getAll(),
    staleTime: 24 * 60 * 60 * 1000,
  });

  return {
    clients: data ?? [],
    isFetchingClients: isFetching,
    refetchClients: refetch,
  };
};
