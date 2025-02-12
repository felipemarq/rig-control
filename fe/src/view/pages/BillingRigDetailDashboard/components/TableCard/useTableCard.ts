import { useBillingRigDetailDashboard } from "../../BillingRigDetailDashboardContext/useBillingDashboard";

export const useTableCard = () => {
  const { billing } = useBillingRigDetailDashboard();

  return { billing };
};
