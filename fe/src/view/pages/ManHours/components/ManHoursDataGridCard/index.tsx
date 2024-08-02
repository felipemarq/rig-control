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

export const ManHoursDataGridCard = () => {
  const { onUpdateCell, isLoadingManHours, dataGridData, isFetchingManHours } =
    useManHoursController();
  return (
    <Card className="w-full h-full overflow-y-auto">
      <CardHeader>
        <CardTitle>Homem Hora Trabalhadas</CardTitle>
        <CardDescription>
          Registro de homem hora por instalação, para editar clique duas vezes
          sobre a célula da tabela
        </CardDescription>
      </CardHeader>
      <CardContent className="">
        {dataGridData.length > 0 && !isFetchingManHours && (
          <ManHoursDataGrid
            data={dataGridData}
            isDashboard={false}
            onUpdateCell={onUpdateCell}
            isLoading={isLoadingManHours}
          />
        )}

        {dataGridData.length === 0 && !isFetchingManHours && (
          <NotFound>Not Found</NotFound>
        )}
      </CardContent>
    </Card>
  );
};
