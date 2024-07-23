import { QueryKeys } from "@/app/config/QueryKeys";
import { useManHours } from "@/app/hooks/manHours/useManHours";
import { manHoursService } from "@/app/services/manHoursService";
import { customColorToast } from "@/app/utils/customColorToast";
import {
  TransformedManHoursData,
  transformManHoursData,
} from "@/app/utils/transformManHoursData";
import { treatAxiosError } from "@/app/utils/treatAxiosError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useManHoursController = () => {
  const { manHours, isFetchingManHours, refetchManHours } = useManHours();
  const queryClient = useQueryClient();

  const monthNames = {
    Janeiro: 1,
    Fevereiro: 2,
    Março: 3,
    Abril: 4,
    Maio: 5,
    Junho: 6,
    Julho: 7,
    Agosto: 8,
    Setembro: 9,
    Outubro: 10,
    Novembro: 11,
    Dezembro: 12,
  };

  type Month = keyof typeof monthNames;

  const { isPending: isLoadingManHours, mutateAsync } = useMutation({
    mutationFn: manHoursService.update,
  });

  const onUpdateCell = async (id: string, month: Month, value: string) => {
    const manHourFound = manHours.find(
      (manHour) => manHour.baseId === id && manHour.month === monthNames[month]
    );

    try {
      await mutateAsync({
        id: manHourFound?.id!,
        baseId: manHourFound?.baseId!,
        hours: Number(value),
        month: manHourFound?.month!,
        year: manHourFound?.year!,
      });

      queryClient.invalidateQueries({ queryKey: [QueryKeys.MAN_HOURS] });

      customColorToast(
        "Registro atualizado com Sucesso!",
        "#1c7b7b",
        "success"
      );

      refetchManHours();
    } catch (error: any | typeof AxiosError) {
      treatAxiosError(error);
      console.log(error);
      //navigate("/dashboard");
    }
  };

  console.log(manHours);

  const dataGridData: TransformedManHoursData[] =
    transformManHoursData(manHours);

  console.log(dataGridData);

  return {
    dataGridData,
    isFetchingManHours,
    onUpdateCell,
    isLoadingManHours,
  };
};
