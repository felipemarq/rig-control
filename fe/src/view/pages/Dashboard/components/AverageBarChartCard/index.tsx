import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { AverageBarChart } from "./components/AverageBarChart";

export const AverageBarChartCard = () => {
  return (
    <Card className="col-span-12 row-span-3 lg:col-span-12 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] ">
      <CardHeader className="px-7">
        <CardTitle>Média </CardTitle>
        <CardDescription>
          Gráfico com a média mensal da sonda no ano selecionado.
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full h-full">
        <div className="max-w-full h-full">
          <AverageBarChart />
        </div>
      </CardContent>
    </Card>
  );
};
