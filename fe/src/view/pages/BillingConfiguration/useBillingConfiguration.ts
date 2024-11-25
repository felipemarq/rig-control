import { useBillingConfigByRigId } from "@/app/hooks/billingConfigs/useBillingConfigByRigId";
import { BillingConfigResponse } from "@/app/services/billingConfigServices/getAll";
import { safeSessionStorageGetItem } from "@/app/utils/safeSessionStorageGetItem";
import { equipmentTaxesStepSchema } from "@/view/components/Stepper/steps/EquipmentTaxesStep/schema";
import { mobilizationTaxesStepSchema } from "@/view/components/Stepper/steps/MobilizationTaxesStep/schema";
import { periodAndTaxesStepSchema } from "@/view/components/Stepper/steps/PeriodAndTaxesStep/schema";
import { tankMixTaxesStepSchema } from "@/view/components/Stepper/steps/TankMixTaxesStep/schema";
import { truckTaxesStepSchema } from "@/view/components/Stepper/steps/TruckTaxesStep/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { z } from "zod";

const schema = z.object({
  periodAndTaxesStep: periodAndTaxesStepSchema,
  mobilizationTaxesStep: mobilizationTaxesStepSchema,
  equipmentTaxesStep: equipmentTaxesStepSchema,
  tankMixTaxesStep: tankMixTaxesStepSchema,
  truckTaxesStep: truckTaxesStepSchema,
});

export type FormData = z.infer<typeof schema>;

export const useBillingConfiguration = () => {
  const { rigId } = useParams<{ rigId: string }>();
  const [configBeingSeen, setConfigBeingSeen] = useState<BillingConfigResponse | null>(
    null
  );
  const [isEditingConfig, setIsEditingConfig] = useState(false);

  const handleChangeIsEditingConfig = (isEditing: boolean) => {
    setIsEditingConfig(isEditing);
  };

  if (typeof rigId === "undefined") {
    // Trate o erro de acordo com a necessidade do seu aplicativo
    // Pode ser um redirecionamento, um erro lançado, ou até mesmo um log.
    throw new Error("rigId is undefined");
  }

  const { billingConfigs } = useBillingConfigByRigId(rigId);

  const handleConfigBeingSeen = (billingConfig: BillingConfigResponse) => {
    setConfigBeingSeen(billingConfig);
  };

  const handleCloseConfigBeingSeen = () => {
    setConfigBeingSeen(null);
  };

  /* Começa a nova parte de edição de valores de faturamento */

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

  const handleSubmit = form.handleSubmit(async (formData) => {
    console.log(formData);
  });

  return {
    billingConfigs,
    configBeingSeen,
    handleConfigBeingSeen,
    handleCloseConfigBeingSeen,
    form,
    handleSubmit,
    handleChangeIsEditingConfig,
    isEditingConfig,
  };
};
