import { Controller, useFormContext } from "react-hook-form";
import {
  StepHeader,
  StepperFooter,
  StepperNextButton,
  StepperPreviousButton,
} from "../..";
import { useStepper } from "../../useStepper";
import { FormData } from "../../../../pages/BillingConfiguration";
import { TaxInput } from "@/view/components/TaxInput";
import { InputCurrency } from "@/view/components/InputCurrency";

export function TruckTaxesStep() {
  const { nextStep } = useStepper();
  const form = useFormContext<FormData>();

  async function handleNextStep() {
    const isValid = await form.trigger("truckTaxesStep", {
      shouldFocus: true,
    });

    if (isValid) {
      nextStep();
    }
  }

  return (
    <div>
      <StepHeader
        title="Taxas de Caminhão"
        description="Informe as taxas aplicáveis ao uso de caminhões."
      />

      <div className="flex flex-col justify-center items-center gap-4">
        <TaxInput
          title="Taxa de Locação Caminhão + Carreta (mensal) "
          label="R$"
        >
          <Controller
            control={form.control}
            name="truckTaxesStep.truckCartRentTax"
            render={({ field: { onChange, value } }) => (
              <InputCurrency
                onChange={onChange}
                value={value}
                error={
                  form.formState.errors.truckTaxesStep?.truckCartRentTax
                    ?.message
                }
              />
            )}
          />
        </TaxInput>

        <TaxInput
          title="Taxa de Locação Caminhão + Tanque (mensal) "
          label="R$"
        >
          <Controller
            control={form.control}
            name="truckTaxesStep.truckTankTax"
            render={({ field: { onChange, value } }) => (
              <InputCurrency
                onChange={onChange}
                value={value}
                error={
                  form.formState.errors.truckTaxesStep?.truckTankTax?.message
                }
              />
            )}
          />
        </TaxInput>

        <TaxInput title="Taxa de Caminhão (km)" label="R$">
          <Controller
            control={form.control}
            name="truckTaxesStep.truckKmTax"
            render={({ field: { onChange, value } }) => (
              <InputCurrency
                onChange={onChange}
                value={value}
                error={
                  form.formState.errors.truckTaxesStep?.truckKmTax?.message
                }
              />
            )}
          />
        </TaxInput>

        <TaxInput title="Taxa de Caminhão Sugador (diária)" label="R$">
          <Controller
            control={form.control}
            name="truckTaxesStep.suckingTruckTax"
            render={({ field: { onChange, value } }) => (
              <InputCurrency
                onChange={onChange}
                value={value}
                error={
                  form.formState.errors.truckTaxesStep?.suckingTruckTax?.message
                }
              />
            )}
          />
        </TaxInput>

        <TaxInput title="Taxa de Árvore de Natal (hora)" label="R$">
          <Controller
            control={form.control}
            name="truckTaxesStep.christmasTreeDisassemblyTax"
            render={({ field: { onChange, value } }) => (
              <InputCurrency
                onChange={onChange}
                value={value}
                error={
                  form.formState.errors.truckTaxesStep
                    ?.christmasTreeDisassemblyTax?.message
                }
              />
            )}
          />
        </TaxInput>
      </div>

      <StepperFooter>
        <StepperPreviousButton />
        <StepperNextButton onClick={handleNextStep} />
      </StepperFooter>
    </div>
  );
}
