import { Header } from "@/view/components/Header";
import { TaxesContainer } from "./TaxesContainer";
import TaxesDetails from "./TaxesDetails";
import { useBillingConfiguration } from "./useBillingConfiguration";
import { FormProvider } from "react-hook-form";
import { Stepper } from "@/view/components/Stepper";
import { PeriodAndTaxesStep } from "@/view/components/Stepper/steps/PeriodAndTaxesStep";
import { MobilizationTaxesStep } from "@/view/components/Stepper/steps/MobilizationTaxesStep";
import { TruckTaxesStep } from "@/view/components/Stepper/steps/TruckTaxesStep";
import { EquipmentTaxesStep } from "@/view/components/Stepper/steps/EquipmentTaxesStep";
import { TankMixTaxesStep } from "@/view/components/Stepper/steps/TankMixTaxesStep";
import SuspenseFallback from "@/view/components/SuspenseFallback";

const BillingConfiguration = () => {
  const {
    billingConfigs,
    handleConfigBeingSeen,
    configBeingSeen,
    handleCloseConfigBeingSeen,
    form,
    handleSubmit,
    handleChangeIsEditingConfig,
    isEditingConfig,
    isFetchingbillingConfigs,
  } = useBillingConfiguration();
  return (
    <div className="overflow-y-auto w-full">
      <Header
        displayRig={false}
        displayPeriodRange={false}
        title={`Cálculo de previsão de faturamento da sonda`}
      ></Header>
      {isFetchingbillingConfigs && <SuspenseFallback />}
      {!isFetchingbillingConfigs && (
        <div>
          {!configBeingSeen && (
            <TaxesContainer
              billingConfigs={billingConfigs}
              handleConfigBeingSeen={handleConfigBeingSeen}
            />
          )}
          {configBeingSeen && !isEditingConfig && (
            <TaxesDetails
              configBeingSeen={configBeingSeen}
              onClose={handleCloseConfigBeingSeen}
              onEdit={handleChangeIsEditingConfig}
            />
          )}

          {configBeingSeen && isEditingConfig && (
            <div className="min-h-fit flex justify-center py-10  w-full mb-10 ">
              <FormProvider {...form}>
                <form
                  onSubmit={handleSubmit}
                  className="w-1/2  rounded-xl border bg-card text-card-foreground shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] p-2 pt-10 "
                >
                  <Stepper
                    steps={[
                      {
                        label: "Taxas de operação",
                        content: <PeriodAndTaxesStep />,
                      },
                      {
                        label: "Taxas de movimentação",
                        content: <MobilizationTaxesStep />,
                      },
                      {
                        label: "Taxas de Caminhão",
                        content: <TruckTaxesStep />,
                      },
                      {
                        label: "Taxas de Equipamento",
                        content: <EquipmentTaxesStep />,
                      },
                      {
                        label: "Taxas de Tanque Mix",
                        content: <TankMixTaxesStep />,
                      },
                    ]}
                  />
                </form>
              </FormProvider>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BillingConfiguration;
