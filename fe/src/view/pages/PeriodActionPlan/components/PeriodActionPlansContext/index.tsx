import { PeriodActionPlan } from "@/app/entities/PeriodActionPlan";
import { PersistanceEfficiency } from "@/app/entities/PersistanceEfficiency";
import { usePeriodActionPlans } from "@/app/hooks/periodActionPlans/usePeriodActionPlans";
import { PeriodActionPlansResponse } from "@/app/services/periodActionPlanServices/getAll";
import React, { createContext, useCallback, useState } from "react";
import { NavigateFunction, useLocation, useNavigate, useParams } from "react-router-dom";

// Definição do tipo do contexto
interface PeriodActionPlansContextValue {
  periodActionPlans: PeriodActionPlansResponse;
  isFetchingPeriodsActionPlans: boolean;
  navigate: NavigateFunction;
  isNewPeriodActionPlanModalOpen: boolean;
  closeNewPeriodActionPlanModal(): void;
  openNewPeriodActionPlanModal(): void;
  efficiency: PersistanceEfficiency | null;
  periodId?: string;
  isEditPeriodActionPlanModalOpen: boolean;
  openEditPeriodActionPlanModal(periodActionPlan: PeriodActionPlan): void;
  closeEditPeriodActionPlanModal(): void;
  actionPlanBeingSeen: PeriodActionPlan | null;
}

// Criação do contexto
export const PeriodActionPlansContext = createContext(
  {} as PeriodActionPlansContextValue
);

export const PeriodActionPlansProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  //const { isFetchingOccurrences, occurrences } = useOccurrences();

  const { isFetchingPeriodsActionPlans, periodActionPlans } = usePeriodActionPlans();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { periodId } = useParams();

  const efficiency = state as PersistanceEfficiency;

  const [isNewPeriodActionPlanModalOpen, setIsNewPeriodActionPlanModalOpen] =
    useState<boolean>(!!efficiency && !!periodId);

  const [isEditPeriodActionPlanModalOpen, setIsEditPeriodActionPlanModalOpen] =
    useState(false);

  const [actionPlanBeingSeen, setActionPlanBeingSeen] = useState<PeriodActionPlan | null>(
    null
  );

  const closeNewPeriodActionPlanModal = useCallback(() => {
    setIsNewPeriodActionPlanModalOpen(false);
  }, []);

  const openNewPeriodActionPlanModal = useCallback(() => {
    setIsNewPeriodActionPlanModalOpen(true);
  }, []);

  const closeEditPeriodActionPlanModal = useCallback(() => {
    setIsEditPeriodActionPlanModalOpen(false);
  }, []);

  const openEditPeriodActionPlanModal = useCallback(
    (periodActionPlan: PeriodActionPlan) => {
      setIsEditPeriodActionPlanModalOpen(true);
      setActionPlanBeingSeen(periodActionPlan);
    },
    []
  );

  return (
    <PeriodActionPlansContext.Provider
      value={{
        actionPlanBeingSeen,
        isFetchingPeriodsActionPlans,
        periodActionPlans,
        navigate,
        closeNewPeriodActionPlanModal,
        isNewPeriodActionPlanModalOpen,
        openNewPeriodActionPlanModal,
        efficiency,
        periodId,
        isEditPeriodActionPlanModalOpen,
        closeEditPeriodActionPlanModal,
        openEditPeriodActionPlanModal,
      }}
    >
      {children}
    </PeriodActionPlansContext.Provider>
  );
};
