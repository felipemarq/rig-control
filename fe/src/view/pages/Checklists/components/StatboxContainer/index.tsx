import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { useChecklistsContext } from "../ChecklistsContext/useChecklistsContext";
export const StatboxContainer = () => {
  const { statBoxContainerValues } = useChecklistsContext();

  const {
    totalCriticalEvaluations,
    totalEvaluations,
    totalInspections,
    totalScore,
  } = statBoxContainerValues;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Média Geral</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {(totalScore / totalInspections).toFixed(2)}%
          </div>
          <p className="text-xs text-muted-foreground">
            Média Geral de todas a
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Inspeções Realizadas
          </CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalInspections}</div>
          <p className="text-xs text-muted-foreground">
            Quantidade de avaliações cadastradas no periodo selecionado
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Avaliações Criadas
          </CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalEvaluations}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Itens Critícos</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalCriticalEvaluations}</div>
          <p className="text-xs text-muted-foreground">
            Itens com avaliação abaixo do esperado
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
