import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FileClock, TimerIcon, TimerOff, Wrench } from "lucide-react";
import { useStatboxContainer } from "./useStatboxContainer";
import { Spinner } from "@/view/components/Spinner";

export const StatboxContainer = () => {
  const {
    averageHours,
    averageHoursPercentage,
    glossHours,
    repairHours,
    averageUnavailableHours,
    isFetchingRigsAverage,
    selectedDashboardView,
  } = useStatboxContainer();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Eficiência Operacional
          </CardTitle>
          <TimerIcon className="h-8 w-8 text-muted-foreground" />
        </CardHeader>
        {isFetchingRigsAverage && (
          <CardContent className="w-full  flex justify-center items-center">
            <Spinner />
          </CardContent>
        )}
        {!isFetchingRigsAverage && (
          <>
            {" "}
            <CardContent>
              <div className="text-2xl font-bold">{`${averageHoursPercentage} %`}</div>
              <p className="text-xs text-muted-foreground">
                {` Média de disp. diária ${averageHours} Hrs`}
              </p>
            </CardContent>
            <CardFooter>
              <Progress value={averageHoursPercentage} />
            </CardFooter>
          </>
        )}
      </Card>
      <Card x-chunk="dashboard-01-chunk-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-redAccent-500">
            Indisp. Diária
          </CardTitle>
          <TimerOff className="h-8 w-8 text-muted-foreground text-redAccent-500" />
        </CardHeader>

        {isFetchingRigsAverage && (
          <CardContent className="w-full  flex justify-center items-center">
            <Spinner />
          </CardContent>
        )}
        {!isFetchingRigsAverage && (
          <>
            {" "}
            <CardContent>
              <div className="text-2xl font-bold text-redAccent-500">{`${averageUnavailableHours.toFixed(
                2,
              )} Horas`}</div>
              <p className="text-xs text-muted-foreground text-redAccent-500">
                Média de indisponibilidade diária
              </p>
            </CardContent>
            <CardFooter>
              <Progress
                value={100 - averageHoursPercentage}
                indicatorColor="bg-redAccent-500"
                className="bg-redAccent-500/20"
              />
            </CardFooter>
          </>
        )}
      </Card>
      <Card x-chunk="dashboard-01-chunk-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-redAccent-500">
            Reparo
          </CardTitle>
          <Wrench className="h-8 w-8 text-muted-foreground text-redAccent-500" />
        </CardHeader>

        {isFetchingRigsAverage && (
          <CardContent className="w-full  flex justify-center items-center">
            <Spinner />
          </CardContent>
        )}
        {selectedDashboardView === "ALL" && !isFetchingRigsAverage && (
          <CardContent>
            <div className="text-2xl font-bold text-redAccent-500">
              {`${repairHours.toFixed(2)} Horas`}
            </div>
            <p className="text-xs text-muted-foreground text-redAccent-500">
              Horas não faturadas por reparo de equipamento
            </p>
          </CardContent>
        )}

        {selectedDashboardView !== "ALL" && !isFetchingRigsAverage && (
          <CardContent>
            <p className="text-xs text-muted-foreground text-redAccent-500">
              Informação disponível somente para o filtro "Todos"
            </p>
          </CardContent>
        )}
      </Card>
      <Card x-chunk="dashboard-01-chunk-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-redAccent-500">
            Glosa
          </CardTitle>
          <FileClock className="h-8 w-8 text-muted-foreground text-redAccent-500" />
        </CardHeader>

        {selectedDashboardView === "ALL" && (
          <CardContent>
            <div className="text-2xl font-bold text-redAccent-500">
              {`${glossHours.toFixed(2)} Horas`}
            </div>
            <p className="text-xs text-muted-foreground text-redAccent-500">
              Horas não faturadas
            </p>
          </CardContent>
        )}

        {selectedDashboardView !== "ALL" && (
          <CardContent>
            <p className="text-xs text-muted-foreground text-redAccent-500">
              Informação disponível somente para o filtro "Todos"
            </p>
          </CardContent>
        )}
      </Card>
    </div>
  );
};
