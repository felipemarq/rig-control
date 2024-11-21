import { Header } from "@/view/components/Header";
import { TaxesContainer } from "./TaxesContainer";
import TaxesDetails from "./TaxesDetails";
import { useBillingConfiguration } from "./useBillingConfiguration";

const BillingConfiguration = () => {
  const {
    billingConfigs,
    handleConfigBeingSeen,
    configBeingSeen,
    handleCloseConfigBeingSeen,
  } = useBillingConfiguration();
  return (
    <div className="overflow-y-auto w-full">
      <Header
        displayRig={false}
        displayPeriodRange={false}
        title={`Cálculo de previsão de faturamento da sonda`}
      ></Header>
      <div>
        {!configBeingSeen && (
          <TaxesContainer
            billingConfigs={billingConfigs}
            handleConfigBeingSeen={handleConfigBeingSeen}
          />
        )}
        {configBeingSeen && (
          <TaxesDetails
            configBeingSeen={configBeingSeen}
            onClose={handleCloseConfigBeingSeen}
          />
        )}
      </div>
    </div>
  );
};

export default BillingConfiguration;
