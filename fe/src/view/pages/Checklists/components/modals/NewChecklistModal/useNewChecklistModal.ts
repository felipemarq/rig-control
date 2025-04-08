import { useFieldArray, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { customColorToast } from "@/app/utils/customColorToast";
import { treatAxiosError } from "@/app/utils/treatAxiosError";
import { useTheme } from "@/app/contexts/ThemeContext";
import { AxiosError } from "axios";
import { useChecklistsContext } from "../../ChecklistsContext/useChecklistsContext";
import { useChecklistItems } from "@/app/hooks/checklists/useChecklistItems";
import { checklistsService } from "@/app/services/checklistsService";
import { filesService } from "@/app/services/filesService";

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
        number: z.number().min(1, "A ordem é obrigatória"),
        checklistItemId: z.string().min(1, "A item de avaliação é obrigatório"),
        rating: z.number().min(0, "A pontuação é obrigatório"),
        description: z.string().min(1, "A descrição é obrigatório"),
        category: z.string().min(1, "A categoria é obrigatória"),
        weight: z.number().min(1, "O peso é obrigatório"),
        comment: z.string().optional(),
        file: z.instanceof(File).optional(),
      }),
    )
    .min(1, "Adicione pelo menos um item ao plano de ação"),
});

type ActionPlanFormValues = z.infer<typeof actionPlanSchema>;

export const useNewChecklistModal = () => {
  const {
    isNewChecklistModalOpen,
    closeNewChecklistModal,
    rigs,
    handleRefechChecklists,
  } = useChecklistsContext();

  const [isUploadingFiles, setIsUploadingFiles] = useState(false);

  const { checklistItems } = useChecklistItems();

  const { isPending: isLoadingChecklist, mutateAsync: mutateChecklistAsync } =
    useMutation({
      mutationFn: checklistsService.create,
    });

  const { primaryColor } = useTheme();
  const {
    control,
    handleSubmit: hookFormhandleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ActionPlanFormValues>({
    defaultValues: {
      title: "",
      evaluations: [
        {
          number: 1,
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
    return () => {
      reset(); // cleanup on unmount
    };
  }, [reset]);

  const watchForm = watch();
  console.log("watchForm", watchForm);

  useEffect(() => {
    if (checklistItems.length > 0) {
      reset({
        title: "",
        evaluations: checklistItems.map((item) => ({
          number: item.number,
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

  const { fields } = useFieldArray({
    control,
    name: "evaluations",
  });

  const handleSubmit = hookFormhandleSubmit(async (data) => {
    try {
      setIsUploadingFiles(true);
      let evaluationsWithFiles = [];

      for (const evaluation of data.evaluations) {
        let fileId = null;
        if (evaluation.file) {
          const uploadedFile = await filesService.uploadFile({
            file: evaluation.file,
          });
          fileId = uploadedFile.id;
        }

        evaluationsWithFiles.push({
          checklistItemId: evaluation.checklistItemId,
          rating: evaluation.rating,
          comment: evaluation.comment ?? "",
          fileId,
        });
      }

      setIsUploadingFiles(false);

      await mutateChecklistAsync({
        rigId: data.rigId,
        date: data.date?.toISOString()!,
        well: data.well,
        title: data.title,
        supervisor: data.supervisor,
        team: data.team,
        evaluations: evaluationsWithFiles,
      });

      customColorToast("Registro feito com Sucesso!", primaryColor, "success");
      handleRefechChecklists();
      //navigate("/checklist");
      closeNewChecklistModal();
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
      window.location.reload();
    } catch (error: any | typeof AxiosError) {
      treatAxiosError(error);
      console.log(error);
      //navigate("/dashboard");
    }
  });

  return {
    isNewChecklistModalOpen,
    closeNewChecklistModal,
    control,
    errors,
    fields,
    isPending: isLoadingChecklist || isUploadingFiles,
    primaryColor,
    rigs,
    handleSubmit,
  };
};
