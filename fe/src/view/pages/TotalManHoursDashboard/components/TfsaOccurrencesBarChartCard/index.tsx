import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

import { Spinner } from "@/view/components/Spinner";
import { TfsaOccurrencesBarChart } from "./components/TfsaOccurrencesBarChart";
import { useTotalManHoursDashboard } from "../../TotalManHoursDashboardContext/useTotalManHoursDashboard";

export const TfsaOccurrencesBarChartCard = () => {
  const { isFetchingOccurrencesTaxes, occurrencesTaxes } =
    useTotalManHoursDashboard();

  return (
    <Card className="col-span-12 row-span-5 lg:col-span-12 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] ">
      <CardHeader className="px-7">
        <CardTitle>TFSA </CardTitle>
        <CardDescription>
          {`Taxa de frequência sem afastamento registrados.`}
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full h-full">
        <div className="max-w-full h-full">
          {!isFetchingOccurrencesTaxes && occurrencesTaxes && (
            <TfsaOccurrencesBarChart />
          )}
          {isFetchingOccurrencesTaxes && <Spinner />}
        </div>
      </CardContent>
    </Card>
  );
};
