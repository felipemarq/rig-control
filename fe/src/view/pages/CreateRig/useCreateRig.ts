import { UF } from "../../../app/entities/Rig";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { rigsService } from "../../../app/services/rigsService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContracts } from "../../../app/hooks/contracts/useContracts";
import { useAuth } from "../../../app/hooks/useAuth";
import { currencyStringToNumber } from "../../../app/utils/currencyStringToNumber";
import { treatAxiosError } from "../../../app/utils/treatAxiosError";
import { AxiosError } from "axios";
import { customColorToast } from "../../../app/utils/customColorToast";
import { periodAndTaxesStepSchema } from "@/view/components/Stepper/steps/PeriodAndTaxesStep/schema";
import { mobilizationTaxesStepSchema } from "@/view/components/Stepper/steps/MobilizationTaxesStep/schema";
import { equipmentTaxesStepSchema } from "@/view/components/Stepper/steps/EquipmentTaxesStep/schema";
import { tankMixTaxesStepSchema } from "@/view/components/Stepper/steps/TankMixTaxesStep/schema";
import { truckTaxesStepSchema } from "@/view/components/Stepper/steps/TruckTaxesStep/schema";
import { useEffect } from "react";
import { safeSessionStorageGetItem } from "@/app/utils/safeSessionStorageGetItem";
import { useTheme } from "@/app/contexts/ThemeContext";

const schema = z.object({
  name: z.string().min(1),
  state: z.string().min(1),
  contractId: z.string().min(1),
  periodAndTaxesStep: periodAndTaxesStepSchema,
  mobilizationTaxesStep: mobilizationTaxesStepSchema,
  equipmentTaxesStep: equipmentTaxesStepSchema,
  tankMixTaxesStep: tankMixTaxesStepSchema,
  truckTaxesStep: truckTaxesStepSchema,
});

type FormData = z.infer<typeof schema>;

