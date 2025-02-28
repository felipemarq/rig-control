import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../config/QueryKeys";
import { checklistsService } from "@/app/services/checklistsService";

export const useChecklistItems = () => {
  const { data, isFetching, refetch } = useQuery({
    queryKey: [QueryKeys.CHECKLIST_ITEMS],
    queryFn: () => checklistsService.getAllChecklistsItems(),
    staleTime: 24 * 60 * 60 * 1000,
  });

  return {
    checklistItems: data ?? [],
    isFetchingchecklistItems: isFetching,
    refetchchecklistItems: refetch,
  };
};
