import { QueryKeys } from "@/app/config/QueryKeys";
import { useTheme } from "@/app/contexts/ThemeContext";
import { useManHours } from "@/app/hooks/manHours/useManHours";
import { manHoursService } from "@/app/services/manHoursService";
import { ManHourFilters } from "@/app/services/manHoursService/getAll";
import { customColorToast } from "@/app/utils/customColorToast";
import {
  TransformedManHoursData,
  transformManHoursData,
} from "@/app/utils/transformManHoursData";
import { treatAxiosError } from "@/app/utils/treatAxiosError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";

export const useManHoursController = () => {
  const [filters, setFilters] = useState<ManHourFilters>({ year: "2025" });
  const { manHours, isFetchingManHours, refetchManHours } = useManHours(filters);
  const queryClient = useQueryClient();
  const { primaryColor } = useTheme();

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

  const handleApplyFilters = useCallback(() => {
    refetchManHours();
  }, []);

  useEffect(() => {
    handleApplyFilters();
  }, [filters]);

  function handleChangeFilters<TFilter extends keyof ManHourFilters>(filter: TFilter) {
    return (value: ManHourFilters[TFilter]) => {
      if (value === filters[filter]) return;

      setFilters((prevState) => ({
        ...prevState,
        [filter]: value,
      }));
    };
  }

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

      customColorToast("Registro atualizado com Sucesso!", primaryColor, "success");

      refetchManHours();
    } catch (error: any | typeof AxiosError) {
      treatAxiosError(error);
      console.log(error);
      //navigate("/dashboard");
    }
  };

  const dataGridData: TransformedManHoursData[] = transformManHoursData(manHours);

  return {
    dataGridData,
    isFetchingManHours,
    onUpdateCell,
    isLoadingManHours,
    handleChangeFilters,
    handleApplyFilters,
    filters,
  };
};
