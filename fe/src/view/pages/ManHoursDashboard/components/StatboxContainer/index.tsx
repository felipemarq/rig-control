import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { HardHat } from "lucide-react";
import { useStatboxContainer } from "./useStatboxContainer";

export const StatboxContainer = () => {
  const { totalOccurrences } = useStatboxContainer();
  return (
    <div className="grid gap-4  md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      <Card
        x-chunk="dashboard-01-chunk-0"
        className="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">TAR</CardTitle>
          <HardHat className="h-8 w-8 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-xl font-bold">
            {totalOccurrences.totalTarOccurrences}
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-xs text-muted-foreground">
            Total de acidentes registrados
          </p>
        </CardFooter>
      </Card>
      <Card
        x-chunk="dashboard-01-chunk-0"
        className="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">TOR</CardTitle>
          <HardHat className="h-8 w-8 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-xl font-bold">
            {totalOccurrences.totalTorOccurrences}
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-xs text-muted-foreground">
            Total de ocorrências registradas
          </p>
        </CardFooter>
      </Card>
      <Card
        x-chunk="dashboard-01-chunk-0"
        className="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">TFSA</CardTitle>
          <HardHat className="h-8 w-8 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-xl font-bold">
            {totalOccurrences.totalTfsaOccurrences}
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-xs text-muted-foreground">
            Total de ocorrências sem afastamento registrados
          </p>
        </CardFooter>
      </Card>
      <Card
        x-chunk="dashboard-01-chunk-0"
        className="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">TFCA</CardTitle>
          <HardHat className="h-8 w-8 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-xl font-bold">
            {totalOccurrences.totalTfcaOccurrences}
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-xs text-muted-foreground">
            Total de ocorrências com afastamento registrados
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};
