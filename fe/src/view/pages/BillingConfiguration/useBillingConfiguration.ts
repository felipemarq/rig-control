import { useBillingConfigByRigId } from "@/app/hooks/billingConfigs/useBillingConfigByRigId";
import { BillingConfigResponse } from "@/app/services/billingConfigServices/getAll";
import { useState } from "react";
import { useParams } from "react-router-dom";

export const useBillingConfiguration = () => {
  const { rigId } = useParams<{ rigId: string }>();
  const [configBeingSeen, setConfigBeingSeen] = useState<BillingConfigResponse | null>(
    null
  );

  if (typeof rigId === "undefined") {
    // Trate o erro de acordo com a necessidade do seu aplicativo
    // Pode ser um redirecionamento, um erro lançado, ou até mesmo um log.
    throw new Error("rigId is undefined");
  }

  const { billingConfigs } = useBillingConfigByRigId(rigId);

  const handleConfigBeingSeen = (billingConfig: BillingConfigResponse) => {
    setConfigBeingSeen(billingConfig);
  };

  const handleCloseConfigBeingSeen = () => {
    setConfigBeingSeen(null);
  };

  return {
    billingConfigs,
    configBeingSeen,
    handleConfigBeingSeen,
    handleCloseConfigBeingSeen,
  };
};
