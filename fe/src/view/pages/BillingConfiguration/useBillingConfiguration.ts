import { useTheme } from "@/app/contexts/ThemeContext";
import { useBillingConfigByRigId } from "@/app/hooks/billingConfigs/useBillingConfigByRigId";
import { billingConfigService } from "@/app/services/billingConfigServices";
import { BillingConfigResponse } from "@/app/services/billingConfigServices/getAll";
import { currencyStringToNumber } from "@/app/utils/currencyStringToNumber";
import { customColorToast } from "@/app/utils/customColorToast";
import { treatAxiosError } from "@/app/utils/treatAxiosError";
import { equipmentTaxesStepSchema } from "@/view/components/Stepper/steps/EquipmentTaxesStep/schema";
import { mobilizationTaxesStepSchema } from "@/view/components/Stepper/steps/MobilizationTaxesStep/schema";
import { periodAndTaxesStepSchema } from "@/view/components/Stepper/steps/PeriodAndTaxesStep/schema";
import { tankMixTaxesStepSchema } from "@/view/components/Stepper/steps/TankMixTaxesStep/schema";
import { truckTaxesStepSchema } from "@/view/components/Stepper/steps/TruckTaxesStep/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
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
  const { primaryColor } = useTheme();
  const queryClient = useQueryClient();
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

  const { billingConfigs, isFetchingbillingConfigs } = useBillingConfigByRigId(rigId);

  const handleConfigBeingSeen = (billingConfig: BillingConfigResponse) => {
    setConfigBeingSeen(billingConfig);
  };

  const handleCloseConfigBeingSeen = () => {
    setConfigBeingSeen(null);
  };

  /* Começa a nova parte de edição de valores de faturamento */

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      periodAndTaxesStep: {
        rigId: configBeingSeen?.rig.id!,
        startDate: configBeingSeen ? new Date(configBeingSeen.startDate) : new Date(),
        endDate: configBeingSeen ? new Date(configBeingSeen.endDate) : new Date(),
        availableHourTax: configBeingSeen?.availableHourTax,
        glossHourTax: configBeingSeen ? configBeingSeen.glossHourTax : 0,
      },
      mobilizationTaxesStep: {
        demobilization: configBeingSeen ? configBeingSeen.demobilization : 0,
        dtmBt20And50Tax: configBeingSeen ? configBeingSeen.dtmBt20And50Tax : 0,
        dtmGt50Tax: configBeingSeen ? configBeingSeen.dtmGt50Tax : 0,
        dtmHourTax: configBeingSeen ? configBeingSeen.dtmHourTax : 0,
        dtmLt20Tax: configBeingSeen ? configBeingSeen.dtmLt20Tax : 0,
        equipmentRatioBt20And50Tax: configBeingSeen
          ? configBeingSeen.equipmentRatioBt20And50Tax
          : 0,

        equipmentRatioGt50Tax: configBeingSeen
          ? configBeingSeen.equipmentRatioGt50Tax
          : 0,
        equipmentRatioLt20Tax: configBeingSeen
          ? configBeingSeen.equipmentRatioLt20Tax
          : 0,
        fluidRatioBt20And50Tax: configBeingSeen
          ? configBeingSeen.fluidRatioBt20And50Tax
          : 0,
        fluidRatioGt50Tax: configBeingSeen ? configBeingSeen.fluidRatioGt50Tax : 0,
        fluidRatioLt20Tax: configBeingSeen ? configBeingSeen.fluidRatioLt20Tax : 0,
        mobilization: configBeingSeen ? configBeingSeen.mobilization : 0,
        mobilizationOut: configBeingSeen ? configBeingSeen.mobilizationOut : 0,
        transportationTax: configBeingSeen ? configBeingSeen.transportationTax : 0,
      },
      truckTaxesStep: {
        suckingTruckTax: configBeingSeen ? configBeingSeen.suckingTruckTax : 0,
        truckCartRentTax: configBeingSeen ? configBeingSeen.truckCartRentTax : 0,
        truckKmTax: configBeingSeen ? configBeingSeen.truckKmTax : 0,
        truckTankTax: configBeingSeen ? configBeingSeen.truckTankTax : 0,
        christmasTreeDisassemblyTax: configBeingSeen
          ? configBeingSeen.christmasTreeDisassemblyTax
          : 0,
      },
      equipmentTaxesStep: {
        bobRentTax: configBeingSeen ? configBeingSeen.bobRentTax : 0,
        extraTrailerTax: configBeingSeen ? configBeingSeen.extraTrailerTax : 0,
        generatorFuelTax: configBeingSeen ? configBeingSeen.generatorFuelTax : 0,
        munckTax: configBeingSeen ? configBeingSeen.munckTax : 0,
        powerSwivelTax: configBeingSeen ? configBeingSeen.powerSwivelTax : 0,
      },
      tankMixTaxesStep: {
        mixTankDemobilizationTax: configBeingSeen
          ? configBeingSeen.mixTankDemobilizationTax
          : 0,
        mixTankDtmTax: configBeingSeen ? configBeingSeen.mixTankDtmTax : 0,
        mixTankHourRentTax: configBeingSeen ? configBeingSeen.mixTankHourRentTax : 0,
        mixTankMobilizationTax: configBeingSeen
          ? configBeingSeen.mixTankMobilizationTax
          : 0,
        mixTankMonthRentTax: configBeingSeen ? configBeingSeen.mixTankMonthRentTax : 0,
        mixTankOperatorTax: configBeingSeen ? configBeingSeen.mixTankOperatorTax : 0,
      },
    },
  });

  useEffect(() => {
    if (configBeingSeen) {
      form.reset({
        periodAndTaxesStep: {
          rigId: configBeingSeen?.rig.id!,
          startDate: configBeingSeen ? new Date(configBeingSeen.startDate) : new Date(),
          endDate: configBeingSeen ? new Date(configBeingSeen.endDate) : new Date(),
          availableHourTax: configBeingSeen?.availableHourTax,
          glossHourTax: configBeingSeen ? configBeingSeen.glossHourTax : 0,
        },
        mobilizationTaxesStep: {
          demobilization: configBeingSeen ? configBeingSeen.demobilization : 0,
          dtmBt20And50Tax: configBeingSeen ? configBeingSeen.dtmBt20And50Tax : 0,
          dtmGt50Tax: configBeingSeen ? configBeingSeen.dtmGt50Tax : 0,
          dtmHourTax: configBeingSeen ? configBeingSeen.dtmHourTax : 0,
          dtmLt20Tax: configBeingSeen ? configBeingSeen.dtmLt20Tax : 0,
          equipmentRatioBt20And50Tax: configBeingSeen
            ? configBeingSeen.equipmentRatioBt20And50Tax
            : 0,

          equipmentRatioGt50Tax: configBeingSeen
            ? configBeingSeen.equipmentRatioGt50Tax
            : 0,
          equipmentRatioLt20Tax: configBeingSeen
            ? configBeingSeen.equipmentRatioLt20Tax
            : 0,
          fluidRatioBt20And50Tax: configBeingSeen
            ? configBeingSeen.fluidRatioBt20And50Tax
            : 0,
          fluidRatioGt50Tax: configBeingSeen ? configBeingSeen.fluidRatioGt50Tax : 0,
          fluidRatioLt20Tax: configBeingSeen ? configBeingSeen.fluidRatioLt20Tax : 0,
          mobilization: configBeingSeen ? configBeingSeen.mobilization : 0,
          mobilizationOut: configBeingSeen ? configBeingSeen.mobilizationOut : 0,
          transportationTax: configBeingSeen ? configBeingSeen.transportationTax : 0,
        },
        truckTaxesStep: {
          suckingTruckTax: configBeingSeen ? configBeingSeen.suckingTruckTax : 0,
          truckCartRentTax: configBeingSeen ? configBeingSeen.truckCartRentTax : 0,
          truckKmTax: configBeingSeen ? configBeingSeen.truckKmTax : 0,
          truckTankTax: configBeingSeen ? configBeingSeen.truckTankTax : 0,
          christmasTreeDisassemblyTax: configBeingSeen
            ? configBeingSeen.christmasTreeDisassemblyTax
            : 0,
        },
        equipmentTaxesStep: {
          bobRentTax: configBeingSeen ? configBeingSeen.bobRentTax : 0,
          extraTrailerTax: configBeingSeen ? configBeingSeen.extraTrailerTax : 0,
          generatorFuelTax: configBeingSeen ? configBeingSeen.generatorFuelTax : 0,
          munckTax: configBeingSeen ? configBeingSeen.munckTax : 0,
          powerSwivelTax: configBeingSeen ? configBeingSeen.powerSwivelTax : 0,
        },
        tankMixTaxesStep: {
          mixTankDemobilizationTax: configBeingSeen
            ? configBeingSeen.mixTankDemobilizationTax
            : 0,
          mixTankDtmTax: configBeingSeen ? configBeingSeen.mixTankDtmTax : 0,
          mixTankHourRentTax: configBeingSeen ? configBeingSeen.mixTankHourRentTax : 0,
          mixTankMobilizationTax: configBeingSeen
            ? configBeingSeen.mixTankMobilizationTax
            : 0,
          mixTankMonthRentTax: configBeingSeen ? configBeingSeen.mixTankMonthRentTax : 0,
          mixTankOperatorTax: configBeingSeen ? configBeingSeen.mixTankOperatorTax : 0,
        },
      });
    }
  }, [configBeingSeen]);

  const { mutateAsync } = useMutation({
    mutationFn: billingConfigService.update,
  });

  const handleSubmit = form.handleSubmit(async (formData) => {
    const { ...data } = formData;

    const formattedFormData = Object.assign(
      {},
      ...Object.values(data).map((item) => ({ ...item }))
    );

    try {
      await mutateAsync({
        ...formattedFormData,
        id: configBeingSeen?.id,
        rigId: formattedFormData.rigId,
        availableHourTax:
          currencyStringToNumber(formattedFormData.availableHourTax as string) ??
          (formattedFormData.availableHourTax as number),
        dtmBt20And50Tax:
          currencyStringToNumber(formattedFormData.dtmBt20And50Tax as string) ??
          (formattedFormData.dtmBt20And50Tax as number),
        dtmGt50Tax:
          currencyStringToNumber(formattedFormData.dtmGt50Tax as string) ??
          (formattedFormData.dtmGt50Tax as number),
        dtmLt20Tax:
          currencyStringToNumber(formattedFormData.dtmLt20Tax as string) ??
          (formattedFormData.dtmLt20Tax as number),
        equipmentRatioBt20And50Tax:
          currencyStringToNumber(
            formattedFormData.equipmentRatioBt20And50Tax as string
          ) ?? (formattedFormData.equipmentRatioBt20And50Tax as number),
        equipmentRatioGt50Tax:
          currencyStringToNumber(formattedFormData.equipmentRatioGt50Tax as string) ??
          (formattedFormData.equipmentRatioGt50Tax as number),
        equipmentRatioLt20Tax:
          currencyStringToNumber(formattedFormData.equipmentRatioLt20Tax as string) ??
          (formattedFormData.equipmentRatioLt20Tax as number),
        fluidRatioBt20And50Tax:
          currencyStringToNumber(formattedFormData.fluidRatioBt20And50Tax as string) ??
          (formattedFormData.fluidRatioBt20And50Tax as number),
        fluidRatioGt50Tax:
          currencyStringToNumber(formattedFormData.fluidRatioGt50Tax as string) ??
          (formattedFormData.fluidRatioGt50Tax as number),
        fluidRatioLt20Tax:
          currencyStringToNumber(formattedFormData.fluidRatioLt20Tax as string) ??
          (formattedFormData.fluidRatioLt20Tax as number),
        glossHourTax:
          currencyStringToNumber(formattedFormData.glossHourTax as string) ??
          (formattedFormData.glossHourTax as number),
        mobilization:
          currencyStringToNumber(formattedFormData.mobilization as string) ??
          (formattedFormData.mobilization as number),
        readjustment: 1,
        bobRentTax:
          currencyStringToNumber(formattedFormData.bobRentTax as string) ??
          (formattedFormData.bobRentTax as number),
        demobilization:
          currencyStringToNumber(formattedFormData.demobilization as string) ??
          (formattedFormData.demobilization as number),
        dtmHourTax:
          currencyStringToNumber(formattedFormData.dtmHourTax as string) ??
          (formattedFormData.dtmHourTax as number),
        extraTrailerTax:
          currencyStringToNumber(formattedFormData.extraTrailerTax as string) ??
          (formattedFormData.extraTrailerTax as number),
        generatorFuelTax:
          currencyStringToNumber(formattedFormData.generatorFuelTax as string) ??
          (formattedFormData.generatorFuelTax as number),
        mixTankDemobilizationTax:
          currencyStringToNumber(formattedFormData.mixTankDemobilizationTax as string) ??
          (formattedFormData.mixTankDemobilizationTax as number),
        mixTankDtmTax:
          currencyStringToNumber(formattedFormData.mixTankDtmTax as string) ??
          (formattedFormData.mixTankDtmTax as number),
        mixTankHourRentTax:
          currencyStringToNumber(formattedFormData.mixTankHourRentTax as string) ??
          (formattedFormData.mixTankHourRentTax as number),
        mixTankMobilizationTax:
          currencyStringToNumber(formattedFormData.mixTankMobilizationTax as string) ??
          (formattedFormData.mixTankMobilizationTax as number),
        mixTankMonthRentTax:
          currencyStringToNumber(formattedFormData.mixTankMonthRentTax as string) ??
          (formattedFormData.mixTankMonthRentTax as number),
        mixTankOperatorTax:
          currencyStringToNumber(formattedFormData.mixTankOperatorTax as string) ??
          (formattedFormData.mixTankOperatorTax as number),
        munckTax:
          currencyStringToNumber(formattedFormData.munckTax as string) ??
          (formattedFormData.munckTax as number),
        powerSwivelTax:
          currencyStringToNumber(formattedFormData.powerSwivelTax as string) ??
          (formattedFormData.powerSwivelTax as number),
        suckingTruckTax:
          currencyStringToNumber(formattedFormData.suckingTruckTax as string) ??
          (formattedFormData.suckingTruckTax as number),
        transportationTax:
          currencyStringToNumber(formattedFormData.transportationTax as string) ??
          (formattedFormData.transportationTax as number),
        truckCartRentTax:
          currencyStringToNumber(formattedFormData.truckCartRentTax as string) ??
          (formattedFormData.truckCartRentTax as number),
        truckKmTax:
          currencyStringToNumber(formattedFormData.truckKmTax as string) ??
          (formattedFormData.truckKmTax as number),
        truckTankTax:
          currencyStringToNumber(formattedFormData.truckTankTax as string) ??
          (formattedFormData.truckTankTax as number),
        christmasTreeDisassemblyTax:
          currencyStringToNumber(
            formattedFormData.christmasTreeDisassemblyTax as string
          ) ?? (formattedFormData.christmasTreeDisassemblyTax as number),
        mobilizationOut:
          currencyStringToNumber(formattedFormData.mobilizationOut as string) ??
          (formattedFormData.mobilizationOut as number),
      });
      queryClient.invalidateQueries({ queryKey: ["contracts", "rigs"] });
      customColorToast("Confiuração cadastrada com Sucesso!", primaryColor, "success");
      sessionStorage.removeItem("onboarding-form");
      form.reset();
      window.location.reload();
    } catch (error: any | typeof AxiosError) {
      treatAxiosError(error);
      console.log(error);
    }
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
    isFetchingbillingConfigs,
  };
};
