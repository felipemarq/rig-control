import { useFieldArray, useForm } from "react-hook-form";
import { periodActionPlanServices } from "@/app/services/periodActionPlanServices";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { customColorToast } from "@/app/utils/customColorToast";
import { useNavigate } from "react-router-dom";
import { treatAxiosError } from "@/app/utils/treatAxiosError";
import { useTheme } from "@/app/contexts/ThemeContext";
import { AxiosError } from "axios";
import { ChangeEvent, DragEvent, useEffect, useState } from "react";
import { filesService } from "@/app/services/filesService";
import { useChecklistsContext } from "../../ChecklistsContext/useChecklistsContext";
import { description } from "@/view/pages/BillingDashboard";
import { useChecklistItems } from "@/app/hooks/checklists/useChecklistItems";

const actionPlanSchema = z.object({
  rigId: z.string().min(1, "A sonda é obrigatória."),
  date: z.date({ required_error: "A data é obrigatória" }),
  well: z.string().min(1, "O poço é obrigatório"),
  supervisor: z.string().min(1, "O encarregado é obrigatório"),
  team: z.string().min(1, "O encarregado é obrigatório"),
  title: z.string().min(1, "O título é obrigatório"),
  evaluations: z
    .array(
      z.object({
        checklistItemId: z.string().min(1, "A item de avaliação é obrigatório"),
        rating: z.number().min(1, "A pontuação é obrigatório"),
        description: z.string().min(1, "A descrição é obrigatório"),
        category: z.string().min(1, "A categoria é obrigatória"),
        weight: z.number().min(1, "O peso é obrigatório"),
        comment: z.string().optional(),
      })
    )
    .min(1, "Adicione pelo menos um item ao plano de ação"),
});

type ActionPlanFormValues = z.infer<typeof actionPlanSchema>;

export const useNewPeriodActionPlanModal = () => {
  const { isNewChecklistModalOpen, openNewChecklistModal, closeNewChecklistModal, rigs } =
    useChecklistsContext();

  const { checklistItems } = useChecklistItems();

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
    reset,
  } = useForm<ActionPlanFormValues>({
    defaultValues: {
      title: "",
      evaluations: [
        {
          checklistItemId: "",
          rating: 0,
          category: "",
          comment: "",
          description: "",
          weight: 0,
        },
      ],
    },
    resolver: zodResolver(actionPlanSchema),
  });

  useEffect(() => {
    if (checklistItems.length > 0) {
      reset({
        title: "",
        evaluations: checklistItems.map((item) => ({
          checklistItemId: item.id,
          rating: 0,
          category: item.category,
          comment: "",
          description: item.description,
          weight: item.weight,
        })),
      });
    }
  }, [checklistItems, reset]);

  const navigate = useNavigate();

  const evaluations = watch("evaluations");

  console.log("evaluations", evaluations);
  console.log("checklistItems", checklistItems);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "evaluations",
  });

  const openUploadFilesModal = () => {
    setIsUploadingFile(true);
  };

  const closeUploadFilesModal = () => {
    setIsUploadingFile(false);
  };

  /*   const handleSubmit = hookFormhandleSubmit(async (data) => {
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
  }); */

  return {
    isNewChecklistModalOpen,
    closeNewChecklistModal,
    fields,
    append,
    remove,
    control,
    errors,
    watch,
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
    rigs,
    primaryColor,
    evaluations,
  };
};
