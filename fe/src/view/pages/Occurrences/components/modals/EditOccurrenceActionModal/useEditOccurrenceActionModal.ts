import { useOccurrencesContext } from "../../OccurrencesContext/useOccurencesContext";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, DragEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { treatAxiosError } from "@/app/utils/treatAxiosError";
import { customColorToast } from "@/app/utils/customColorToast";
import { QueryKeys } from "@/app/config/QueryKeys";
import { filesService } from "@/app/services/filesService";
import { occurrencesActionsService } from "@/app/services/occurrencesActionsService";
import { useTheme } from "@/app/contexts/ThemeContext";

const schema = z.object({
  dueDate: z.date(),
  finishedAt: z.date().optional(),
  title: z.string().min(1, "Obrigatório."),
  responsible: z.string().min(1, "Obrigatório."),
  isFinished: z.boolean(),
  description: z.string().optional(),
  responsibleEmail: z.string().email().min(1, "Obrigatório"),
});

export type FormData = z.infer<typeof schema>;

export const useEditOccurrenceActionModal = () => {
  const {
    closeEditOccurrenceActionModal,
    isEditOccurrenceActionModalOpen,
    occurrenceActionBeingSeen,
    handleRefetchOccurrences,
  } = useOccurrencesContext();

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { primaryColor } = useTheme();

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

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
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      description: "",
      dueDate: new Date(occurrenceActionBeingSeen?.dueDate!),
      isFinished: occurrenceActionBeingSeen?.isFinished,
      responsible: occurrenceActionBeingSeen?.responsible,
      title: occurrenceActionBeingSeen?.title,
      finishedAt: occurrenceActionBeingSeen?.finishedAt
        ? new Date(occurrenceActionBeingSeen?.finishedAt!)
        : undefined,
      responsibleEmail: occurrenceActionBeingSeen?.responsibleEmail,
    },
  });

  const isFinished = watch("isFinished");

  const queryClient = useQueryClient();

  const { isPending: isLoadingUpdateOccurrenceAction, mutateAsync } = useMutation({
    mutationFn: occurrencesActionsService.update,
  });

  const { isPending: isLoadingUploadFile, mutateAsync: mutateUploadFileAsync } =
    useMutation({
      mutationFn: filesService.uploadOccurrenceActionFile,
    });

  const {
    mutateAsync: mutateAsyncRemoveOccurrenceAction,
    isPending: isLoadingDeleteOccurrenceAction,
  } = useMutation({
    mutationFn: occurrencesActionsService.remove,
  });

  const handleDeleteOccurrence = async () => {
    try {
      await mutateAsyncRemoveOccurrenceAction(occurrenceActionBeingSeen!.id);

      queryClient.invalidateQueries({ queryKey: [QueryKeys.OCCURRENCES] });
      handleCloseDeleteModal();
      closeEditOccurrenceActionModal();
      handleRefetchOccurrences();
      customColorToast("Ocorrência deletada com sucesso!", primaryColor, "success");
    } catch (error: any | typeof AxiosError) {
      treatAxiosError(error);
      console.log(error);
      //navigate("/dashboard");
    }
  };

  const handleSubmit = hookFormhandleSubmit(async (data) => {
    try {
      const occurrenceAction = await mutateAsync({
        id: occurrenceActionBeingSeen?.id!,
        dueDate: data.dueDate?.toISOString(),
        description: data.description,
        isFinished: data.isFinished,
        occurrenceId: occurrenceActionBeingSeen?.occurrenceId!,
        responsible: data.responsible,
        title: data.title,
        responsibleEmail: data.responsibleEmail,
      });

      if (file) {
        await mutateUploadFileAsync({
          occurrenceActionId: occurrenceAction.id,
          file: file,
        });
      }

      setFile(null);

      if (file) {
        window.location.reload();
      }

      queryClient.invalidateQueries({ queryKey: [QueryKeys.OCCURRENCES_ACTIONS] });
      closeEditOccurrenceActionModal();
      customColorToast("Registro feito com Sucesso!", primaryColor, "success");
    } catch (error: any | typeof AxiosError) {
      treatAxiosError(error);
      console.log(error);
      //navigate("/dashboard");
    }
  });

  const hasFile = occurrenceActionBeingSeen?.files.length! > 0;

  return {
    closeEditOccurrenceActionModal,
    isEditOccurrenceActionModalOpen,
    occurrenceActionBeingSeen,
    control,
    handleSubmit,
    isLoadingNewOccurrence: isLoadingUploadFile || isLoadingUpdateOccurrenceAction,
    errors,
    handleFileSelected,
    handleDrop,
    handleDragOver,
    file,
    isDragging,
    handleDragLeave,
    hasFile,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    isDeleteModalOpen,
    handleDeleteOccurrence,
    isLoadingDeleteOccurrenceAction,
    isFinished,
  };
};
