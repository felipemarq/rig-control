import { useFieldArray, useForm } from "react-hook-form";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { customColorToast } from "@/app/utils/customColorToast";
import { treatAxiosError } from "@/app/utils/treatAxiosError";
import { useTheme } from "@/app/contexts/ThemeContext";
import { AxiosError } from "axios";
import { useChecklistsContext } from "../../ChecklistsContext/useChecklistsContext";
import { checklistsService } from "@/app/services/checklistsService";
import { filesService } from "@/app/services/filesService";

const checklistSchema = z.object({
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
        evaluationId: z.string().min(1, "A item de avaliação é obrigatório"),
        id: z.string().min(1, "A item de avaliação é obrigatório"),
        checklistItemId: z.string().min(1, "A item de avaliação é obrigatório"),
        rating: z.number().min(0, "A pontuação é obrigatório"),
        description: z.string().min(1, "A descrição é obrigatório"),
        category: z.string().min(1, "A categoria é obrigatória"),
        weight: z.number().min(1, "O peso é obrigatório"),
        comment: z.string().optional(),
        filePath: z.string().optional(),
        file: z.instanceof(File).optional(),
      }),
    )
    .min(1, "Adicione pelo menos um item ao plano de ação"),
});

type ChecklistFormValues = z.infer<typeof checklistSchema>;

export const useEditChecklistModal = () => {
  const {
    isEditChecklistModalOpen,
    closeEditChecklistModal,
    rigs,
    handleRefechChecklists,
    checklistBeingSeen,
  } = useChecklistsContext();

  //const { checklistItems } = useChecklistItems();

  const {
    isPending: isLoadingUpdateChecklist,
    mutateAsync: mutateUpdateChecklistAsync,
  } = useMutation({
    mutationFn: checklistsService.update,
  });

  const {
    isPending: isLoadingDeleteEvaluationFile,
    mutateAsync: mutateDeleteEvaluationFileAsync,
  } = useMutation({
    mutationFn: filesService.deleteEvaluationFile,
  });

  const {
    isPending: isUploadingEvaluationFile,
    mutateAsync: mutateUploadEvaluationFile,
  } = useMutation({
    mutationFn: filesService.uploadEvaluationFile,
  });

  const { primaryColor } = useTheme();
  const {
    control,
    handleSubmit: hookFormhandleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChecklistFormValues>({
    defaultValues: {
      title: checklistBeingSeen?.title ?? "",
      rigId: checklistBeingSeen?.rigId ?? "",
      date: new Date(checklistBeingSeen?.date!) ?? new Date(),
      well: checklistBeingSeen?.well.name ?? "",
      supervisor: checklistBeingSeen?.supervisor ?? "",
      team: checklistBeingSeen?.team ?? "",
      evaluations: checklistBeingSeen?.evaluations.map((evaluation) => ({
        id: evaluation.id,
        evaluationId: evaluation.id,
        number: evaluation.checklistItem.number,
        category: evaluation.checklistItem.category,
        description: evaluation.checklistItem.description,
        weight: evaluation.checklistItem.weight,
        checklistItemId: evaluation.checklistItemId,
        comment: evaluation.comment,
        rating: evaluation.rating,
        filePath: evaluation.files?.[0]?.path,
      })),
    },
    resolver: zodResolver(checklistSchema),
  });

  useEffect(() => {
    if (checklistBeingSeen) {
      reset({
        title: checklistBeingSeen?.title ?? "",
        rigId: checklistBeingSeen?.rigId ?? "",
        date: new Date(checklistBeingSeen?.date!) ?? new Date(),
        well: checklistBeingSeen?.well.name ?? "",
        supervisor: checklistBeingSeen?.supervisor ?? "",
        team: checklistBeingSeen?.team ?? "",
        evaluations: checklistBeingSeen?.evaluations.map((evaluation) => ({
          id: evaluation.id,
          evaluationId: evaluation.id,
          category: evaluation.checklistItem.category,
          description: evaluation.checklistItem.description,
          weight: evaluation.checklistItem.weight,
          checklistItemId: evaluation.checklistItemId,
          comment: evaluation.comment ?? "",
          rating: evaluation.rating,
          filePath: evaluation.files?.[0]?.path,
        })),
      });
    }
  }, [checklistBeingSeen, reset]);

  const { fields, update } = useFieldArray({
    control,
    name: "evaluations",
    keyName: "id",
  });

  const handleDeleteEvaluationFile = async (
    evaluationIndex: number,
    evaluationId: string,
  ) => {
    try {
      await mutateDeleteEvaluationFileAsync(evaluationId);

      // Remove o filePath do campo correspondente
      update(evaluationIndex, {
        ...fields[evaluationIndex],
        filePath: undefined, // ou "" se preferir
      });
    } catch (error) {
      console.error("Erro ao deletar arquivo:", error);
    }
  };

  const handleUploadEvaluationFile = async (
    index: number,
    evaluationId: string,
    file: File,
  ) => {
    try {
      const response = await mutateUploadEvaluationFile({ file, evaluationId });

      // Atualiza o campo filePath após o upload bem-sucedido
      update(index, {
        ...fields[index],
        filePath: response.path, // Supondo que o backend retorna o caminho do arquivo
        file: undefined, // Limpa o campo de arquivo
      });

      customColorToast("Arquivo enviado com sucesso!", primaryColor, "success");
    } catch (error) {
      console.error("Erro ao enviar arquivo:", error);
    }
  };

  const handleSubmit = hookFormhandleSubmit(async (data) => {
    try {
      await mutateUpdateChecklistAsync({
        id: checklistBeingSeen?.id!,
        rigId: data.rigId,
        date: data.date?.toISOString()!,
        well: data.well,
        title: data.title,
        supervisor: data.supervisor,
        team: data.team,
        evaluations: data.evaluations,
      });

      customColorToast("Registro feito com Sucesso!", primaryColor, "success");
      handleRefechChecklists();
      //navigate("/checklist");
      closeEditChecklistModal();
    } catch (error: any | typeof AxiosError) {
      treatAxiosError(error);
      console.log(error);
      //navigate("/dashboard");
    }
  });

  return {
    isEditChecklistModalOpen,
    closeEditChecklistModal,
    control,
    errors,
    fields,
    isPending:
      isLoadingUpdateChecklist ||
      isLoadingDeleteEvaluationFile ||
      isUploadingEvaluationFile,
    primaryColor,
    rigs,
    handleSubmit,
    handleDeleteEvaluationFile,
    isLoadingDeleteEvaluationFile,
    handleUploadEvaluationFile,
    isUploadingEvaluationFile,
  };
};
