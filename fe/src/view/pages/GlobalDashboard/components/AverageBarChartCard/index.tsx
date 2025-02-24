import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { AverageBarChart } from "./components/AverageBarChart";
import { cn } from "@/lib/utils";

interface AverageBarChartCardProps {
  className?: string;
}

export const AverageBarChartCard = ({ className }: AverageBarChartCardProps) => {
  return (
    <Card className={cn("", className)}>
      <CardHeader className="px-7">
        <CardTitle>Média </CardTitle>
        <CardDescription>
          Gráfico com a média de todas as sondas durante o período selecionado.
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
