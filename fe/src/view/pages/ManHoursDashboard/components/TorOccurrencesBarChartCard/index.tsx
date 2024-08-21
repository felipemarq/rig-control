import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { TorOccurrencesBarChart } from "./components/TorOccurrencesBarChart";
import { useManHoursDashboard } from "../../ManHourDashboardContext/useManHoursDashboard";
import { Spinner } from "@/view/components/Spinner";

export const TorOccurrencesBarChartCard = () => {
  const { isFetchingOccurrencesTaxes, occurrencesTaxes, selectedBaseName } =
    useManHoursDashboard();

  return (
    <Card className="col-span-12 row-span-5 lg:col-span-12 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] ">
      <CardHeader className="px-7">
        <CardTitle>TOR </CardTitle>
        <CardDescription>
          {`   Taxa de ocorrências registradas da base ${
            selectedBaseName ? selectedBaseName : ""
          }.`}
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full h-full">
        <div className="max-w-full h-full">
          {!isFetchingOccurrencesTaxes && occurrencesTaxes && (
            <TorOccurrencesBarChart />
          )}
          {isFetchingOccurrencesTaxes && <Spinner />}
        </div>
      </CardContent>
    </Card>
  );
};
