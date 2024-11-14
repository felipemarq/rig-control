import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Loader2 } from "lucide-react";
import TextArea from "antd/es/input/TextArea";
import { FeedbackStatus, FeedbackType } from "@/app/entities/Feedback";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { feedbackService } from "@/app/services/feedbackService";
import { customColorToast } from "@/app/utils/customColorToast";
import { useTheme } from "@/app/contexts/ThemeContext";
import { treatAxiosError } from "@/app/utils/treatAxiosError";
import { AxiosError } from "axios";
import { useState } from "react";

const schema = z.object({
  type: z.nativeEnum(FeedbackType),
  status: z.nativeEnum(FeedbackStatus).optional(),
  description: z.string().min(1, "Obrigatório."),
});

type FormData = z.infer<typeof schema>;

export default function FeedbackModal({ children }: { children: React.ReactNode }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Controla a abertura do dialog
  const { isPending: isLoadingNewFeedback, mutateAsync: mutateNewFeedbackAsync } =
    useMutation({
      mutationFn: feedbackService.create,
    });

  const { primaryColor } = useTheme();

  const { handleSubmit: hookFormhandleSubmit, control } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handleSubmit = hookFormhandleSubmit(async (data) => {
    try {
      await mutateNewFeedbackAsync({
        description: data.description,
        type: data.type,
      });

      customColorToast("Registro feito com Sucesso!", primaryColor, "success");
      setIsDialogOpen(false); // Fecha o dialog ao enviar com sucesso
    } catch (error: any | typeof AxiosError) {
      treatAxiosError(error);
      console.log(error);
      //navigate("/dashboard");
    }
  });

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild onClick={() => setIsDialogOpen(true)}>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="text-gray-800">Enviar Feedback</DialogTitle>
          <DialogDescription>
            Compartilhe suas ideias ou relate problemas para nos ajudar a melhorar.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <Controller
              control={control}
              name="type"
              shouldUnregister={true}
              render={({ field: { onChange } }) => (
                <RadioGroup onValueChange={(value: FeedbackType) => onChange(value)}>
                  <div className="flex items-center space-x-2 text-gray-800">
                    <RadioGroupItem value="SUGESTION" id="SUGESTION" />
                    <Label htmlFor="SUGESTION">Sugestão</Label>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-800">
                    <RadioGroupItem value="PROBLEM" id="PROBLEM" />
                    <Label htmlFor="PROBLEM">Problema</Label>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-800">
                    <RadioGroupItem value="OTHER" id="other" />
                    <Label htmlFor="other">Outro</Label>
                  </div>
                </RadioGroup>
              )}
            />

            <div className="grid gap-2 text-gray-800">
              <Label htmlFor="description">Seu feedback</Label>

              <Controller
                control={control}
                name="description"
                shouldUnregister={true}
                render={({ field: { onChange, value } }) => (
                  <TextArea
                    id="description"
                    placeholder="Descreva sua sugestão ou problema..."
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    required
                  />
                )}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoadingNewFeedback}>
              {isLoadingNewFeedback ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                "Enviar feedback"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
