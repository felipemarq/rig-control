import { QueryKeys } from "@/app/config/QueryKeys";
import { useTheme } from "@/app/contexts/ThemeContext";
import { Checklist } from "@/app/entities/Checklist";
import { useChecklists } from "@/app/hooks/checklists/useChecklists";
import { useAuth } from "@/app/hooks/useAuth";
import { useFiltersContext } from "@/app/hooks/useFiltersContext";
import { checklistsService } from "@/app/services/checklistsService";
import { ChecklistsResponse } from "@/app/services/checklistsService/getAll";
import { customColorToast } from "@/app/utils/customColorToast";
import { treatAxiosError } from "@/app/utils/treatAxiosError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

import React, { createContext, useCallback, useState } from "react";

// Definição do tipo do contexto
interface ChecklistsContextValue {
  isNewChecklistModalOpen: boolean;
  openNewChecklistModal: () => void;
  closeNewChecklistModal: () => void;
  rigs: {
    id: string;
    name: string;
  }[];
  handleRefechChecklists: () => void;
  filteredChecklists: ChecklistsResponse;
  checklists: ChecklistsResponse;
  handleChangeSearchTerm: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchTerm: string;
  checklistBeingSeen: Checklist | null;
  isEditChecklistModalOpen: boolean;
  openEditChecklistModal(checklist: Checklist): void;
  closeEditChecklistModal(): void;
  isFetchingChecklists: boolean;
  handleCloseDeleteModal: () => void;
  handleOpenDeleteModal: (checklistId: string) => void;
  isDeleteModalOpen: boolean;
  isLoadingRemoveChecklist: boolean;
  handleDeleteChecklist: () => void;
  checklistIdBeingDeleted: string | null;
  isChecklistModalOpen: boolean;
  openChecklistModal(checklist: Checklist): void;
  closeChecklistModal(): void;
  statBoxContainerValues: {
    totalScore: number;
    totalInspections: number;
    totalEvaluations: number;
    totalCriticalEvaluations: number;
  };
  averages: {
    avgByCategories: {
      category: string;
      average: number;
    }[];
    avgByRig: {
      rigName: string;
      average: number;
    }[];
  };
  handleApplyFilters: () => void;
}

// Criação do contexto
export const ChecklistsContext = createContext({} as ChecklistsContextValue);

