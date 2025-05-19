import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { DollarSign, TimerOff } from "lucide-react";
import { useStatboxContainer } from "./useStatboxContainer";
import { Spinner } from "@/view/components/Spinner";

export const StatboxContainer = () => {
  const {
    totalAmount,
    totalGlossAmount,
    totalRepairAmount,
    isFetchingBillings,
    totalCommerciallyStoppedAmount,
  } = useStatboxContainer();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Faturamento Total
          </CardTitle>
          <DollarSign className="h-8 w-8 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {!isFetchingBillings && (
            <>
              <div className="text-2xl font-bold">{totalAmount}</div>
              <p className="text-xs text-muted-foreground">
                Faturamento total no período selecionado
              </p>
            </>
          )}
          {isFetchingBillings && (
            <div className="flex justify-center w-full h-full">
              <Spinner />
            </div>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-redAccent-500">
            Glosa
          </CardTitle>
          <TimerOff className="h-8 w-8 text-muted-foreground text-redAccent-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-redAccent-500">
            {totalGlossAmount}
          </div>
          <p className="text-xs text-muted-foreground text-redAccent-500">
            Faturamento perdido por processo, logística ou segurança
          </p>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-redAccent-500">
            Reparo
          </CardTitle>
          <TimerOff className="h-8 w-8 text-muted-foreground text-redAccent-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-redAccent-500">
            {totalRepairAmount}
          </div>
          <p className="text-xs text-muted-foreground text-redAccent-500">
            Faturamento perdido por reparo de equipamento
          </p>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
      <Card >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-redAccent-500">
            Parada Comercial
          </CardTitle>
          <TimerOff className="h-8 w-8 text-muted-foreground text-redAccent-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-redAccent-500 tracking-tighter">
            {totalCommerciallyStoppedAmount}
          </div>
          <p className="text-xs text-muted-foreground text-redAccent-500">
            Faturamento perdido por parada comercial
          </p>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
};
