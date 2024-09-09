import { Controller, useFormContext } from "react-hook-form";
import {
  StepHeader,
  StepperFooter,
  StepperNextButton,
  StepperPreviousButton,
} from "../..";
import { useStepper } from "../../useStepper";
import { TaxInput } from "@/view/components/TaxInput";
import { InputCurrency } from "@/view/components/InputCurrency";
import { FormData } from "@/view/pages/CreateBillingConfiguration/useCreateBillingConfiguration";

export function MobilizationTaxesStep() {
  const { nextStep } = useStepper();
  const form = useFormContext<FormData>();

  async function handleNextStep() {
    const isValid = await form.trigger("mobilizationTaxesStep", {
      shouldFocus: true,
    });

    if (isValid) {
      nextStep();
    }
  }

  return (
    <div>
      <StepHeader
        title="Taxas de Movimentação"
        description="Defina as taxas aplicadas durante a movimentação da sonda."
      />

      <div className="flex flex-col justify-center items-center gap-4">
        <TaxInput title="Taxa DTM (hora)" label="R$">
          <Controller
            control={form.control}
            name="mobilizationTaxesStep.dtmHourTax"
            render={({ field: { onChange, value } }) => (
              <InputCurrency
                onChange={onChange}
                value={value}
                error={
                  form.formState.errors.mobilizationTaxesStep?.dtmHourTax
                    ?.message
                }
              />
            )}
          />
        </TaxInput>

        <TaxInput title="Taxa DTM (menor que 20Km)" label="R$">
          <Controller
            control={form.control}
            name="mobilizationTaxesStep.dtmLt20Tax"
            render={({ field: { onChange, value } }) => (
              <InputCurrency
                onChange={onChange}
                value={value}
                error={
                  form.formState.errors.mobilizationTaxesStep?.dtmLt20Tax
                    ?.message
                }
              />
            )}
          />
        </TaxInput>

        <TaxInput title="Taxa DTM (entre 20km e 50Km)" label="R$">
          <Controller
            control={form.control}
            name="mobilizationTaxesStep.dtmBt20And50Tax"
            render={({ field: { onChange, value } }) => (
              <InputCurrency
                onChange={onChange}
                value={value}
                error={
                  form.formState.errors.mobilizationTaxesStep?.dtmBt20And50Tax
                    ?.message
                }
              />
            )}
          />
        </TaxInput>

        <TaxInput title="Taxa DTM (maior que 50km)" label="R$">
          <Controller
            control={form.control}
            name="mobilizationTaxesStep.dtmGt50Tax"
            render={({ field: { onChange, value } }) => (
              <InputCurrency
                onChange={onChange}
                value={value}
                error={
                  form.formState.errors.mobilizationTaxesStep?.dtmGt50Tax
                    ?.message
                }
              />
            )}
          />
        </TaxInput>

        <TaxInput title="Taxa Equipamento (menor que 20Km)" label="R$">
          <Controller
            control={form.control}
            name="mobilizationTaxesStep.equipmentRatioLt20Tax"
            render={({ field: { onChange, value } }) => (
              <InputCurrency
                onChange={onChange}
                value={value}
                error={
                  form.formState.errors.mobilizationTaxesStep
                    ?.equipmentRatioLt20Tax?.message
                }
              />
            )}
          />
        </TaxInput>

        <TaxInput title="Taxa Equipamento (entre 20km e 50Km)" label="R$">
          <Controller
            control={form.control}
            name="mobilizationTaxesStep.equipmentRatioBt20And50Tax"
            render={({ field: { onChange, value } }) => (
              <InputCurrency
                onChange={onChange}
                value={value}
                error={
                  form.formState.errors.mobilizationTaxesStep
                    ?.equipmentRatioBt20And50Tax?.message
                }
              />
            )}
          />
        </TaxInput>

        <TaxInput title="Taxa Equipamento (maior que 50km)" label="R$">
          <Controller
            control={form.control}
            name="mobilizationTaxesStep.equipmentRatioGt50Tax"
            render={({ field: { onChange, value } }) => (
              <InputCurrency
                onChange={onChange}
                value={value}
                error={
                  form.formState.errors.mobilizationTaxesStep
                    ?.equipmentRatioGt50Tax?.message
                }
              />
            )}
          />
        </TaxInput>

        <TaxInput title="Taxa Flúido (menor que 20Km)" label="R$">
          <Controller
            control={form.control}
            name="mobilizationTaxesStep.fluidRatioLt20Tax"
            render={({ field: { onChange, value } }) => (
              <InputCurrency
                onChange={onChange}
                value={value}
                error={
                  form.formState.errors.mobilizationTaxesStep?.fluidRatioLt20Tax
                    ?.message
                }
              />
            )}
          />
        </TaxInput>

        <TaxInput title="Taxa Flúido (entre 20km e 50Km)" label="R$">
          <Controller
            control={form.control}
            name="mobilizationTaxesStep.fluidRatioBt20And50Tax"
            render={({ field: { onChange, value } }) => (
              <InputCurrency
                onChange={onChange}
                value={value}
                error={
                  form.formState.errors.mobilizationTaxesStep
                    ?.fluidRatioBt20And50Tax?.message
                }
              />
            )}
          />
        </TaxInput>

        <TaxInput title="Taxa Flúido (maior que 50km)" label="R$">
          <Controller
            control={form.control}
            name="mobilizationTaxesStep.fluidRatioGt50Tax"
            render={({ field: { onChange, value } }) => (
              <InputCurrency
                onChange={onChange}
                value={value}
                error={
                  form.formState.errors.mobilizationTaxesStep?.fluidRatioGt50Tax
                    ?.message
                }
              />
            )}
          />
        </TaxInput>

        <TaxInput title="Taxa de Mobilização" label="R$">
          <Controller
            control={form.control}
            name="mobilizationTaxesStep.mobilization"
            render={({ field: { onChange, value } }) => (
              <InputCurrency
                onChange={onChange}
                value={value}
                error={
                  form.formState.errors.mobilizationTaxesStep?.mobilization
                    ?.message
                }
              />
            )}
          />
        </TaxInput>

        <TaxInput title="Taxa de Desmobilização" label="R$">
          <Controller
            control={form.control}
            name="mobilizationTaxesStep.demobilization"
            render={({ field: { onChange, value } }) => (
              <InputCurrency
                onChange={onChange}
                value={value}
                error={
                  form.formState.errors.mobilizationTaxesStep?.demobilization
                    ?.message
                }
              />
            )}
          />
        </TaxInput>
        <TaxInput title="Taxa de Transporte" label="R$">
          <Controller
            control={form.control}
            name="mobilizationTaxesStep.transportationTax"
            render={({ field: { onChange, value } }) => (
              <InputCurrency
                onChange={onChange}
                value={value}
                error={
                  form.formState.errors.mobilizationTaxesStep?.transportationTax
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
