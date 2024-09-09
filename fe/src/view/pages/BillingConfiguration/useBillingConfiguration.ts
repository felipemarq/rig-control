import { useBillingConfigByRigId } from "@/app/hooks/billingConfigs/useBillingConfigByRigId";
import { useParams } from "react-router-dom";

export const useBillingConfiguration = () => {
  const { rigId } = useParams<{ rigId: string }>();

  if (typeof rigId === "undefined") {
    // Trate o erro de acordo com a necessidade do seu aplicativo
    // Pode ser um redirecionamento, um erro lançado, ou até mesmo um log.
    throw new Error("rigId is undefined");
  }

  const { billingConfigs } = useBillingConfigByRigId(rigId);

  console.log("billingConfigs", JSON.stringify(billingConfigs));
  return {
    billingConfigs,
  };
};
