import { Controller, useFormContext } from "react-hook-form";
import { useStepper } from "../../useStepper";
import { StepHeader, StepperFooter, StepperNextButton } from "../..";
import { FormData } from "../../../../pages/BillingConfiguration";
import { DatePickerInput } from "@/view/components/DatePickerInput";
import { TaxInput } from "@/view/components/TaxInput";
import { InputCurrency } from "@/view/components/InputCurrency";

export function PeriodAndTaxesStep() {
  const { nextStep } = useStepper();
  const { control, ...form } = useFormContext<FormData>();

  async function handleNextStep() {
    const isValid = await form.trigger("periodAndTaxesStep", {
      shouldFocus: true,
    });

    if (isValid) {
      nextStep();
    }
  }

  return (
    <div>
      <StepHeader
        title="Período e taxas de operação"
        description="Informe o período de operação e as taxas para o cálculo do faturamento."
      />

      <div className="flex flex-col justify-center items-center gap-4">
        {/*   <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" {...form.register("periodAndTaxesStep.")} />
          {form.formState.errors.periodAndTaxesStep?.email?.message && (
            <small className="text-destructive">
              {form.formState.errors.periodAndTaxesStep.email.message}
            </small>
          )}
        </div> */}

        <div className="flex w-full justify-between gap-4">
          <div className="flex-1">
            <Controller
              control={control}
              defaultValue={new Date()}
              name="periodAndTaxesStep.startDate"
              render={({ field: { /* value, */ onChange } }) => (
                <DatePickerInput
                  //value={value}
                  placeholder="Data de início"
                  onChange={onChange}
                  error={
                    form.formState.errors.periodAndTaxesStep?.startDate?.message
                  }
                />
              )}
            />
          </div>
          <div className="flex-1">
            <Controller
              control={control}
              defaultValue={new Date()}
              name="periodAndTaxesStep.endDate"
              render={({ field: { /* value, */ onChange } }) => (
                <DatePickerInput
                  //value={value}
                  placeholder="Data de fim"
                  onChange={onChange}
                  error={
                    form.formState.errors.periodAndTaxesStep?.startDate?.message
                  }
                />
              )}
            />
          </div>
        </div>

        <TaxInput title="Taxa hora disponível" label="R$">
          <Controller
            control={control}
            name="periodAndTaxesStep.availableHourTax"
            render={({ field: { onChange, value } }) => (
              <InputCurrency
                onChange={onChange}
                value={value}
                error={
                  form.formState.errors.periodAndTaxesStep?.availableHourTax
                    ?.message
                }
              />
            )}
          />
        </TaxInput>

        <TaxInput title="Taxa hora indisponível" label="R$">
          <Controller
            control={control}
            name="periodAndTaxesStep.glossHourTax"
            render={({ field: { onChange, value } }) => (
              <InputCurrency
                onChange={onChange}
                value={value}
                error={
                  form.formState.errors.periodAndTaxesStep?.glossHourTax
                    ?.message
                }
              />
            )}
          />
        </TaxInput>
        {/*  <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>
          <Input
            id="password"
            type="password"
            {...form.register("periodAndTaxesStep.password")}
          />
          {form.formState.errors.periodAndTaxesStep?.password?.message && (
            <small className="text-destructive">
              {form.formState.errors.periodAndTaxesStep.password.message}
            </small>
          )}
        </div> */}
      </div>

      <StepperFooter>
        <StepperNextButton onClick={handleNextStep} />
      </StepperFooter>
    </div>
  );
}
