import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

import { Spinner } from "@/view/components/Spinner";
import { TfcaOccurrencesBarChart } from "./components/TfcaOccurrencesBarChart";
import { useTotalManHoursDashboard } from "../../TotalManHoursDashboardContext/useTotalManHoursDashboard";

export const TfcaOccurrencesBarChartCard = () => {
  const { isFetchingOccurrencesTaxes, occurrencesTaxes } =
    useTotalManHoursDashboard();

  return (
    <Card className="col-span-12 row-span-5 lg:col-span-12 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] ">
      <CardHeader className="px-7">
        <CardTitle>TFCA </CardTitle>
        <CardDescription>
          {`Taxa de frequência com afastamento registrados.`}
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full h-full">
        <div className="max-w-full h-full">
          {!isFetchingOccurrencesTaxes && occurrencesTaxes && (
            <TfcaOccurrencesBarChart />
          )}
          {isFetchingOccurrencesTaxes && <Spinner />}
        </div>
      </CardContent>
    </Card>
  );
};
