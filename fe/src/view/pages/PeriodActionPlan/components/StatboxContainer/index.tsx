import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { usePeriodActionPlansContext } from "../PeriodActionPlansContext/usePeriodActionPlansContext";
export const StatboxContainer = () => {
  const {
    dashboardIndicators: {
      totalActionPlans,
      completionRate,
      averageRepairDuration,
      pendingActionPlans,
    },
  } = usePeriodActionPlansContext();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total de Planos</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalActionPlans}</div>
          <p className="text-xs text-muted-foreground">
            Total de planos de ação criados no periodo selecionado
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total de Planos em Aberto
          </CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{pendingActionPlans}</div>
          <p className="text-xs text-muted-foreground">
            Total de planos de ação ainda não finalizados no periodo selecionado
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Taxa de Conclusão
          </CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{completionRate.toFixed(2)}%</div>
          <p className="text-xs text-muted-foreground">
            Taxa de conclusão dos planos de ação no periodo selecionado
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Tempo Médio de Execução
          </CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {averageRepairDuration.toFixed(2)} Hrs
          </div>
          <p className="text-xs text-muted-foreground">
            Tempo médio de duração dos reparos no periodo selecionado
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
