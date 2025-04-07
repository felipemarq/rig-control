import { PeriodActionPlan } from "@/app/entities/PeriodActionPlan";
import { PersistanceEfficiency } from "@/app/entities/PersistanceEfficiency";
import { User } from "@/app/entities/User";
import { usePeriodActionPlans } from "@/app/hooks/periodActionPlans/usePeriodActionPlans";
import { useAuth } from "@/app/hooks/useAuth";
import { PeriodActionPlansResponse } from "@/app/services/periodActionPlanServices/getAll";
import React, { createContext, useCallback, useMemo, useState } from "react";
import {
  NavigateFunction,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

type DashboardIndicators = {
  totalPeriods: number;
  totalActionPlans: number;
  completedActionPlans: number;
  pendingActionPlans: number;
  completionRate: number;
  averageExecutionTime: number;
  averageRepairDuration: number;
  efficiencyPerPeriod: Record<string, number>;
  actionPlansPerRig: Record<string, number>;
  actionPlansPerUser: Record<string, number>;
  periodClassifications: Record<string, number>;
  repairClassifications: Record<string, number>;
};

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
  handleRefechPeriodsActionPlans: () => void;
  user: User | undefined;
  canUserFinishPeriodActionPlan: boolean;
  dashboardIndicators: DashboardIndicators;
}

// Criação do contexto
export const PeriodActionPlansContext = createContext(
  {} as PeriodActionPlansContextValue,
);

export const PeriodActionPlansProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  //const { isFetchingOccurrences, occurrences } = useOccurrences();

  const {
    isFetchingPeriodsActionPlans,
    periodActionPlans,
    refetchPeriodsActionPlans,
  } = usePeriodActionPlans();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { periodId } = useParams();
  const { user } = useAuth();

  const canUserFinishPeriodActionPlan =
    user?.email === "luizrangel@conterp.com.br" ||
    user?.email === "uilliamsena@conterp.com.br" ||
    user?.email === "alanfelipe@conterp.com.br" ||
    user?.email === "felipemarques@conterp.com.br";

  const efficiency = state as PersistanceEfficiency;

  const [isNewPeriodActionPlanModalOpen, setIsNewPeriodActionPlanModalOpen] =
    useState<boolean>(!!efficiency && !!periodId);

  const [isEditPeriodActionPlanModalOpen, setIsEditPeriodActionPlanModalOpen] =
    useState(false);

  const [actionPlanBeingSeen, setActionPlanBeingSeen] =
    useState<PeriodActionPlan | null>(null);

  const handleRefechPeriodsActionPlans = useCallback(() => {
    refetchPeriodsActionPlans();
  }, []);

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
    [],
  );

  const dashboardIndicators: DashboardIndicators =
    useMemo<DashboardIndicators>(() => {
      const totalPeriods = new Set(periodActionPlans.map((d) => d.period.id))
        .size;
      const totalActionPlans = periodActionPlans.length;
      const completedActionPlans = periodActionPlans.filter(
        (d) => d.isFinished,
      ).length;
      const pendingActionPlans = totalActionPlans - completedActionPlans;
      const completionRate =
        (completedActionPlans / totalActionPlans) * 100 || 0;

      const executionTimes = periodActionPlans
        .filter((d) => d.isFinished)
        .map(
          (d) =>
            new Date(d.finishedAt!).getTime() - new Date(d.createdAt).getTime(),
        );

      const averageExecutionTime = executionTimes.length
        ? executionTimes.reduce((a, b) => a + b, 0) / executionTimes.length
        : 0;

      const periodDurations = periodActionPlans.map((d) => {
        const start = new Date(d.period.startHour).getTime();
        const end = new Date(d.period.endHour).getTime();
        return end - start;
      });
      const averageRepairDuration =
        periodDurations.reduce((a, b) => a + b, 0) / periodDurations.length;

      const efficiencyPerPeriod: Record<string, number> = {};
      periodActionPlans.forEach((d) => {
        efficiencyPerPeriod[d.period.efficiencyId] =
          (efficiencyPerPeriod[d.period.efficiencyId] || 0) + 1;
      });

      const actionPlansPerRig: Record<string, number> = {};
      periodActionPlans.forEach((d) => {
        actionPlansPerRig[d.rig.name] =
          (actionPlansPerRig[d.rig.name] || 0) + 1;
      });

      const actionPlansPerUser: Record<string, number> = {};
      periodActionPlans.forEach((d) => {
        actionPlansPerUser[d.userId] = (actionPlansPerUser[d.userId] || 0) + 1;
      });

      const periodClassifications: Record<string, number> = {};
      periodActionPlans.forEach((d) => {
        periodClassifications[d.period.classification] =
          (periodClassifications[d.period.classification] || 0) + 1;
      });

      const repairClassifications: Record<string, number> = {};
      periodActionPlans.forEach((d) => {
        if (d.period.repairClassification) {
          repairClassifications[d.period.repairClassification] =
            (repairClassifications[d.period.repairClassification] || 0) + 1;
        }
      });

      return {
        totalPeriods,
        totalActionPlans,
        completedActionPlans,
        pendingActionPlans,
        completionRate,
        averageExecutionTime,
        averageRepairDuration: averageRepairDuration / 1000 / 60 / 60,
        efficiencyPerPeriod,
        actionPlansPerRig,
        actionPlansPerUser,
        periodClassifications,
        repairClassifications,
      };
    }, [periodActionPlans]);

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
        handleRefechPeriodsActionPlans,
        user,
        canUserFinishPeriodActionPlan,
        dashboardIndicators,
      }}
    >
      {children}
    </PeriodActionPlansContext.Provider>
  );
};
