import { useState } from "react";
import { usePeriodActionPlansContext } from "../PeriodActionPlansContext/usePeriodActionPlansContext";
import { is } from "date-fns/locale";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { periodActionPlanServices } from "@/app/services/periodActionPlanServices";
import { AxiosError } from "axios";
import { QueryKeys } from "@/app/config/QueryKeys";

export const usePeriodActionPlansContainer = () => {
  const {
    isFetchingPeriodsActionPlans,
    periodActionPlans,
    navigate,
    openEditPeriodActionPlanModal,
  } = usePeriodActionPlansContext();

  const queryClient = useQueryClient();

  const [isDeletePeriodActionPlanModalOpen, setIsDeletePeriodActionPlanModalOpen] =
    useState(false);
  const [periodActionPlanBeingDeleted, setPeriodActionPlanBeingDeleted] = useState<
    string | null
  >(null);

  const closeDeletePeriodActionPlanModal = async () => {
    setIsDeletePeriodActionPlanModalOpen(false);
    setPeriodActionPlanBeingDeleted(null);
  };

  const openDeletePeriodActionPlanModal = async (periodActionPlanId: string) => {
    setIsDeletePeriodActionPlanModalOpen(true);
    setPeriodActionPlanBeingDeleted(periodActionPlanId);
  };

  const {
    isPending: isLoadingDeletePeriodActionPlan,
    mutateAsync: mutateDeletePeriodActionPlanAsync,
  } = useMutation({
    mutationFn: periodActionPlanServices.remove,
  });

  const handleDeletePeriodActionPlan = async () => {
    try {
      await mutateDeletePeriodActionPlanAsync(periodActionPlanBeingDeleted!);
      closeDeletePeriodActionPlanModal();
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.PERIOD_ACTION_PLAN, QueryKeys.PERIOD_ACTION_PLANS],
      });
      navigate("/period-action-plan");
    } catch (error: any | typeof AxiosError) {
      console.log(error);
      //navigate("/dashboard");
    }
  };

  return {
    isFetchingPeriodsActionPlans,
    periodActionPlans,
    navigate,
    openEditPeriodActionPlanModal,
    openDeletePeriodActionPlanModal,
    isDeletePeriodActionPlanModalOpen,
    closeDeletePeriodActionPlanModal,
    periodActionPlanBeingDeleted,
    isLoadingDeletePeriodActionPlan,
    handleDeletePeriodActionPlan,
  };
};