export const ChecklistsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  //const { isFetchingOccurrences, occurrences } = useOccurrences();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { selectedStartDate, selectedEndDate } = useFiltersContext();
  const { primaryColor } = useTheme();
  const { checklists, isFetchingChecklists, refetchChecklists } = useChecklists(
    {
      endDate: selectedEndDate,
      startDate: selectedStartDate,
    },
  );
  const userRigs =
    user?.rigs.map(({ rig: { id, name } }) => ({ id, name })) || [];
  const [isNewChecklistModalOpen, setIsNewChecklistModalOpen] = useState(false);
  const [isEditChecklistModalOpen, setIsEditChecklistModalOpen] =
    useState(false);
  const [checklistBeingSeen, setChecklistBeingSeen] =
    useState<Checklist | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [checklistIdBeingDeleted, setChecklistIdBeingDeleted] = useState<
    string | null
  >(null);
  const [isChecklistModalOpen, setIsChecklistModalOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredChecklists = checklists.filter((checklist) =>
    Object.values(checklist).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  );

  const statBoxContainerValues = checklists.reduce(
    (acc, checklist) => {
      acc.totalScore += checklist.score;
      acc.totalEvaluations += checklist.evaluations.length;
      acc.totalCriticalEvaluations += checklist.evaluations.filter(
        (evaluation) => evaluation.rating <= 0.5,
      ).length;
      return acc;
    },
    {
      totalScore: 0,
      totalInspections: checklists.length,
      totalEvaluations: 0,
      totalCriticalEvaluations: 0,
    },
  );

  const {
    isPending: isLoadingRemoveChecklist,
    mutateAsync: mutateRemoveChecklistAsync,
  } = useMutation({
    mutationFn: checklistsService.remove,
  });

  const averages = calculateAverages(checklists);

  function calculateAverages(data: ChecklistsResponse) {
    const categorySums: Record<string, { total: number; count: number }> = {};
    const rigSums: Record<string, { total: number; count: number }> = {};

    data.forEach(({ rig: { name: rigName }, evaluations, totalPoints }) => {
      if (!rigSums[rigName]) {
        rigSums[rigName] = { total: 0, count: 0 };
      }

      evaluations.forEach(({ checklistItem: { category }, rating }) => {
        if (!categorySums[category]) {
          categorySums[category] = { total: 0, count: 0 };
        }

        categorySums[category].total += rating;
        categorySums[category].count++;
      });

      rigSums[rigName].total += totalPoints;
      rigSums[rigName].count++;
    });

    const avgByCategories: {
      category: string;
      average: number;
    }[] = Object.entries(categorySums).map(([category, { total, count }]) => ({
      category,
      average: (total / count) * 100,
    }));

    const avgByRig: {
      rigName: string;
      average: number;
    }[] = Object.entries(rigSums).map(([rigName, { total, count }]) => ({
      rigName,
      average: total / count,
    }));

    return { avgByCategories, avgByRig };
  }

  const handleApplyFilters = () => {
    refetchChecklists();
  };

  const handleDeleteChecklist = async () => {
    try {
      if (checklistIdBeingDeleted) {
        await mutateRemoveChecklistAsync(checklistIdBeingDeleted);
      }
      handleCloseDeleteModal();
      customColorToast(
        "Registro deletado com Sucesso!",
        primaryColor,
        "success",
      );
      queryClient.invalidateQueries({ queryKey: [QueryKeys.CHECKLISTS] });
      refetchChecklists();
    } catch (error: any | typeof AxiosError) {
      treatAxiosError(error);
      console.log(error);
      //navigate("/dashboard");
    }
  };

  const handleChangeSearchTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setChecklistIdBeingDeleted(null);
  };

  const handleOpenDeleteModal = (checklistId: string) => {
    setIsDeleteModalOpen(true);
    setChecklistIdBeingDeleted(checklistId);
  };

  const openNewChecklistModal = () => {
    setIsNewChecklistModalOpen(true);
  };

  const handleRefechChecklists = () => {
    refetchChecklists();
  };

  const closeNewChecklistModal = () => {
    setIsNewChecklistModalOpen(false);
  };

  const closeEditChecklistModal = useCallback(() => {
    setIsEditChecklistModalOpen(false);
  }, []);

  const openEditChecklistModal = useCallback((checklist: Checklist) => {
    setIsEditChecklistModalOpen(true);
    setChecklistBeingSeen(checklist);
  }, []);

  const closeChecklistModal = useCallback(() => {
    setIsChecklistModalOpen(false);
  }, []);

  const openChecklistModal = useCallback((checklist: Checklist) => {
    setIsChecklistModalOpen(true);
    setChecklistBeingSeen(checklist);
  }, []);

  return (
    <ChecklistsContext.Provider
      value={{
        closeNewChecklistModal,
        openNewChecklistModal,
        isNewChecklistModalOpen,
        rigs: userRigs,
        handleRefechChecklists,
        filteredChecklists,
        handleChangeSearchTerm,
        searchTerm,
        openEditChecklistModal,
        closeEditChecklistModal,
        checklistBeingSeen,
        isEditChecklistModalOpen,
        isFetchingChecklists,
        handleCloseDeleteModal,
        handleOpenDeleteModal,
        isDeleteModalOpen,
        handleDeleteChecklist,
        isLoadingRemoveChecklist,
        checklistIdBeingDeleted,
        isChecklistModalOpen,
        closeChecklistModal,
        openChecklistModal,
        statBoxContainerValues,
        checklists,
        handleApplyFilters,
        averages,
      }}
    >
      {children}
    </ChecklistsContext.Provider>
  );
};
