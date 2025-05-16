import { createContext, useEffect, useMemo, useState } from "react";
import React from "react";
import { useBillings } from "../../../../app/hooks/billings/useBillings";
import { BillingResponse } from "../../../../app/services/billingServices/getAll";
import { formatCurrency } from "../../../../app/utils/formatCurrency";
import { FilterType } from "../../../../app/entities/FilterType";
import { useFiltersContext } from "../../../../app/hooks/useFiltersContext";
import { formatCurrencyStringToNegativeNumber } from "@/app/utils/formatCurrencyStringToNegativeNumber";
import { useEfficienciesRigsAverage } from "@/app/hooks/efficiencies/useEfficienciesRigsAverage";
import { useBillingByRigId } from "@/app/hooks/billings/useBillingByRigId";
import { useEfficiencies } from "@/app/hooks/efficiencies/useEfficiencies";
import { getTotals, totalsInterface } from "@/app/utils/getTotals";
import { BillingByRigIdResponse } from "@/app/services/billingServices/getbyRigId";
import { EfficienciesResponse } from "@/app/services/efficienciesService/getAll";

interface BillingDashboardContextValue {
  billings: Array<BillingResponse>;
  totalAmount: number | string;
  totalGlossAmount: number | string;
  totalRepairAmount: number | string;
  totalUnbilledAmount: number | string;
  isFetchingBillings: boolean;
  averageEfficiency: number;
  totalCommerciallyStoppedAmount: number | string;
  handleApplyFilters(): void;
  handleCloseRigDetail: () => void;
  handleOpenRigDetail({
    rigId,
    rigName,
  }: {
    rigId: string;
    rigName: string;
  }): void;
  totals: totalsInterface;
  selectedRig: string | null;
  billing: BillingByRigIdResponse[];
  isFetchingBilling: boolean;
  isFetchingEfficiencies: boolean;
  efficiencies: EfficienciesResponse;
}

export const BillingDashboardContext = createContext(
  {} as BillingDashboardContextValue,
);

export const BillingDashboardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { filters, handleToggleFilterType, handleChangeRig } =
    useFiltersContext();

  const [selectedRig, setSelectedRig] = useState<string | null>(null);

  useEffect(() => {
    handleToggleFilterType(FilterType.CUSTOM);
  }, []);

  const handleOpenRigDetail = ({
    rigId,
    rigName,
  }: {
    rigId: string;
    rigName: string;
  }) => {
    handleChangeRig(rigId);
    setSelectedRig(rigName);
  };

  const handleCloseRigDetail = () => {
    setSelectedRig(null);
    handleChangeRig("");
  };

  const { billings, isFetchingBillings, refetchBillings } =
    useBillings(filters);
  const { billing, refetchBilling, isFetchingBilling } =
    useBillingByRigId(filters);

  const { efficiencies, refetchEffciencies, isFetchingEfficiencies } =
    useEfficiencies(filters);

  const handleApplyFilters = () => {
    refetchBilling();
    refetchEffciencies();
    refetchBillings();
  };

  useEffect(() => {
    refetchEffciencies();
    refetchBilling();
  }, [filters]);

  const { rigsAverage } = useEfficienciesRigsAverage(
    {
      startDate: filters.startDate,
      endDate: filters.endDate,
    },
    true,
  );

  const averageEfficiency = useMemo(() => {
    let total = 0;

    rigsAverage.forEach((average) => {
      total += average.avg;
    });

    const average = total / rigsAverage.length;

    const percentage = (average / 24) * 100;

    return percentage;
  }, [rigsAverage]);

  const {
    totalAmount,
    totalGlossAmount,
    totalRepairAmount,
    totalUnbilledAmount,
    totalCommerciallyStoppedAmount,
  } = useMemo(() => {
    let totalBillings = 0;
    let totalRepairUnbilled = 0;
    let totalGlossUnbilled = 0;
    let totalCommerciallyStoppedUnbilled = 0;

    billings.forEach(
      ({
        total,
        repairhouramount,
        glosshouramount,
        commerciallystoppedamount,
      }) => {
        totalBillings += total;
        totalGlossUnbilled += glosshouramount;

        if (commerciallystoppedamount) {
          totalCommerciallyStoppedUnbilled += commerciallystoppedamount;
        }

        if (repairhouramount) {
          totalRepairUnbilled += repairhouramount;
        }
      },
    );

    const totalAmount = formatCurrency(totalBillings);

    const totalRepairAmount = formatCurrencyStringToNegativeNumber(
      formatCurrency(totalRepairUnbilled),
    );
    const totalGlossAmount = formatCurrencyStringToNegativeNumber(
      formatCurrency(totalGlossUnbilled),
    );
    const totalCommerciallyStoppedAmount = formatCurrencyStringToNegativeNumber(
      formatCurrency(totalCommerciallyStoppedUnbilled),
    );
    const totalUnbilledAmount = formatCurrency(
      totalRepairUnbilled +
        totalGlossUnbilled +
        totalCommerciallyStoppedUnbilled,
    );

    return {
      totalAmount,
      totalRepairAmount,
      totalGlossAmount,
      totalUnbilledAmount,
      totalCommerciallyStoppedAmount,
    };
  }, [billings]);

  const totals = getTotals(efficiencies);

  //const isEmpty: boolean = billing.length === 0;

  //const totalAmount: number = isEmpty ? 0 : billing[0].total;

  return (
    <BillingDashboardContext.Provider
      value={{
        billings,
        billing,
        totalAmount,
        totalGlossAmount,
        totalRepairAmount,
        totalUnbilledAmount,
        isFetchingBillings,
        averageEfficiency,
        totalCommerciallyStoppedAmount,
        handleApplyFilters,
        handleOpenRigDetail,
        handleCloseRigDetail,
        selectedRig,
        totals,
        isFetchingBilling,
        isFetchingEfficiencies,
        efficiencies,
      }}
    >
      {children}
    </BillingDashboardContext.Provider>
  );
};
