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
  };
};
