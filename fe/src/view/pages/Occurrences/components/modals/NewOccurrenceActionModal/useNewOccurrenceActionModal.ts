import { useOccurrencesContext } from "../../OccurrencesContext/useOccurencesContext";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, DragEvent, useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { treatAxiosError } from "@/app/utils/treatAxiosError";
import { customColorToast } from "@/app/utils/customColorToast";
import { QueryKeys } from "@/app/config/QueryKeys";
import { natureSelectOptions } from "../../../utils/natureSelectOptions";
import { filesService } from "@/app/services/filesService";
import { occurrencesActionsService } from "@/app/services/occurrencesActionsService";

const schema = z.object({
  dueDate: z.date(),
  title: z.string().min(1, "Obrigatório."),
  responsible: z.string().min(1, "Obrigatório."),
  isFinished: z.boolean(),
  description: z.string().min(1, "Descrição é obrigatório."),
});

export type FormData = z.infer<typeof schema>;

export const useNewOccurrenceActionModal = () => {
  const {
    closeNewOccurrenceActionModal,
    isNewOccurrenceActionModalOpen,
    occurenceIdActionPlanBeingSeen,
  } = useOccurrencesContext();

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);

  const previewURL = useMemo(() => {
    if (!file) {
      return null;
    }

    return URL.createObjectURL(file);
  }, [file]);

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

    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  /*  console.log("selectedSeverity", selectedSeverity);
  console.log("errors", errors);
  occurrenceSeveritySelectOptions;
  console.log(
    "occurrenceSeveritySelectOptions",
    occurrenceSeveritySelectOptions
  ); */

  const queryClient = useQueryClient();

  const { isPending: isLoadingNewOccurrence, mutateAsync: mutateNewOccurrenceAsync } =
    useMutation({
      mutationFn: occurrencesActionsService.create,
    });

  const { isPending: isLoadingUploadFile } = useMutation({
    mutationFn: filesService.create,
  });

  //console.log("errors", errors);

  const handleSubmit = hookFormhandleSubmit(async (data) => {
    console.log("data", data);
    try {
      await mutateNewOccurrenceAsync({
        dueDate: data.dueDate?.toISOString(),
        description: data.description,
        isFinished: data.isFinished,
        occurrenceId: occurenceIdActionPlanBeingSeen!,
        responsible: data.responsible,
        title: data.title,
      });

      /* if (file) {
        await mutateUploadFileAsync({
          occurrenceId: occurrence.id,
          file: file,
        });
      } */

      setFile(null);

      if (file) {
        window.location.reload();
      }

      queryClient.invalidateQueries({ queryKey: [QueryKeys.OCCURRENCES_ACTIONS] });
      closeNewOccurrenceActionModal();
      customColorToast("Registro feito com Sucesso!", "#1c7b7b", "success");
    } catch (error: any | typeof AxiosError) {
      treatAxiosError(error);
      console.log(error);
      //navigate("/dashboard");
    }
  });

  return {
    closeNewOccurrenceActionModal,
    isNewOccurrenceActionModalOpen,
    natureSelectOptions,
    control,
    handleSubmit,
    isLoadingNewOccurrence: isLoadingUploadFile || isLoadingNewOccurrence,
    errors,
    previewURL,
    handleFileSelected,
    handleDrop,
    handleDragOver,
    file,
    isDragging,
    handleDragLeave,
  };
};
