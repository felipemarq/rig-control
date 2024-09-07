import { useContext } from "react";
import { BillingConfigurationContext } from ".";

export const useBillingConfiguration = () => {
  return useContext(BillingConfigurationContext);
};
