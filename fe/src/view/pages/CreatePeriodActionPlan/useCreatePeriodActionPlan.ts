import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { periodActionPlanServices } from "@/app/services/periodActionPlanServices";
import { treatAxiosError } from "@/app/utils/treatAxiosError";
import { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { customColorToast } from "@/app/utils/customColorToast";
import { useTheme } from "@/app/contexts/ThemeContext";

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

export const useCreatePeriodActionPlan = () => {
  const { state } = useLocation();
  const { periodId } = useParams();
  const { primaryColor } = useTheme();
  const navigate = useNavigate();

  const { equipment, repairClassification, date, rigName, rigId } = state;

  const { isPending, mutateAsync: mutateNewPeriodActionPlanAsync } = useMutation({
    mutationFn: periodActionPlanServices.create,
  });

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

  const { fields, append, remove } = useFieldArray({
    control,
    name: "periodActionPlanItems",
  });

  const handleSubmit = hookFormhandleSubmit(async (data) => {
    try {
      await mutateNewPeriodActionPlanAsync({
        periodId: periodId!,
        title: data.title,
        rigId: rigId,
        finishedAt: data.finishedAt,
        isFinished: data.isFinished,
        periodActionPlanItems: data.periodActionPlanItems.map((periodActionPlanItem) => ({
          ...periodActionPlanItem,
          dueDate: periodActionPlanItem.dueDate.toISOString(),
          finishedAt: periodActionPlanItem.finishedAt?.toISOString(),
        })),
      });
      customColorToast("Registro feito com Sucesso!", primaryColor, "success");
      navigate("/period-action-plan");
    } catch (error: any | typeof AxiosError) {
      treatAxiosError(error);
      console.log(error);
      //navigate("/dashboard");
    }
  });

  return {
    equipment,
    repairClassification,
    date,
    rigName,
    isPending,
    control,
    errors,
    fields,
    append,
    remove,
    handleSubmit,
    watch,
  };
};
