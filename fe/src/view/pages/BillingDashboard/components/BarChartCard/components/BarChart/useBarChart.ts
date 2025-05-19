import { formatNumberWithFixedDecimals } from "@/app/utils/formatNumberWithFixedDecimals";
import { useBillingDashboard } from "../../../../BillingDashboardContext/useBillingDashboard";
import { formatCurrency } from "@/app/utils/formatCurrency";

export const useBarChart = () => {
  const { billings, handleOpenRigDetail } = useBillingDashboard();

  const data = billings.map(
    ({
      rigid,
      rigname,
      total,
      repairhouramount,
      glosshouramount,
      unbilledscheduledstopamount,
      commerciallystoppedamount,
    }) => {
      const fixedTotal = formatNumberWithFixedDecimals(total, 2);
      const totalRepair = repairhouramount ?? 0;
      const fixedTotalLost = formatNumberWithFixedDecimals(
        totalRepair +
          glosshouramount +
          unbilledscheduledstopamount +
          commerciallystoppedamount,
        2,
      );
      return {
        rigId: rigid,
        rig: rigname,
        total: fixedTotal,
        totalLost: fixedTotalLost,
        totalLabel: formatCurrency(fixedTotal),
        totalLostLabel: formatCurrency(fixedTotalLost),
      };
    },
  );

  return {
    data,
    handleOpenRigDetail,
  };
};
