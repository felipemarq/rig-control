import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { v4 as uuidv4 } from "uuid";
import { AlertCircle, Loader2 } from "lucide-react";
import * as Sentry from "@sentry/react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { customColorToast } from "@/app/utils/customColorToast";
import { treatAxiosError } from "@/app/utils/treatAxiosError";
import { useState } from "react";
import { DatePickerInput } from "@/view/components/DatePickerInput";
import { efficiencyMappers } from "@/app/services/mappers/efficiencyMappers";
import { efficienciesService } from "@/app/services/efficienciesService";
import { addDays, format, isAfter } from "date-fns";
import { formatDate } from "@/app/utils/formatDate";
import { useTheme } from "@/app/contexts/ThemeContext";

const schema = z.object({
  type: z.string().min(1, "Obrigatório."),
  startDate: z.date(),
  endDate: z.date(),
  description: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function CreateCommercialPeriodModal({
  children,
  selectedRig,
}: {
  children: React.ReactNode;
  selectedRig: string;
}) {
  const { primaryColor } = useTheme();
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Controla a abertura do dialog

  const [dateBeingProcessed, setDateBeingProcessed] = useState<Date | null>(
    null
  );
  const {
    handleSubmit: hookFormhandleSubmit,
    control,
    formState,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { isPending: isLoadingCreate, mutateAsync } = useMutation({
    mutationFn: efficienciesService.create,
  });

  const { isPending: isLoadingDelete, mutateAsync: deleteAsync } = useMutation({
    mutationFn: efficienciesService.deleteWithBody,
  });

  const {
    /* isPending: isLoadingConfirmEfficiency, */
    mutateAsync: mutateAsyncConfirmEfficiency,
  } = useMutation({ mutationFn: efficienciesService.confirm });

  const isLoading = isLoadingCreate || isLoadingDelete;

  const handleProcessDates = async (
    startDate: Date,
    endDate: Date,
    type: string,
    description?: string
  ) => {
    let currentDate = startDate;

    // Loop enquanto a data atual for menor ou igual à data final
    while (!isAfter(currentDate, endDate)) {
      try {
        // Exemplo de operação para cada dia (pode ser substituído pela lógica desejada)
        console.log(
          `Processando para o dia: ${format(currentDate, "yyyy-MM-dd")}`
        );

        setDateBeingProcessed(currentDate);

        // Aqui você pode chamar sua função assíncrona, como o mutateAsync
        const { toPersistenceObj } = efficiencyMappers.toPersistance({
          rigId: selectedRig,
          date: currentDate,
          availableHours: 24,
          periods: [
            {
              id: uuidv4(),
              startHour: "00:00",
              endHour: "23:59",
              type: "COMMERCIALLY_STOPPED",
              classification: type,
              fluidRatio: "",
              repairClassification: null,
              equipmentRatio: "",
              description: description ?? "",
              well: "Comercialmente Parado",
            },
          ],
          isMunckSelected: false,
          isDemobilizationSelected: false,
          isExtraTrailerSelected: false,
          isFuelGeneratorSelected: false,
          isMixTankMonthSelected: false,
          isMixTankOperatorsSelected: false,
          isMixTankSelected: false,
          isMobilizationSelected: false,
          isPowerSwivelSelected: false,
          isSuckingTruckSelected: false,
          isTankMixDemobilizationSelected: false,
          isTankMixMobilizationSelected: false,
          isTankMixDTMSelected: false,
          isTruckTankSelected: false,
          isTransportationSelected: false,
          isTruckCartSelected: false,
          bobRentHours: "00:00",
          christmasTreeDisassemblyHours: "00:00",
          truckKm: 0,
        });

        await deleteAsync({ date: currentDate, rigId: selectedRig });

        const efficiency = await mutateAsync(toPersistenceObj);
        console.log(efficiency);

        await mutateAsyncConfirmEfficiency(efficiency.id);
      } catch (error: any) {
        Sentry.captureException(error);
        treatAxiosError(error);
        console.error(
          `Erro ao processar o dia: ${format(currentDate, "yyyy-MM-dd")}`,
          error
        );
      }
      // Incrementa o dia
      currentDate = addDays(currentDate, 1);
    }

    customColorToast("Dados criados com sucesso!", primaryColor, "success");
    setIsDialogOpen(false);
  };

  const handleSubmit = hookFormhandleSubmit(async (data) => {
    console.log("Dados recebidos:", data);

    const { startDate, endDate, type, description } = data;

    if (isAfter(startDate, endDate)) {
      customColorToast(
        "A data inicial deve ser menor ou igual à data final.",
        "red",
        "error"
      );
      return;
    }

    await handleProcessDates(startDate, endDate, type, description);
  });

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild onClick={() => setIsDialogOpen(true)}>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="text-gray-800">
            Período de parada comercial
          </DialogTitle>
          <DialogDescription>
            Informe os dados do período de parada comercial
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="flex gap-2">
              <div className="flex-1">
                <Controller
                  control={control}
                  defaultValue={new Date()}
                  name="startDate"
                  render={({ field: { /* value, */ onChange } }) => (
                    <DatePickerInput
                      //value={value}
                      placeholder="Data de Início"
                      onChange={onChange}
                      error={formState.errors.startDate?.message}
                    />
                  )}
                />
              </div>
              <div className="flex-1">
                <Controller
                  control={control}
                  defaultValue={new Date()}
                  name="endDate"
                  render={({ field: { /* value, */ onChange } }) => (
                    <DatePickerInput
                      //value={value}
                      placeholder="Data de Fim"
                      onChange={onChange}
                      error={formState.errors.endDate?.message}
                    />
                  )}
                />
              </div>
            </div>
            <Controller
              control={control}
              name="type"
              shouldUnregister={true}
              render={({ field: { onChange } }) => (
                <RadioGroup onValueChange={(value: string) => onChange(value)}>
                  <div className="flex items-center space-x-2 text-gray-800">
                    <RadioGroupItem
                      value="COMMERCIAL_UNAVAILABILITY"
                      id="COMMERCIAL_UNAVAILABILITY"
                    />
                    <Label htmlFor="COMMERCIAL_UNAVAILABILITY">
                      Indisponibilidade Comercial
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-800">
                    <RadioGroupItem
                      value="OPERATIONAL_ADEQUACY"
                      id="OPERATIONAL_ADEQUACY"
                    />
                    <Label htmlFor="OPERATIONAL_ADEQUACY">
                      Adequação Operacional
                    </Label>
                  </div>
                </RadioGroup>
              )}
            />
            {!isLoading && (
              <div className="flex gap-2 text-redAccent-500">
                <AlertCircle size={40} className="text-" />

                <span className="flex gap-1">
                  Criar período de parada comercial irá deletar qualquer
                  registro existente no intervalo selecionado!
                </span>
              </div>
            )}

            {isLoading && dateBeingProcessed && (
              <span className="flex gap-1 text-gray-700">
                Processando para o dia: {formatDate(dateBeingProcessed)}{" "}
                aguarde...
              </span>
            )}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                "Enviar"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
