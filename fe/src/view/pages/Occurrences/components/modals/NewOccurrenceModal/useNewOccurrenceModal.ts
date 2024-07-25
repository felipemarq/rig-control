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
import { ChangeEvent, DragEvent, useMemo, useState } from "react";
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

export const useNewOccurrenceModal = () => {
  const { closeNewOccurrenceModal, isNewOccurrenceModalOpen } =
    useOccurrencesContext();

  const [selectedHour, setSelectHour] = useState<string>("00:00");

  const [file, setFile] = useState<File | null>(null);

  const previewURL = useMemo(() => {
    if (!file) {
      return null;
    }

    return URL.createObjectURL(file);
  }, [file]);

  const handleFileSelected = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.currentTarget;

    if (!files) {
      return;
    }

    const selectedFile = files[0];

    setFile(selectedFile);
  };

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const { files } = event.dataTransfer;

    if (!files || files.length === 0) {
      return;
    }

    const selectedFile = files[0];
    setFile(selectedFile);
  };

  const handleDragOver = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

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
      hour: formatTimeStringToIsoString(selectedHour),
      category: Object.values(OccurrenceCategory).includes(
        data.category as OccurrenceCategory
      )
        ? (data.category as OccurrenceCategory)
        : undefined,
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
        category: Object.values(OccurrenceCategory).includes(
          data.category as OccurrenceCategory
        )
          ? (data.category as OccurrenceCategory)
          : undefined,
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
    previewURL,
    handleFileSelected,
    handleDrop,
    handleDragOver,
    file,
  };
};
