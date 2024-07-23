import { Modal } from "@/view/components/Modal";
import { usePeriodDataGridModal } from "./usePeriodDataGridModal";
import { PeriodsDataGrid } from "./PeriodDataGrid";

export const PeriodDataGridModal = () => {
  const {
    handleClosePeriodDataGridModal,
    periodDataGridModalData,
    isPeriodDataGridModalOpen,
  } = usePeriodDataGridModal();
  return (
    <Modal
      maxWidth="1200px"
      open={isPeriodDataGridModalOpen}
      title="Períodos"
      onClose={handleClosePeriodDataGridModal}
    >
      <PeriodsDataGrid periods={periodDataGridModalData!} />
    </Modal>
  );
};
