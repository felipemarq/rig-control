import { useBases } from "@/app/hooks/useBases";
import { useOccurrencesContext } from "../../OccurrencesContext/useOccurencesContext";
import {
  OccurenceNature,
  OccurrenceCategory,
  OccurrenceType,
} from "@/app/entities/Occurrence";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, DragEvent, useEffect, useState } from "react";
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
import { UF } from "@/app/entities/Rig";
import { filesService } from "@/app/services/filesService";
import { useClients } from "@/app/hooks/clients/useClients";
import { SelectOptions } from "@/app/entities/SelectOptions";
import { OccurrenceSeverity } from "@/app/entities/OccurrenceSeverity";
import { occurrenceSeveritySelectOptions } from "../../../utils/occurrenceSeveritySelectOptions";
import { useTheme } from "@/app/contexts/ThemeContext";

const schema = z.object({
  date: z.date(),
  title: z.string().min(1, "Obrigatório."),
  isAbsent: z.string().min(1, "Obrigatório."),
  type: z.nativeEnum(OccurrenceType),
  category: z.string(),
  nature: z.nativeEnum(OccurenceNature),
  severity: z.string().min(0, "Please enter a valid value").optional(),
  baseId: z.string().min(1, "Base é obrigatório."),
  description: z.string().min(1, "Descrição é obrigatório."),
  state: z.string().min(1, "Estado é obrigatório"),
  clientId: z.string().min(1, "Base é obrigatório."),
});

export type FormData = z.infer<typeof schema>;

export const useEditOccurrenceModal = () => {
  const { closeEditOccurrenceModal, isEditOccurrenceModalOpen, occurrenceBeingSeen } =
    useOccurrencesContext();

  const { primaryColor } = useTheme();

  const [selectedHour, setSelectHour] = useState<string>(
    formatIsoStringToHours(occurrenceBeingSeen?.hour!)
  );
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleHourChange = (timeString: string) => {
    setSelectHour(timeString);
  };

  const hasFile = occurrenceBeingSeen?.files.length! > 0;

  const fileName = hasFile ? occurrenceBeingSeen?.files[0].path : null;

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

  const {
    handleSubmit: hookFormhandleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      date: new Date(occurrenceBeingSeen?.date!),
      baseId: occurrenceBeingSeen?.baseId,
      title: occurrenceBeingSeen?.title,
      state: occurrenceBeingSeen?.state as UF,
      description: occurrenceBeingSeen?.description,
      isAbsent: occurrenceBeingSeen?.isAbsent ? "true" : "false",
      nature: occurrenceBeingSeen?.nature,
      severity: Object.values(OccurrenceSeverity).includes(
        occurrenceBeingSeen?.severity as OccurrenceSeverity
      )
        ? (occurrenceBeingSeen?.severity as OccurrenceSeverity)
        : " ",
      type: occurrenceBeingSeen?.type,
      clientId: occurrenceBeingSeen?.clientId,
      category: Object.values(OccurrenceCategory).includes(
        occurrenceBeingSeen?.category as OccurrenceCategory
      )
        ? (occurrenceBeingSeen?.category as OccurrenceCategory)
        : " ",
    },
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
    if (selectedNature === OccurenceNature.INCIDENT) {
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

  const { isPending: isLoadingUpdateOccurrence, mutateAsync } = useMutation({
    mutationFn: occurrencesService.update,
  });

  const { mutateAsync: mutateUploadFileAsync, isPending: isLoadingUploadFile } =
    useMutation({
      mutationFn: filesService.uploadOccurrenceFile,
    });

  const {
    mutateAsync: mutateAsyncRemoveOccurrence,
    isPending: isLoadingDeleteOccurrence,
  } = useMutation({
    mutationFn: occurrencesService.remove,
  });

  const handleDeleteOccurrence = async () => {
    try {
      await mutateAsyncRemoveOccurrence(occurrenceBeingSeen!.id);

      queryClient.invalidateQueries({ queryKey: [QueryKeys.OCCURRENCES] });
      handleCloseDeleteModal();
      closeEditOccurrenceModal();
      customColorToast("Ocorrência deletada com sucesso!", primaryColor, "success");
    } catch (error: any | typeof AxiosError) {
      treatAxiosError(error);
      console.log(error);
      //navigate("/dashboard");
    }
  };

  const handleSubmit = hookFormhandleSubmit(async (data) => {
    console.log("Data", {
      id: occurrenceBeingSeen?.id!,
      date: data.date.toISOString(),
      baseId: data.baseId,
      clientId: data.clientId,
      state: data.state as UF,
      isAbsent: data.isAbsent === "true" ? true : false,
      nature: data.nature,
      type: data.type,
      severity: Object.values(OccurrenceSeverity).includes(
        data.severity as OccurrenceSeverity
      )
        ? (data.severity as OccurrenceSeverity)
        : undefined,
      description: data.description,
      createdAt: occurrenceBeingSeen?.createdAt!,

      hour: formatTimeStringToIsoString(selectedHour),
      category: Object.values(OccurrenceCategory).includes(
        data.category as OccurrenceCategory
      )
        ? (data.category as OccurrenceCategory)
        : undefined,
    });

    try {
      await mutateAsync({
        id: occurrenceBeingSeen?.id!,
        date: data.date.toISOString(),
        title: data.title,
        baseId: data.baseId,
        clientId: data.clientId,
        state: data.state as UF,
        isAbsent: data.isAbsent === "true" ? true : false,
        nature: data.nature,
        type: data.type,
        severity: Object.values(OccurrenceSeverity).includes(
          data.severity as OccurrenceSeverity
        )
          ? (data.severity as OccurrenceSeverity)
          : undefined,
        description: data.description,
        createdAt: occurrenceBeingSeen?.createdAt!,
        hour: formatTimeStringToIsoString(selectedHour),
        updatedAt: getCurrentISOString(),
        category: Object.values(OccurrenceCategory).includes(
          data.category as OccurrenceCategory
        )
          ? (data.category as OccurrenceCategory)
          : undefined,
      });

      if (file) {
        await mutateUploadFileAsync({
          occurrenceId: occurrenceBeingSeen?.id!,
          file: file,
        });
      }
      setFile(null);
      queryClient.invalidateQueries({ queryKey: [QueryKeys.OCCURRENCES] });
      closeEditOccurrenceModal();
      customColorToast("Registro atualizado com Sucesso!", primaryColor, "success");

      if (file) {
        window.location.reload();
      }
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
    isLoadingUpdateOccurrence: isLoadingUpdateOccurrence || isLoadingUploadFile,
    errors,
    selectedHour,
    handleFileSelected,
    handleDrop,
    handleDragOver,
    file,
    isDragging,
    handleDragLeave,
    hasFile,
    fileName,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    isDeleteModalOpen,
    handleDeleteOccurrence,
    isLoadingDeleteOccurrence,
    clientSelectOptions,
    isFetchingClients,
    occurrenceSeveritySelectOptions,
    selectedNature,
  };
};
