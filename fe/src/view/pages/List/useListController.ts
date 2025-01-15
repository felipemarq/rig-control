import { useAuth } from "../../../app/hooks/useAuth";
import { useRigs } from "../../../app/hooks/rigs/useRigs";
import { useEfficiencies } from "../../../app/hooks/efficiencies/useEfficiencies";
import { years } from "../../../app/utils/years";
import { useFiltersContext } from "../../../app/hooks/useFiltersContext";
import { filterOptions } from "../../../app/utils/filterOptions";
import { pdfEfficiencyReport } from "@/app/services/efficienciesService/pdfEfficiencyReport";
import { saveAs } from "file-saver";

export const useListController = () => {
  const { user, signout } = useAuth();

  const isUserAdm = user?.accessLevel === "ADM";

  const { rigs } = useRigs(isUserAdm);

  const userRig =
    user?.rigs.map(({ rig: { id, name } }) => {
      return {
        id,
        name,
      };
    }) || [];

  const { filters } = useFiltersContext();

  const { efficiencies, isFetchingEfficiencies, refetchEffciencies } =
    useEfficiencies(filters);

  const isEmpty: boolean = efficiencies.length === 0;

  const handleApplyFilters = () => {
    refetchEffciencies();
  };

  const handlePdfDownload = async () => {
    try {
      const data = await pdfEfficiencyReport(filters);
      const blob = new Blob([data], { type: "application/pdf" });
      saveAs(blob, "relatorio.pdf");
    } catch (error) {
      console.error("Erro ao baixar o relatório", error);
    }
  };

  return {
    handleApplyFilters,
    efficiencies,
    isFetchingEfficiencies,
    user,
    rigs: isUserAdm ? rigs : userRig,
    signout,
    isEmpty,
    filterOptions,
    years,
    handlePdfDownload,
  };
};
