import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { Stepper } from "../../components/Stepper";
import { PeriodAndTaxesStep } from "../../components/Stepper/steps/PeriodAndTaxesStep";
import { MobilizationTaxesStep } from "../../components/Stepper/steps/MobilizationTaxesStep";
import { TankMixTaxesStep } from "../../components/Stepper/steps/TankMixTaxesStep";
import { periodAndTaxesStepSchema } from "../../components/Stepper/steps/PeriodAndTaxesStep/schema";
import { tankMixTaxesStepSchema } from "../../components/Stepper/steps/TankMixTaxesStep/schema";
import { mobilizationTaxesStepSchema } from "../../components/Stepper/steps/MobilizationTaxesStep/schema";
import { safeSessionStorageGetItem } from "@/app/utils/safeSessionStorageGetItem";
import { TruckTaxesStep } from "../../components/Stepper/steps/TruckTaxesStep";
import { truckTaxesStepSchema } from "../../components/Stepper/steps/TruckTaxesStep/schema";
import { EquipmentTaxesStep } from "../../components/Stepper/steps/EquipmentTaxesStep";
import { equipmentTaxesStepSchema } from "../../components/Stepper/steps/EquipmentTaxesStep/schema";

const schema = z.object({
  periodAndTaxesStep: periodAndTaxesStepSchema,
  mobilizationTaxesStep: mobilizationTaxesStepSchema,
  equipmentTaxesStep: equipmentTaxesStepSchema,
  tankMixTaxesStep: tankMixTaxesStepSchema,
  truckTaxesStep: truckTaxesStepSchema,
});

export type FormData = z.infer<typeof schema>;

export function BillingConfiguration() {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: safeSessionStorageGetItem<FormData>("onboarding-form") ?? {
      periodAndTaxesStep: {
        startDate: new Date(),
        endDate: new Date(),
        availableHourTax: 0,
        glossHourTax: 0,
      },
      mobilizationTaxesStep: {
        demobilization: 0,
        dtmBt20And50Tax: 0,
        dtmGt50Tax: 0,
        dtmHourTax: 0,
        dtmLt20Tax: 0,
        equipmentRatioBt20And50Tax: 0,
        equipmentRatioGt50Tax: 0,
        equipmentRatioLt20Tax: 0,
        fluidRatioBt20And50Tax: 0,
        fluidRatioGt50Tax: 0,
        fluidRatioLt20Tax: 0,
        mobilization: 0,
        transportationTax: 0,
      },
      truckTaxesStep: {
        suckingTruckTax: 0,
        truckCartRentTax: 0,
        truckKmTax: 0,
        truckTankTax: 0,
        christmasTreeDisassemblyTax: 0,
      },
      equipmentTaxesStep: {
        bobRentTax: 0,
        extraTrailerTax: 0,
        generatorFuelTax: 0,
        munckTax: 0,
        powerSwivelTax: 0,
      },
      tankMixTaxesStep: {
        mixTankDemobilizationTax: 0,
        mixTankDtmTax: 0,
        mixTankHourRentTax: 0,
        mixTankMobilizationTax: 0,
        mixTankMonthRentTax: 0,
        mixTankOperatorTax: 0,
      },
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch((formData) => {
      sessionStorage.setItem("onboarding-form", JSON.stringify(formData));
    });

    return () => {
      unsubscribe();
    };
  }, [form]);

  const handleSubmit = form.handleSubmit(async (formData) => {
    //console.log("Enviando para a API:", Object.entries(formData));
    /*  console.log(
      "Enviando para a API:",
      JSON.stringify(Object.values(formData))
    ); */

    const objectOfObjects = Object.assign(
      {},
      ...Object.values(formData).map((item) => ({ ...item }))
    );
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log(objectOfObjects);

    sessionStorage.removeItem("onboarding-form");
  });

  return (
    <div className="min-h-fit flex justify-center py-10  w-full overflow-y-auto mb-10">
      <FormProvider {...form}>
        <form onSubmit={handleSubmit} className="w-2/5 ">
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
  );
}
