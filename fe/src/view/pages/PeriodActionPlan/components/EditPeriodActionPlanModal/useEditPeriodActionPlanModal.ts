import { useFieldArray, useForm } from "react-hook-form";
import { usePeriodActionPlansContext } from "../PeriodActionPlansContext/usePeriodActionPlansContext";
import { periodActionPlanServices } from "@/app/services/periodActionPlanServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { customColorToast } from "@/app/utils/customColorToast";
import { useNavigate } from "react-router-dom";
import { treatAxiosError } from "@/app/utils/treatAxiosError";
import { useTheme } from "@/app/contexts/ThemeContext";
import { AxiosError } from "axios";
import { ChangeEvent, DragEvent, useEffect, useState } from "react";
import { QueryKeys } from "@/app/config/QueryKeys";
import { filesService } from "@/app/services/filesService";

const actionPlanSchema = z.object({
  title: z.string().min(1, "O título é obrigatório"),
  finishedAt: z.date().optional(),
  isFinished: z.boolean().default(false),
  periodActionPlanItems: z
    .array(
      z.object({
        sequenceNumber: z.number(),
        task: z.string().min(1, "A tarefa é obrigatória"),
        assignee: z.string().min(1, "O responsável é obrigatório"),
        dueDate: z.date({ required_error: "A data é obrigatória" }),
        reason: z.string().min(1, "O motivo é obrigatório"),
        instructions: z.string().min(1, "As instruções são obrigatórias"),
        notes: z.string().optional(),
        finishedAt: z.date().optional(),
        isFinished: z.boolean().default(false),
      })
    )
    .min(1, "Adicione pelo menos um item ao plano de ação"),
});

type ActionPlanFormValues = z.infer<typeof actionPlanSchema>;

