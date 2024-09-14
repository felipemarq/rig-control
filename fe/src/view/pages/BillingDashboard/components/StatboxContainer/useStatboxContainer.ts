import {useBillingDashboard} from "../../BillingDashboardContext/useBillingDashboard";

export const useStatboxContainer = () => {
  const {
    totalAmount,
    totalGlossAmount,
    totalRepairAmount,
    totalUnbilledAmount,
    isFetchingBillings,
    averageEfficiency
  } = useBillingDashboard();

  return {
    totalAmount,
    totalGlossAmount,
    totalRepairAmount,
    isFetchingBillings,
    totalUnbilledAmount,
    averageEfficiency
  };
};