export const useCreateRig = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { primaryColor } = useTheme();

  const isUserAdm = user?.accessLevel === "ADM";

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

  const { isPending: isLoading, mutateAsync } = useMutation({
    mutationFn: rigsService.create,
  });

  const { contracts, isFetchingContracts } = useContracts(isUserAdm);

  const handleSubmit = form.handleSubmit(async (data) => {
    const [name, state, contractId, ...rest] = Object.values(data);

    const objectOfObjects = Object.assign(
      {},
      ...rest.map((item) => {
        // Verificar se o item é um objeto antes de usar o spread
        if (typeof item === "object" && item !== null) {
          return { ...item };
        }
        // Se não for objeto, ignorar ou tratar de acordo com a necessidade
        return {};
      })
    );

    const formData = { name, state, contractId, ...objectOfObjects };
    try {
      await mutateAsync({
        ...formData,
        state: formData.state as UF,
        isActive: true,
        availableHourTax:
          currencyStringToNumber(formData.availableHourTax as string) ??
          (formData.availableHourTax as number),
        dtmBt20And50Tax:
          currencyStringToNumber(formData.dtmBt20And50Tax as string) ??
          (formData.dtmBt20And50Tax as number),
        dtmGt50Tax:
          currencyStringToNumber(formData.dtmGt50Tax as string) ??
          (formData.dtmGt50Tax as number),
        dtmLt20Tax:
          currencyStringToNumber(formData.dtmLt20Tax as string) ??
          (formData.dtmLt20Tax as number),
        equipmentRatioBt20And50Tax:
          currencyStringToNumber(formData.equipmentRatioBt20And50Tax as string) ??
          (formData.equipmentRatioBt20And50Tax as number),
        equipmentRatioGt50Tax:
          currencyStringToNumber(formData.equipmentRatioGt50Tax as string) ??
          (formData.equipmentRatioGt50Tax as number),
        equipmentRatioLt20Tax:
          currencyStringToNumber(formData.equipmentRatioLt20Tax as string) ??
          (formData.equipmentRatioLt20Tax as number),
        fluidRatioBt20And50Tax:
          currencyStringToNumber(formData.fluidRatioBt20And50Tax as string) ??
          (formData.fluidRatioBt20And50Tax as number),
        fluidRatioGt50Tax:
          currencyStringToNumber(formData.fluidRatioGt50Tax as string) ??
          (formData.fluidRatioGt50Tax as number),
        fluidRatioLt20Tax:
          currencyStringToNumber(formData.fluidRatioLt20Tax as string) ??
          (formData.fluidRatioLt20Tax as number),
        glossHourTax:
          currencyStringToNumber(formData.glossHourTax as string) ??
          (formData.glossHourTax as number),
        mobilization:
          currencyStringToNumber(formData.mobilization as string) ??
          (formData.mobilization as number),
        readjustment: 1,
        bobRentTax:
          currencyStringToNumber(formData.bobRentTax as string) ??
          (formData.bobRentTax as number),
        demobilization:
          currencyStringToNumber(formData.demobilization as string) ??
          (formData.demobilization as number),
        dtmHourTax:
          currencyStringToNumber(formData.dtmHourTax as string) ??
          (formData.dtmHourTax as number),
        extraTrailerTax:
          currencyStringToNumber(formData.extraTrailerTax as string) ??
          (formData.extraTrailerTax as number),
        generatorFuelTax:
          currencyStringToNumber(formData.generatorFuelTax as string) ??
          (formData.generatorFuelTax as number),
        mixTankDemobilizationTax:
          currencyStringToNumber(formData.mixTankDemobilizationTax as string) ??
          (formData.mixTankDemobilizationTax as number),
        mixTankDtmTax:
          currencyStringToNumber(formData.mixTankDtmTax as string) ??
          (formData.mixTankDtmTax as number),
        mixTankHourRentTax:
          currencyStringToNumber(formData.mixTankHourRentTax as string) ??
          (formData.mixTankHourRentTax as number),
        mixTankMobilizationTax:
          currencyStringToNumber(formData.mixTankMobilizationTax as string) ??
          (formData.mixTankMobilizationTax as number),
        mixTankMonthRentTax:
          currencyStringToNumber(formData.mixTankMonthRentTax as string) ??
          (formData.mixTankMonthRentTax as number),
        mixTankOperatorTax:
          currencyStringToNumber(formData.mixTankOperatorTax as string) ??
          (formData.mixTankOperatorTax as number),
        munckTax:
          currencyStringToNumber(formData.munckTax as string) ??
          (formData.munckTax as number),
        powerSwivelTax:
          currencyStringToNumber(formData.powerSwivelTax as string) ??
          (formData.powerSwivelTax as number),
        suckingTruckTax:
          currencyStringToNumber(formData.suckingTruckTax as string) ??
          (formData.suckingTruckTax as number),
        transportationTax:
          currencyStringToNumber(formData.transportationTax as string) ??
          (formData.transportationTax as number),
        truckCartRentTax:
          currencyStringToNumber(formData.truckCartRentTax as string) ??
          (formData.truckCartRentTax as number),
        truckKmTax:
          currencyStringToNumber(formData.truckKmTax as string) ??
          (formData.truckKmTax as number),
        truckTankTax:
          currencyStringToNumber(formData.truckTankTax as string) ??
          (formData.truckTankTax as number),
        christmasTreeDisassemblyTax:
          currencyStringToNumber(formData.christmasTreeDisassemblyTax as string) ??
          (formData.christmasTreeDisassemblyTax as number),
      });
      queryClient.invalidateQueries({ queryKey: ["contracts", "rigs"] });
      customColorToast("Sonda cadastrada com Sucesso!", primaryColor, "success");
      form.reset();
    } catch (error: any | typeof AxiosError) {
      treatAxiosError(error);
      console.log(error);
    }
  });

  return {
    form,
    handleSubmit,
    contracts,
    isFetchingContracts,
    isLoading,
  };
};
