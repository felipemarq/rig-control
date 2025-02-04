import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ManHoursDataGrid } from "./components/ManHoursDataGrid";
import { useManHoursController } from "../../useManHoursController";
import { NotFound } from "@/view/components/NotFound";
import { Spinner } from "@/view/components/Spinner";

export const ManHoursDataGridCard = () => {
  const { onUpdateCell, isLoadingManHours, dataGridData, isFetchingManHours } =
    useManHoursController();

  return (
    <Card className="w-full h-full overflow-y-auto">
      <CardHeader>
        <CardTitle>Homem Hora Trabalhadas</CardTitle>
        <CardDescription>
          Registro de homem hora por instalação, para editar clique duas vezes sobre a
          célula da tabela
        </CardDescription>
      </CardHeader>
      <CardContent className="">
        {isFetchingManHours && (
          <div className="flex items-center justify-center w-full h-full">
            <Spinner />
          </div>
        )}
        {dataGridData.length > 0 && !isFetchingManHours && (
          <ManHoursDataGrid
            data={dataGridData}
            isDashboard={false}
            onUpdateCell={onUpdateCell}
            isLoading={isFetchingManHours || isLoadingManHours}
          />
        )}

        {dataGridData.length === 0 && !isFetchingManHours && (
          <NotFound>Not Found</NotFound>
        )}
      </CardContent>
    </Card>
  );
};