export const useEditPeriodActionPlanModal = () => {
  const {
    isEditPeriodActionPlanModalOpen,
    closeEditPeriodActionPlanModal,
    openEditPeriodActionPlanModal,
    handleRefechPeriodsActionPlans,
    actionPlanBeingSeen,
    canUserFinishPeriodActionPlan,
  } = usePeriodActionPlansContext();

  const queryClient = useQueryClient();

  const { isPending, mutateAsync: mutateEditPeriodActionPlanAsync } = useMutation({
    mutationFn: periodActionPlanServices.update,
  });

  const {
    isPending: isLoadingDeleteFile,
    mutateAsync: mutateDeletePeriodActionPlanFileAsync,
  } = useMutation({
    mutationFn: filesService.deletePeriodActionPlanFile,
  });

  const { isPending: isLoadingUploadFile, mutateAsync: mutateUploadFileAsync } =
    useMutation({
      mutationFn: filesService.uploadPeriodActionPlanFile,
    });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [isUploadingFile, setIsUploadingFile] = useState<boolean>(false);
  const [filesArray, setFilesArray] = useState<File[]>([]);
  const [isPendingUploadingFile, setIsPendingUploadingFile] = useState<boolean>(false);
  const [isDeleteFileModalOpen, setIsDeleteFileModalOpen] = useState<boolean>(false);
  const [fileIdToDelete, setFileIdToDelete] = useState<string | null>(null);

  const handleAddFile = (file: File) => {
    setFilesArray((prev) => [...prev, file]);
    closeUploadFilesModal();
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

  const openUploadFilesModal = () => {
    setIsUploadingFile(true);
  };

  const closeUploadFilesModal = () => {
    setIsUploadingFile(false);
  };

  const openFileDeleteModal = (fileId: string) => {
    setIsDeleteFileModalOpen(true);
    setFileIdToDelete(fileId);
  };

  const closeFileDeleteModal = () => {
    setIsDeleteFileModalOpen(false);
    setFileIdToDelete(null);
  };

  const handleDeleteFile = async () => {
    try {
      await mutateDeletePeriodActionPlanFileAsync(fileIdToDelete!);
      customColorToast("Arquivo deletado com Sucesso!", primaryColor, "success");
      closeFileDeleteModal();
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.PERIOD_ACTION_PLAN, QueryKeys.PERIOD_ACTION_PLANS],
      });
    } catch (error: any | typeof AxiosError) {
      treatAxiosError(error);
      console.log(error);
      //navigate("/dashboard");
    }
  };

  const { primaryColor } = useTheme();

  const {
    control,
    handleSubmit: hookFormhandleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ActionPlanFormValues>({
    defaultValues: {
      title: actionPlanBeingSeen?.title ?? "",
      finishedAt: new Date(actionPlanBeingSeen?.finishedAt!),
      isFinished: actionPlanBeingSeen?.isFinished,
      periodActionPlanItems: actionPlanBeingSeen
        ? actionPlanBeingSeen?.periodActionPlanItems.map((periodActionPlanItem) => ({
            sequenceNumber: periodActionPlanItem.sequenceNumber,
            task: periodActionPlanItem.task,
            assignee: periodActionPlanItem.assignee,
            dueDate: new Date(periodActionPlanItem.dueDate),
            reason: periodActionPlanItem.reason,
            instructions: periodActionPlanItem.instructions,
            notes: periodActionPlanItem.notes,
            finishedAt: periodActionPlanItem.finishedAt
              ? new Date(periodActionPlanItem.finishedAt)
              : new Date(),
            isFinished: periodActionPlanItem.isFinished,
          }))
        : [],
    },
    resolver: zodResolver(actionPlanSchema),
  });

  useEffect(() => {
    if (actionPlanBeingSeen) {
      reset({
        title: actionPlanBeingSeen.title ?? "",
        finishedAt: new Date(actionPlanBeingSeen.finishedAt!),
        isFinished: actionPlanBeingSeen.isFinished,
        periodActionPlanItems: actionPlanBeingSeen.periodActionPlanItems.map((item) => ({
          sequenceNumber: item.sequenceNumber,
          task: item.task,
          assignee: item.assignee,
          dueDate: new Date(item.dueDate),
          reason: item.reason,
          instructions: item.instructions,
          notes: item.notes || "",
          finishedAt: item.finishedAt ? new Date(item.finishedAt) : undefined,
          isFinished: item.isFinished,
        })),
      });
    }
  }, [actionPlanBeingSeen, reset]); // Executa apenas quando periodActionPlan muda

  const navigate = useNavigate();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "periodActionPlanItems",
  });

  const handleSubmit = hookFormhandleSubmit(async (data) => {
    try {
      await mutateEditPeriodActionPlanAsync({
        id: actionPlanBeingSeen?.id!,
        periodId: actionPlanBeingSeen?.periodId!,
        title: data.title,
        rigId: actionPlanBeingSeen?.rigId!,
        finishedAt: data.finishedAt,
        isFinished: data.isFinished,
        periodActionPlanItems: data.periodActionPlanItems.map((periodActionPlanItem) => ({
          ...periodActionPlanItem,
          dueDate: periodActionPlanItem.dueDate.toISOString(),
          finishedAt: periodActionPlanItem.finishedAt?.toISOString(),
        })),
      });

      setIsPendingUploadingFile(true);

      if (filesArray.length > 0) {
        for (const file of filesArray) {
          const formData = new FormData();
          formData.append("file", file);
          try {
            await mutateUploadFileAsync({
              periodActionPlanId: actionPlanBeingSeen?.id!,
              formData: formData,
            });
            console.log(`Arquivo ${file.name} enviado com sucesso.`);
          } catch (error) {
            console.error(`Erro ao enviar o arquivo ${file.name}:`, error);
          }
        }
      }

      setIsPendingUploadingFile(false);

      closeEditPeriodActionPlanModal();
      customColorToast("Registro editado com Sucesso!", primaryColor, "success");
      handleRefechPeriodsActionPlans();
      navigate("/period-action-plan");
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.PERIOD_ACTION_PLAN, QueryKeys.PERIOD_ACTION_PLANS],
      });
    } catch (error: any | typeof AxiosError) {
      treatAxiosError(error);
      console.log(error);
      //navigate("/dashboard");
    }
  });

  return {
    isEditPeriodActionPlanModalOpen,
    closeEditPeriodActionPlanModal,
    openEditPeriodActionPlanModal,
    fields,
    append,
    remove,
    control,
    errors,
    watch,
    handleSubmit,
    isPending: isLoadingUploadFile || isPending || isPendingUploadingFile,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleFileSelected,
    isDragging,
    file,
    isUploadingFile,
    openUploadFilesModal,
    closeUploadFilesModal,
    handleAddFile,
    filesArray,
    actionPlanBeingSeen,
    isLoadingDeleteFile,
    openFileDeleteModal,
    isDeleteFileModalOpen,
    fileIdToDelete,
    closeFileDeleteModal,
    canUserFinishPeriodActionPlan,
    handleDeleteFile,
  };
};
