import { useBillingDashboard } from "../../../../BillingDashboardContext/useBillingDashboard";

export const useBarChart = () => {
  const { billings } = useBillingDashboard();

  const data = billings.map(
    ({ rigname, total, repairhouramount, glosshouramount }) => {
      return {
        rig: rigname,
        total: total,
        totalLost: repairhouramount ?? 0 + glosshouramount,
      };
    }
  );

  console.log("Chart Data", data);
  return {
    data,
  };
};
