import { formatNumberWithFixedDecimals } from "@/app/utils/formatNumberWithFixedDecimals";
import { useBillingDashboard } from "../../../../BillingDashboardContext/useBillingDashboard";
import { formatCurrency } from "@/app/utils/formatCurrency";

export const useBarChart = () => {
  const { billings } = useBillingDashboard();

  const data = billings.map(
    ({ rigname, total, repairhouramount, glosshouramount }) => {
      const fixedTotal = formatNumberWithFixedDecimals(total, 2);
      const fixedTotalLost = formatNumberWithFixedDecimals(
        repairhouramount ?? 0 + glosshouramount,
        2
      );
      return {
        rig: rigname,
        total: fixedTotal,
        totalLost: fixedTotalLost,
        totalLabel: formatCurrency(fixedTotal),
        totalLostLabel: formatCurrency(fixedTotalLost),
      };
    }
  );

  return {
    data,
  };
};
