import { useDetails } from "../DetailsContext/useDetailsContext";

export const usePeriodsDataGrid = () => {
  const {
    isFetchingEfficiency,
    efficiency,
    canUserEdit,
    openDeleteModal,
    handleUpdateEfficiency,
    isLoadingUpdateEfficiency,
    efficiencyId,
    windowWidth,
    openDetailModal,
    handleExcelDownload,
    state,
  } = useDetails();
  return {
    isFetchingEfficiency,
    efficiency,
    canUserEdit,
    openDeleteModal,
    handleUpdateEfficiency,
    isLoadingUpdateEfficiency,
    efficiencyId,
    windowWidth,
    openDetailModal,
    handleExcelDownload,
    state,
  };
};
