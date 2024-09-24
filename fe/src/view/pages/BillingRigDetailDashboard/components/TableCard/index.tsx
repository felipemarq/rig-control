import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTableCard } from "./useTableCard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { taxTranslation } from "@/app/utils/taxLabels";
import { cn } from "@/lib/utils";
import { NotFound } from "@/view/components/NotFound";

export const TableCard = () => {
  const { billing } = useTableCard();
  return (
    <Card className="row-span-4 lg:col-span-12  overflow-y-auto scrollbar-hide shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Ocorrências</CardTitle>
        <p className="text-sm text-gray-500">
          Lista de Ocorrências do período selecionado
        </p>
      </CardHeader>
      <CardContent className="h-full">
        {!billing[0] && (
          <NotFound>
            {
              <p>
                Sem dados para o <strong>período</strong> selecionado
              </p>
            }
          </NotFound>
        )}
        {billing[0] && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Taxa</TableHead>
                <TableHead className="text-right">Valor (R$)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {billing[0] &&
                Object.entries(billing[0]).map(([key, value]) => {
                  if (
                    key !== "id" &&
                    key !== "rigId" &&
                    key !== "date" &&
                    key !== "total" &&
                    typeof value === "number"
                  ) {
                    return (
                      <TableRow
                        key={key}
                        className={cn(
                          (key === "glosshouramount" ||
                            key === "unbilledscheduledstopamount" ||
                            key === "repairhouramount") &&
                            "text-red-500"
                        )}
                      >
                        <TableCell>
                          {taxTranslation[key] ||
                            key
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, (str) => str.toUpperCase())}
                        </TableCell>
                        <TableCell className="text-right">
                          {value.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </TableCell>
                      </TableRow>
                    );
                  }
                  return null;
                })}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};
