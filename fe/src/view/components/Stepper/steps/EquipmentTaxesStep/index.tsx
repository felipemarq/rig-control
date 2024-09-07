import { Label } from "@radix-ui/react-label";
import { Controller, useFormContext } from "react-hook-form";
import {
  StepHeader,
  StepperFooter,
  StepperNextButton,
  StepperPreviousButton,
} from "../..";
import { Input } from "@/components/ui/input";
import { useStepper } from "../../useStepper";
import { FormData } from "../../../../pages/BillingConfiguration";
import { TaxInput } from "@/view/components/TaxInput";
import { InputCurrency } from "@/view/components/InputCurrency";

export function EquipmentTaxesStep() {
  const { nextStep } = useStepper();
  const form = useFormContext<FormData>();

  async function handleNextStep() {
    const isValid = await form.trigger("equipmentTaxesStep", {
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
        <TaxInput title="Taxa de Locação BOP (hora)" label="R$">
          <Controller
            control={form.control}
            name="equipmentTaxesStep.bobRentTax"
            render={({ field: { onChange, value } }) => (
              <InputCurrency
                onChange={onChange}
                value={value}
                error={
                  form.formState.errors.equipmentTaxesStep?.bobRentTax?.message
                }
              />
            )}
          />
        </TaxInput>

        <TaxInput title="Combustível Gerador (diária)" label="R$">
          <Controller
            control={form.control}
            name="equipmentTaxesStep.generatorFuelTax"
            render={({ field: { onChange, value } }) => (
              <InputCurrency
                onChange={onChange}
                value={value}
                error={
                  form.formState.errors.equipmentTaxesStep?.generatorFuelTax
                    ?.message
                }
              />
            )}
          />
        </TaxInput>

        <TaxInput title="Taxa de Trailer Extra" label="R$">
          <Controller
            control={form.control}
            name="equipmentTaxesStep.extraTrailerTax"
            render={({ field: { onChange, value } }) => (
              <InputCurrency
                onChange={onChange}
                value={value}
                error={
                  form.formState.errors.equipmentTaxesStep?.extraTrailerTax
                    ?.message
                }
              />
            )}
          />
        </TaxInput>
        <TaxInput title="Taxa de Locação de Munck" label="R$">
          <Controller
            control={form.control}
            name="equipmentTaxesStep.munckTax"
            render={({ field: { onChange, value } }) => (
              <InputCurrency
                onChange={onChange}
                value={value}
                error={
                  form.formState.errors.equipmentTaxesStep?.munckTax?.message
                }
              />
            )}
          />
        </TaxInput>

        <TaxInput title="Taxa de Locação de Power Swivel" label="R$">
          <Controller
            control={form.control}
            name="equipmentTaxesStep.powerSwivelTax"
            render={({ field: { onChange, value } }) => (
              <InputCurrency
                onChange={onChange}
                value={value}
                error={
                  form.formState.errors.equipmentTaxesStep?.powerSwivelTax
                    ?.message
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
