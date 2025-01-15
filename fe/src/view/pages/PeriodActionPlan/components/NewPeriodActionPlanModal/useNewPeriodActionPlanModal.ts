import { useFieldArray, useForm } from "react-hook-form";
import { usePeriodActionPlansContext } from "../PeriodActionPlansContext/usePeriodActionPlansContext";
import { periodActionPlanServices } from "@/app/services/periodActionPlanServices";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { customColorToast } from "@/app/utils/customColorToast";
import { useNavigate } from "react-router-dom";
import { treatAxiosError } from "@/app/utils/treatAxiosError";
import { useTheme } from "@/app/contexts/ThemeContext";
import { AxiosError } from "axios";
import { ChangeEvent, DragEvent, useState } from "react";
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

export const useNewPeriodActionPlanModal = () => {
  const {
    isNewPeriodActionPlanModalOpen,
    closeNewPeriodActionPlanModal,
    handleRefechPeriodsActionPlans,
    periodId,
    efficiency,
    canUserFinishPeriodActionPlan,
  } = usePeriodActionPlansContext();

  const {
    isPending: isLoadingNewPeriodActionPlan,
    mutateAsync: mutateNewPeriodActionPlanAsync,
  } = useMutation({
    mutationFn: periodActionPlanServices.create,
  });

  const { isPending: isLoadingUploadFile, mutateAsync: mutateUploadFileAsync } =
    useMutation({
      mutationFn: filesService.uploadPeriodActionPlanFile,
    });

  const { primaryColor } = useTheme();

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [isUploadingFile, setIsUploadingFile] = useState<boolean>(false);
  const [filesArray, setFilesArray] = useState<File[]>([]);
  const [isPendingUploadingFile, setIsPendingUploadingFile] = useState<boolean>(false);

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

  const {
    control,
    handleSubmit: hookFormhandleSubmit,
    formState: { errors },
    watch,
  } = useForm<ActionPlanFormValues>({
    defaultValues: {
      title: "",
      periodActionPlanItems: [
        {
          sequenceNumber: 1,
          task: "",
          assignee: "",
          dueDate: new Date(),
          reason: "",
          instructions: "",
          notes: "",
        },
      ],
    },
    resolver: zodResolver(actionPlanSchema),
  });

  const navigate = useNavigate();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "periodActionPlanItems",
  });

  const openUploadFilesModal = () => {
    setIsUploadingFile(true);
  };

  const closeUploadFilesModal = () => {
    setIsUploadingFile(false);
  };

  const handleSubmit = hookFormhandleSubmit(async (data) => {
    try {
      const periodActionPlan = await mutateNewPeriodActionPlanAsync({
        periodId: periodId!,
        title: data.title,
        rigId: efficiency?.rigId!,
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
              periodActionPlanId: periodActionPlan.id!,
              formData: formData,
            });
            console.log(`Arquivo ${file.name} enviado com sucesso.`);
          } catch (error) {
            console.error(`Erro ao enviar o arquivo ${file.name}:`, error);
          }
        }
      }

      setIsPendingUploadingFile(false);

      customColorToast("Registro feito com Sucesso!", primaryColor, "success");
      handleRefechPeriodsActionPlans();
      navigate("/period-action-plan");
      closeNewPeriodActionPlanModal();
    } catch (error: any | typeof AxiosError) {
      treatAxiosError(error);
      console.log(error);
      //navigate("/dashboard");
    }
  });

  return {
    isNewPeriodActionPlanModalOpen,
    closeNewPeriodActionPlanModal,
    fields,
    append,
    remove,
    control,
    errors,
    watch,
    handleSubmit,
    isPending:
      isLoadingNewPeriodActionPlan || isPendingUploadingFile || isLoadingUploadFile,
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
    canUserFinishPeriodActionPlan,
  };
};
