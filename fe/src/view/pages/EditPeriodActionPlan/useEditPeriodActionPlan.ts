import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { periodActionPlanServices } from "@/app/services/periodActionPlanServices";
import { treatAxiosError } from "@/app/utils/treatAxiosError";
import { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { customColorToast } from "@/app/utils/customColorToast";
import { useTheme } from "@/app/contexts/ThemeContext";
import { usePeriodActionPlan } from "@/app/hooks/periodActionPlans/usePeriodActionPlan";
import { useEffect } from "react";
import { QueryKeys } from "@/app/config/QueryKeys";

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

export const useEditPeriodActionPlan = () => {
  const { periodActionPlanId } = useParams();
  const { primaryColor } = useTheme();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isPending, mutateAsync: mutateEditPeriodActionPlanAsync } = useMutation({
    mutationFn: periodActionPlanServices.update,
  });

  const { periodActionPlan } = usePeriodActionPlan(periodActionPlanId!);

  const {
    control,
    handleSubmit: hookFormhandleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ActionPlanFormValues>({
    defaultValues: {
      title: periodActionPlan?.title ?? "",
      finishedAt: new Date(periodActionPlan?.finishedAt!),
      isFinished: periodActionPlan?.isFinished,
      periodActionPlanItems: periodActionPlan
        ? periodActionPlan?.periodActionPlanItems.map((periodActionPlanItem) => ({
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

  const isFinished = watch("isFinished");

  const { fields, append, remove } = useFieldArray({
    control,
    name: "periodActionPlanItems",
  });

  console.log(periodActionPlan?.finishedAt);

  // Atualiza os valores do formulário quando os dados de periodActionPlan são carregados
  useEffect(() => {
    if (periodActionPlan) {
      reset({
        title: periodActionPlan.title ?? "",
        finishedAt: new Date(periodActionPlan.finishedAt!),
        isFinished: periodActionPlan.isFinished,
        periodActionPlanItems: periodActionPlan.periodActionPlanItems.map((item) => ({
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
  }, [periodActionPlan, reset]); // Executa apenas quando periodActionPlan muda

  const handleSubmit = hookFormhandleSubmit(async (data) => {
    try {
      await mutateEditPeriodActionPlanAsync({
        id: periodActionPlan?.id!,
        periodId: periodActionPlan?.periodId!,
        title: data.title,
        rigId: periodActionPlan?.rigId!,
        finishedAt: data.finishedAt,
        isFinished: data.isFinished,
        periodActionPlanItems: data.periodActionPlanItems.map((periodActionPlanItem) => ({
          ...periodActionPlanItem,
          dueDate: periodActionPlanItem.dueDate.toISOString(),
          finishedAt: periodActionPlanItem.finishedAt?.toISOString(),
        })),
      });
      customColorToast("Registro editado com Sucesso!", primaryColor, "success");
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
    equipment: periodActionPlan?.period.classification,
    repairClassification: periodActionPlan?.period.repairClassification,
    rigName: periodActionPlan?.rig.name,
    isPending,
    control,
    errors,
    fields,
    append,
    remove,
    handleSubmit,
    isFinished,
    watch,
  };
};
