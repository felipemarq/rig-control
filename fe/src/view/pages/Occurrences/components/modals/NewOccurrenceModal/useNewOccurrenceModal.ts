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
import { ChangeEvent, DragEvent, useEffect, useMemo, useState } from "react";
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
import { filesService } from "@/app/services/filesService";
import { UF } from "@/app/entities/Rig";
import { useClients } from "@/app/hooks/clients/useClients";
import { SelectOptions } from "@/app/entities/SelectOptions";
import { OccurrenceSeverity } from "@/app/entities/OccurrenceSeverity";
import { occurrenceSeveritySelectOptions } from "../../../utils/occurrenceSeveritySelectOptions";

const schema = z.object({
  date: z.date(),
  title: z.string().min(1, "Obrigatório."),
  isAbsent: z.string().min(1, "Obrigatório."),
  type: z.nativeEnum(OccurrenceType),
  category: z.string(),
  severity: z.string().min(0, "Please enter a valid value").optional(),
  nature: z.nativeEnum(Nature),
  baseId: z.string().min(1, "Base é obrigatório."),
  clientId: z.string().min(1, "Base é obrigatório."),
  description: z.string().min(1, "Descrição é obrigatório."),
  state: z.string().min(1, "Estado é obrigatório"),
});

export type FormData = z.infer<typeof schema>;

export const useNewOccurrenceModal = () => {
  const { closeNewOccurrenceModal, isNewOccurrenceModalOpen } =
    useOccurrencesContext();

  const [selectedHour, setSelectHour] = useState<string>("00:00");
  const [isDragging, setIsDragging] = useState<boolean>(false);
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
    setIsDragging(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  const handleHourChange = (timeString: string) => {
    setSelectHour(timeString);
  };

  const {
    handleSubmit: hookFormhandleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const selectedNature = watch("nature");

  /*  console.log("selectedSeverity", selectedSeverity);
  console.log("errors", errors);
  occurrenceSeveritySelectOptions;
  console.log(
    "occurrenceSeveritySelectOptions",
    occurrenceSeveritySelectOptions
  ); */

  console.log("errors", errors);

  useEffect(() => {
    if (selectedNature === Nature.INCIDENT) {
      setValue("category", ""); // Limpa o valor de category
    } else {
      setValue("severity", undefined); // Limpa o valor de severity
    }
  }, [selectedNature, setValue]);

  const queryClient = useQueryClient();

  const { bases, isFetchingBases } = useBases();
  const { clients, isFetchingClients } = useClients();

  const clientSelectOptions: SelectOptions = clients.map(({ id, name }) => ({
    value: id,
    label: name,
  }));

  console.log("clientSelectOptions", clientSelectOptions);

  const {
    isPending: isLoadingNewOccurrence,
    mutateAsync: mutateNewOccurrenceAsync,
  } = useMutation({
    mutationFn: occurrencesService.create,
  });

  const { mutateAsync: mutateUploadFileAsync, isPending: isLoadingUploadFile } =
    useMutation({
      mutationFn: filesService.create,
    });

  //console.log("errors", errors);

  const handleSubmit = hookFormhandleSubmit(async (data) => {
    console.log("Data", {
      date: data.date.toISOString(),
      baseId: data.baseId,
      state: data.state as UF,
      clientId: data.clientId,
      isAbsent: data.isAbsent === "true" ? true : false,
      nature: data.nature,
      type: data.type,
      severity: Object.values(OccurrenceSeverity).includes(
        data.severity as OccurrenceSeverity
      )
        ? (data.severity as OccurrenceSeverity)
        : (data.severity as OccurrenceSeverity),
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
      const occurrence = await mutateNewOccurrenceAsync({
        date: data.date.toISOString(),
        title: data.title,
        baseId: data.baseId,
        state: data.state as UF,
        clientId: data.clientId,
        isAbsent: data.isAbsent === "true" ? true : false,
        nature: data.nature,
        type: data.type,
        severity: Object.values(OccurrenceSeverity).includes(
          data.severity as OccurrenceSeverity
        )
          ? (data.severity as OccurrenceSeverity)
          : undefined,
        description: data.description,
        createdAt: getCurrentISOString(),
        hour: formatTimeStringToIsoString(selectedHour),
        category: Object.values(OccurrenceCategory).includes(
          data.category as OccurrenceCategory
        )
          ? (data.category as OccurrenceCategory)
          : undefined,
      });

      if (file) {
        await mutateUploadFileAsync({
          occurrenceId: occurrence.id,
          file: file,
        });
      }

      setFile(null);

      if (file) {
        window.location.reload();
      }

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
    occurrenceSeveritySelectOptions,
    natureSelectOptions,
    control,
    handleSubmit,
    handleHourChange,
    isLoadingNewOccurrence: isLoadingUploadFile || isLoadingNewOccurrence,
    errors,
    previewURL,
    handleFileSelected,
    handleDrop,
    handleDragOver,
    file,
    isDragging,
    handleDragLeave,
    clientSelectOptions,
    isFetchingClients,
    selectedNature,
  };
};
