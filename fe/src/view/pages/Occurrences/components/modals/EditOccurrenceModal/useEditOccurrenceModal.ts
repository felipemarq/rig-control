import { useBases } from "@/app/hooks/useBases";
import { useOccurrencesContext } from "../../OccurrencesContext/useOccurencesContext";
import {
  Nature,
  OccurrenceCategory,
  OccurrenceType,
} from "@/app/entities/Occurrence";
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
import { occurrenceTypeSelectOptions } from "../../../utils/occurrenceTypeSelectOptions";
import { natureSelectOptions } from "../../../utils/natureSelectOptions";
import { formatIsoStringToHours } from "@/app/utils/formatIsoStringToHours";

const schema = z.object({
  date: z.date(),
  isAbsent: z.string().min(1, "Obrigatório."),
  type: z.nativeEnum(OccurrenceType),
  category: z.string(),
  nature: z.nativeEnum(Nature),
  baseId: z.string().min(1, "Base é obrigatório."),
  description: z.string().min(1, "Descrição é obrigatório."),
});

export type FormData = z.infer<typeof schema>;

export const useEditOccurrenceModal = () => {
  const {
    closeEditOccurrenceModal,
    isEditOccurrenceModalOpen,
    occurrenceBeingSeen,
  } = useOccurrencesContext();

  const [selectedHour, setSelectHour] = useState<string>(
    formatIsoStringToHours(occurrenceBeingSeen?.hour!)
  );

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
    defaultValues: {
      date: new Date(occurrenceBeingSeen?.date!),
      baseId: occurrenceBeingSeen?.baseId,
      description: occurrenceBeingSeen?.description,
      isAbsent: occurrenceBeingSeen?.isAbsent ? "true" : "false",
      nature: occurrenceBeingSeen?.nature,
      type: occurrenceBeingSeen?.type,
      category: Object.values(OccurrenceCategory).includes(
        occurrenceBeingSeen?.category as OccurrenceCategory
      )
        ? (occurrenceBeingSeen?.category as OccurrenceCategory)
        : " ",
    },
  });

  const queryClient = useQueryClient();

  const { bases, isFetchingBases } = useBases();

  const { isPending: isLoadingNewOccurrence, mutateAsync } = useMutation({
    mutationFn: occurrencesService.update,
  });

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

    console.log("Data", {
      date: data.date.toISOString(),
      baseId: data.baseId,
      isAbsent: data.isAbsent === "true" ? true : false,
      nature: data.nature,
      type: data.type,
      description: data.description,
      createdAt: occurrenceBeingSeen?.createdAt!,
      updatedAt: getCurrentISOString(),
    });

    try {
      await mutateAsync({
        id: occurrenceBeingSeen?.id!,
        date: data.date.toISOString(),
        baseId: data.baseId,
        isAbsent: data.isAbsent === "true" ? true : false,
        nature: data.nature,
        type: data.type,
        description: data.description,
        createdAt: occurrenceBeingSeen?.createdAt!,
        hour: formatTimeStringToIsoString(selectedHour),
        category: Object.values(OccurrenceCategory).includes(
          data.category as OccurrenceCategory
        )
          ? (data.category as OccurrenceCategory)
          : undefined,
      });
      reset();
      queryClient.invalidateQueries({ queryKey: [QueryKeys.OCCURRENCES] });
      closeEditOccurrenceModal();
      customColorToast(
        "Registro atualizado com Sucesso!",
        "#1c7b7b",
        "success"
      );
    } catch (error: any | typeof AxiosError) {
      treatAxiosError(error);
      console.log(error);
      //navigate("/dashboard");
    }
  });

  return {
    closeEditOccurrenceModal,
    isEditOccurrenceModalOpen,
    bases,
    isFetchingBases,
    occurrenceTypeSelectOptions,
    natureSelectOptions,
    control,
    handleSubmit,
    handleHourChange,
    isLoadingNewOccurrence,
    errors,
    selectedHour,
  };
};
