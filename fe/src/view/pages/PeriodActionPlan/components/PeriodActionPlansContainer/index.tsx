import { Spinner } from "@/view/components/Spinner";
import { usePeriodActionPlansContainer } from "./usePeriodActionPlansContainer";
import { PeriodActionPlanItem } from "./PeriodActionPlanItem";
import { DeleteModal } from "@/view/components/DeleteModal";
import { NotFound } from "@/view/components/NotFound";

export const PeriodActionPlansContainer = () => {
  const {
    isFetchingPeriodsActionPlans,
    periodActionPlans,
    openEditPeriodActionPlanModal,
    isDeletePeriodActionPlanModalOpen,
    periodActionPlanBeingDeleted,
    handleDeletePeriodActionPlan,
    isLoadingDeletePeriodActionPlan,
    closeDeletePeriodActionPlanModal,
    openDeletePeriodActionPlanModal,
  } = usePeriodActionPlansContainer();

  if (isDeletePeriodActionPlanModalOpen || periodActionPlanBeingDeleted) {
    return (
      <DeleteModal
        title="Excluir Plano de Ação"
        description="Você tem certeza que deseja excluir este plano de ação?"
        onConfirm={handleDeletePeriodActionPlan}
        isLoading={isLoadingDeletePeriodActionPlan}
        onClose={closeDeletePeriodActionPlanModal}
        open={isDeletePeriodActionPlanModalOpen}
      />
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {isFetchingPeriodsActionPlans && <Spinner />}
      {!isFetchingPeriodsActionPlans && (
        <>
          {" "}
          {periodActionPlans.map((plan) => (
            <PeriodActionPlanItem
              key={plan.id}
              onDelete={() => openDeletePeriodActionPlanModal(plan.id)}
              actionPlan={plan}
              onEdit={openEditPeriodActionPlanModal}
            />
          ))}
        </>
      )}

      {!isFetchingPeriodsActionPlans && periodActionPlans.length === 0 && (
        <div className="col-span-3 my-16">
          <NotFound>
            <strong>Não</strong> existem dados para o <strong>período</strong>{" "}
            selecionado!
          </NotFound>
        </div>
      )}
    </div>
  );
};
