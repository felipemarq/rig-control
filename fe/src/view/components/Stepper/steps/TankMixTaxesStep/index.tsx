import { Controller, useFormContext } from "react-hook-form";
import { StepHeader, StepperFooter, StepperPreviousButton } from "../..";
import { Button } from "@/components/ui/button";

import { TaxInput } from "@/view/components/TaxInput";
import { InputCurrency } from "@/view/components/InputCurrency";
import { FormData } from "@/view/pages/CreateBillingConfiguration/useCreateBillingConfiguration";

export function TankMixTaxesStep() {
  const form = useFormContext<FormData>();

  return (
    <div>
      <StepHeader
        title="Taxas de Tanque Mix"
        description="Informe as taxas aplicáveis ao uso de Tanque Mix."
      />

      <div className="flex flex-col justify-center items-center gap-4">
        <TaxInput title="Taxa de Locação de Tanque Mix (mensal)" label="R$">
          <Controller
            control={form.control}
            name="tankMixTaxesStep.mixTankMonthRentTax"
            render={({ field: { onChange, value } }) => (
              <InputCurrency
                onChange={onChange}
                value={value}
                error={
                  form.formState.errors.tankMixTaxesStep?.mixTankMonthRentTax
                    ?.message
                }
              />
            )}
          />
        </TaxInput>

        <TaxInput title="Taxa de Locação de Tanque Mix (horas)" label="R$">
          <Controller
            control={form.control}
            name="tankMixTaxesStep.mixTankHourRentTax"
            render={({ field: { onChange, value } }) => (
              <InputCurrency
                onChange={onChange}
                value={value}
                error={
                  form.formState.errors.tankMixTaxesStep?.mixTankHourRentTax
                    ?.message
                }
              />
            )}
          />
        </TaxInput>

        <TaxInput title="Taxa de mobilização de Tanque Mix" label="R$">
          <Controller
            control={form.control}
            name="tankMixTaxesStep.mixTankMobilizationTax"
            render={({ field: { onChange, value } }) => (
              <InputCurrency
                onChange={onChange}
                value={value}
                error={
                  form.formState.errors.tankMixTaxesStep?.mixTankMobilizationTax
                    ?.message
                }
              />
            )}
          />
        </TaxInput>

        <TaxInput title="Taxa de desmobilização de Tanque Mix" label="R$">
          <Controller
            control={form.control}
            name="tankMixTaxesStep.mixTankDemobilizationTax"
            render={({ field: { onChange, value } }) => (
              <InputCurrency
                onChange={onChange}
                value={value}
                error={
                  form.formState.errors.tankMixTaxesStep
                    ?.mixTankDemobilizationTax?.message
                }
              />
            )}
          />
        </TaxInput>

        <TaxInput title="Taxa de DTM de Tanque Mix" label="R$">
          <Controller
            control={form.control}
            name="tankMixTaxesStep.mixTankDtmTax"
            render={({ field: { onChange, value } }) => (
              <InputCurrency
                onChange={onChange}
                value={value}
                error={
                  form.formState.errors.tankMixTaxesStep?.mixTankDtmTax?.message
                }
              />
            )}
          />
        </TaxInput>

        <TaxInput title="Taxa de Operadores de Tanque Mix" label="R$">
          <Controller
            control={form.control}
            name="tankMixTaxesStep.mixTankOperatorTax"
            render={({ field: { onChange, value } }) => (
              <InputCurrency
                onChange={onChange}
                value={value}
                error={
                  form.formState.errors.tankMixTaxesStep?.mixTankOperatorTax
                    ?.message
                }
              />
            )}
          />
        </TaxInput>
      </div>

      <StepperFooter>
        <StepperPreviousButton disabled={form.formState.isSubmitting} />
        <Button disabled={form.formState.isSubmitting} type="submit" size="sm">
          Finalizar
        </Button>
      </StepperFooter>
    </div>
  );
}
