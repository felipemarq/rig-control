import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../config/QueryKeys";
import { checklistsService } from "@/app/services/checklistsService";
import { ChecklistsFilters } from "@/app/services/checklistsService/getAll";

export const useChecklists = (filters: ChecklistsFilters) => {
  const { data, isFetching, refetch } = useQuery({
    queryKey: [QueryKeys.CHECKLISTS],
    queryFn: () => checklistsService.getAll(filters),
    staleTime: 24 * 60 * 60 * 1000,
  });

  return {
    checklists: data ?? [],
    isFetchingChecklists: isFetching,
    refetchChecklists: refetch,
  };
};
