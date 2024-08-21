import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { WellsCountBarChart } from "./components/WellsCountBarChart";

export const WellsCountBarChartCard = () => {
  return (
    <Card className="col-span-12 row-span-3 lg:col-span-12 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] ">
      <CardHeader className="px-7">
        <CardTitle>Poços por mês </CardTitle>
        <CardDescription>
          Gráfico com a quantidade de poços por mês da sonda selecionada.
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full h-full">
        <div className="max-w-full h-full">
          <WellsCountBarChart />
        </div>
      </CardContent>
    </Card>
  );
};
