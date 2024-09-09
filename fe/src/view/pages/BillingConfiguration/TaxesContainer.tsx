import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  DollarSignIcon,
  TruckIcon,
  FuelIcon,
  SettingsIcon,
  CalendarIcon,
} from "lucide-react";
import { useBillingConfiguration } from "./useBillingConfiguration";

const TaxGroup = ({
  title,
  icon: Icon,
  taxes,
}: {
  title: string;
  icon: React.ElementType;
  taxes: { label: string; value: number }[];
}) => (
  <div className="mb-4">
    <h3 className="font-semibold text-lg mb-2 flex items-center">
      <Icon className="mr-2 h-5 w-5" />
      {title}
    </h3>
    <div className="grid grid-cols-2 gap-2">
      {taxes.map(({ label, value }) => (
        <div
          key={label}
          className="flex justify-between items-center bg-gray-100 p-2 rounded"
        >
          <span className="text-sm">{label}:</span>
          <span className="font-medium">${value.toFixed(2)}</span>
        </div>
      ))}
    </div>
  </div>
);

/* const TaxChart = ({ taxes }: { taxes: { label: string; value: number }[] }) => {
  const maxValue = Math.max(...taxes.map((t) => t.value));
  return (
    <div className="mt-4">
      <h3 className="font-semibold text-lg mb-2">Tax Comparison</h3>
      <div className="space-y-2">
        {taxes.map(({ label, value }) => (
          <div key={label} className="flex items-center">
            <span className="w-24 text-sm">{label}:</span>
            <div className="flex-1 bg-gray-200 rounded-full h-4 ml-2">
              <div
                className="bg-blue-500 rounded-full h-4"
                style={{ width: `${(value / maxValue) * 100}%` }}
              ></div>
            </div>
            <span className="ml-2 text-sm font-medium">
              ${value.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}; */

export function TaxesContainer() {
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  const { billingConfigs } = useBillingConfiguration();

  const toggleCardExpansion = (id: string) => {
    setExpandedCards((prevExpandedCards) => {
      const newExpandedCards = new Set(prevExpandedCards);
      if (newExpandedCards.has(id)) {
        newExpandedCards.delete(id);
      } else {
        newExpandedCards.add(id);
      }
      return newExpandedCards;
    });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {billingConfigs.map((tax) => (
          <Card key={tax.id} className="w-full">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{tax.rig.name}</span>
                <DollarSignIcon className="h-6 w-6 text-green-500" />
              </CardTitle>
              <CardDescription>
                Valores utilizados para cálculo do faturamento da sonda durante
                o período de {tax.startDate || "N/A"} - {tax.endDate || "N/A"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm text-gray-500">Taxa Hora Disponível</p>
                  <p className="text-2xl font-bold">
                    ${tax.availableHourTax.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">
                    Taxa Hora não operando
                  </p>
                  <p className="text-2xl font-bold">
                    ${tax.glossHourTax.toFixed(2)}
                  </p>
                </div>
              </div>
              {expandedCards.has(tax.id) && (
                <>
                  <TaxGroup
                    title="Taxas de DTM"
                    icon={TruckIcon}
                    taxes={[
                      { label: "20-50", value: tax.dtmBt20And50Tax },
                      { label: "> 50", value: tax.dtmGt50Tax },
                      { label: "< 20", value: tax.dtmLt20Tax },
                      { label: "Hora", value: tax.dtmHourTax },
                    ]}
                  />
                  <TaxGroup
                    title="Taxas de Movimentação de Equipamento"
                    icon={SettingsIcon}
                    taxes={[
                      { label: "20-50", value: tax.equipmentRatioBt20And50Tax },
                      { label: "> 50", value: tax.equipmentRatioGt50Tax },
                      { label: "< 20", value: tax.equipmentRatioLt20Tax },
                    ]}
                  />
                  <TaxGroup
                    title="Taxas de Movimentação de Flúidos"
                    icon={FuelIcon}
                    taxes={[
                      { label: "20-50", value: tax.fluidRatioBt20And50Tax },
                      { label: "> 50", value: tax.fluidRatioGt50Tax },
                      { label: "< 20", value: tax.fluidRatioLt20Tax },
                    ]}
                  />
                  <TaxGroup
                    title="Taxas de Locação de Equipamentos"
                    icon={CalendarIcon}
                    taxes={[
                      { label: "Gloss Hour", value: tax.glossHourTax },
                      { label: "Mobilization", value: tax.mobilization },
                      { label: "Sucking Truck", value: tax.suckingTruckTax },
                    ]}
                  />
                  {/* <TaxChart
                    taxes={[
                      { label: "DTM > 50", value: tax.dtmGt50Tax },
                      { label: "Equip > 50", value: tax.equipmentRatioGt50Tax },
                      { label: "Fluid > 50", value: tax.fluidRatioGt50Tax },
                      { label: "Mobilization", value: tax.mobilization },
                    ]}
                  /> */}
                </>
              )}
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => toggleCardExpansion(tax.id)}
                variant="outline"
                className="w-full"
              >
                {expandedCards.has(tax.id) ? (
                  <>
                    <ChevronUpIcon className="mr-2 h-4 w-4" />
                    Less Details
                  </>
                ) : (
                  <>
                    <ChevronDownIcon className="mr-2 h-4 w-4" />
                    More Details
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
