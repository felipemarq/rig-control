import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BillingConfigResponse } from "@/app/services/billingConfigServices/getAll";
import { DollarSignIcon } from "lucide-react";
import { formatDate } from "@/app/utils/formatDate";

interface TaxesContainerProps {
  billingConfigs: BillingConfigResponse[];
  handleConfigBeingSeen: (config: BillingConfigResponse) => void;
}

export function TaxesContainer({
  billingConfigs,
  handleConfigBeingSeen,
}: TaxesContainerProps) {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {billingConfigs.map((billingConfig) => (
          <Card key={billingConfig.id} className="w-full">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{billingConfig.rig.name}</span>
                <DollarSignIcon className="h-6 w-6 text-green-500" />
              </CardTitle>
              <CardDescription>
                Valores utilizados para cálculo do faturamento da sonda durante o período
                de {formatDate(new Date(billingConfig.startDate)) || "N/A"} -
                {formatDate(new Date(billingConfig.endDate)) || "N/A"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm text-gray-500">Taxa Hora Disponível</p>
                  <p className="text-2xl font-bold">
                    ${billingConfig.availableHourTax.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Taxa Standy By</p>
                  <p className="text-2xl font-bold">
                    ${billingConfig.glossHourTax.toFixed(2)}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => {
                  handleConfigBeingSeen(billingConfig);
                }}
                variant="outline"
                className="w-full"
              >
                Ver Detalhes
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
