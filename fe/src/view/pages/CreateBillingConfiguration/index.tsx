import { FormProvider } from "react-hook-form";
import { Stepper } from "../../components/Stepper";
import { PeriodAndTaxesStep } from "../../components/Stepper/steps/PeriodAndTaxesStep";
import { MobilizationTaxesStep } from "../../components/Stepper/steps/MobilizationTaxesStep";
import { TankMixTaxesStep } from "../../components/Stepper/steps/TankMixTaxesStep";
import { TruckTaxesStep } from "../../components/Stepper/steps/TruckTaxesStep";
import { EquipmentTaxesStep } from "../../components/Stepper/steps/EquipmentTaxesStep";
import { useCreateBillingConfiguration } from "./useCreateBillingConfiguration";

export default function CreateBillingConfiguration() {
  const { form, handleSubmit } = useCreateBillingConfiguration();

  return (
    <div className="w-full h-full overflow-y-scroll">
      <div className="min-h-fit flex justify-center py-10  w-full mb-10">
        <FormProvider {...form}>
          <form onSubmit={handleSubmit} className="w-2/5  rounded-xl border bg-card text-card-foreground shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] p-2 pt-10 ">
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
    </div>
  );
}
