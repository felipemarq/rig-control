import { useBases } from "@/app/hooks/useBases";
import { useOccurrencesContext } from "../../OccurrencesContext/useOccurencesContext";
import { Nature, OccurrenceType } from "@/app/entities/Occurrence";
import { SelectOptions } from "@/app/entities/SelectOptions";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { occurrencesService } from "@/app/services/occurrencesService";
import { AxiosError } from "axios";
import { treatAxiosError } from "@/app/utils/treatAxiosError";
import { getCurrentISOString } from "@/app/utils/getCurrentISOString";
import { formatTimeStringToIsoString } from "@/app/utils/formatTimeStringToIsoString";
import { customColorToast } from "@/app/utils/customColorToast";
import { QueryKeys } from "@/app/config/QueryKeys";

const schema = z.object({
  date: z.date(),
  isAbsent: z.string().min(1, "Obrigatório."),
  type: z.nativeEnum(OccurrenceType),
  nature: z.nativeEnum(Nature),
  baseId: z.string().min(1, "Base é obrigatório."),
  description: z.string().min(1, "Descrição é obrigatório."),
});

export type FormData = z.infer<typeof schema>;

export const useNewOccurrenceModal = () => {
  const { closeNewOccurrenceModal, isNewOccurrenceModalOpen } =
    useOccurrencesContext();

  const [selectedHour, setSelectHour] = useState<string>("00:00");

  const handleHourChange = (timeString: string) => {
    setSelectHour(timeString);
  };

  const {
    handleSubmit: hookFormhandleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const queryClient = useQueryClient();

  const { bases, isFetchingBases } = useBases();

  const occurrenceTypeSelectOptions: SelectOptions = [
    {
      value: OccurrenceType.SAFETY,
      label: "Segurança",
    },
    {
      value: OccurrenceType.HEALTH,
      label: "Saúde",
    },
    {
      value: OccurrenceType.ENVIRONMENT,
      label: "Meio Ambiente",
    },
  ];

  const natureSelectOptions: SelectOptions = [
    {
      value: Nature.ACCIDENT,
      label: "Acidente",
    },
    {
      value: Nature.INCIDENT,
      label: "Incidente",
    },
  ];

  const { isPending: isLoadingNewOccurrence, mutateAsync } = useMutation({
    mutationFn: occurrencesService.create,
  });

  console.log("errors", errors);

  const handleSubmit = hookFormhandleSubmit(async (data) => {
    console.log("Data", {
      date: data.date.toISOString(),
      baseId: data.baseId,
      isAbsent: data.isAbsent === "true" ? true : false,
      nature: data.nature,
      type: data.type,
      description: data.description,
      createdAt: getCurrentISOString(),
    });

    try {
      await mutateAsync({
        date: data.date.toISOString(),
        baseId: data.baseId,
        isAbsent: data.isAbsent === "true" ? true : false,
        nature: data.nature,
        type: data.type,
        description: data.description,
        createdAt: getCurrentISOString(),
        hour: formatTimeStringToIsoString(selectedHour),
      });
      reset();
      queryClient.invalidateQueries({ queryKey: [QueryKeys.OCCURRENCES] });
      closeNewOccurrenceModal();
      customColorToast("Registro feito com Sucesso!", "#1c7b7b", "success");
    } catch (error: any | typeof AxiosError) {
      treatAxiosError(error);
      console.log(error);
      //navigate("/dashboard");
    }
  });

  return {
    closeNewOccurrenceModal,
    isNewOccurrenceModalOpen,
    bases,
    isFetchingBases,
    occurrenceTypeSelectOptions,
    natureSelectOptions,
    control,
    handleSubmit,
    handleHourChange,
    isLoadingNewOccurrence,
    errors,
  };
};
