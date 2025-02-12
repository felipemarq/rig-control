import { useDashboard } from "../../DashboardContext/useDashboard";

export const usePeriodDataGridModal = () => {
  const {
    handleOpenPeriodDataGridModal,
    handleClosePeriodDataGridModal,
    periodDataGridModalData,
    isPeriodDataGridModalOpen,
  } = useDashboard();

  return {
    handleOpenPeriodDataGridModal,
    handleClosePeriodDataGridModal,
    periodDataGridModalData,
    isPeriodDataGridModalOpen,
  };
};
