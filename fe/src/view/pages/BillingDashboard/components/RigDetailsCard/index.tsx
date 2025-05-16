import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useBillingDashboard } from "../../BillingDashboardContext/useBillingDashboard";
import { formatCurrency } from "@/app/utils/formatCurrency";
import { Spinner } from "@/view/components/Spinner";
import { calculateTotalsEfficiencies } from "@/app/utils/calculateTotalsEfficiencies";

export const RigDetailsCard = () => {
  const {
    handleCloseRigDetail,
    billing: billingArray,
    isFetchingBilling,
    isFetchingEfficiencies,
    efficiencies,
  } = useBillingDashboard();
  const [billing] = billingArray;

  let test: string[] = [];

  efficiencies.forEach((efficiency) => {
    if (efficiency.Billing.length === 0) {
      test.push(efficiency.id);
    }
  });

  const efficienciesWithoutBilling = efficiencies.filter(
    (efficiency) => !efficiency.Billing[0].id,
  );

  console.log("efficienciesWithoutBilling", efficienciesWithoutBilling);
  console.log("test", test);

  const totalUnbilledAmount =
    billingArray.length != 0
      ? billing.glosshouramount +
        billing.repairhouramount +
        billing.unbilledscheduledstopamount +
        billing.commerciallystoppedamount
      : 0;

  const {
    totalAvailableHours,
    /*  totalCommertialHours, */
    totalRepairHours,
    totalGlossHours,
    /* totalStandByHours,
    totalScheduledStoppedHours, */
    /*  totalUnbilledScheduledStopHours, */
  } = calculateTotalsEfficiencies(efficiencies);

  const totalHoursToCalculateEfficiency =
    totalAvailableHours + totalRepairHours + totalGlossHours;

  let availableHoursPercentage: number = Number(
    ((totalAvailableHours * 100) / totalHoursToCalculateEfficiency).toFixed(2),
  );
  /*  let unavailableHoursPercentage: number = Number(
    ((totalUnavailableHours * 100) / totalHours).toFixed(2),
  ); */

  return (
    <Card className="col-span-full">
      {(isFetchingBilling || isFetchingEfficiencies) && (
        <div className="h-[200px] flex justify-center items-center">
          <Spinner />
        </div>
      )}
      {!isFetchingBilling && !isFetchingEfficiencies && (
        <>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Detalhes da Sonda {billing.rigname}</CardTitle>
              <CardDescription>
                Análise detalhada do faturamento
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={handleCloseRigDetail}>
              Fechar
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Faturamento Total
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatCurrency(billing.total)}
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-red-50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Faturamento Perdido
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-500">
                    {formatCurrency(totalUnbilledAmount)}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Horas Disponíveis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {totalAvailableHours}Hrs
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Taxa de Eficiência
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {availableHoursPercentage}%
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="rounded-md border">
              <div className="p-4">
                <h3 className="font-medium">Valores Adicionais</h3>
                <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card className="border-none shadow-none">
                    <CardHeader className="p-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Taxas de Operação
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-center justify-between">
                          <span>Operando:</span>
                          <Badge variant="outline" className="ml-2">
                            {formatCurrency(billing.availablehouramount)}
                          </Badge>
                        </li>
                        <li className="flex items-center justify-between">
                          <span>StandBy:</span>
                          <Badge variant="outline" className="ml-2">
                            {formatCurrency(billing.standbyhouramount)}
                          </Badge>
                        </li>
                        <li className="flex items-center justify-between">
                          <span>Parada programada faturada:</span>
                          <Badge variant="outline" className="ml-2">
                            {formatCurrency(billing.scheduledstopamount)}
                          </Badge>
                        </li>
                        <li className="flex items-center justify-between text-red-400">
                          <span>Reparo:</span>
                          <Badge
                            variant="outline"
                            className="ml-2 text-red-400"
                          >
                            -{formatCurrency(billing.repairhouramount)}
                          </Badge>
                        </li>
                        <li className="flex items-center justify-between text-red-400">
                          <span>Glosa:</span>
                          <Badge
                            variant="outline"
                            className="ml-2 text-red-400"
                          >
                            -{formatCurrency(billing.glosshouramount)}
                          </Badge>
                        </li>
                        <li className="flex items-center justify-between text-red-400">
                          <span>Parada programada não faturada:</span>
                          <Badge
                            variant="outline"
                            className="ml-2 text-red-400"
                          >
                            -
                            {formatCurrency(
                              billing.unbilledscheduledstopamount,
                            )}
                          </Badge>
                        </li>
                        <li className="flex items-center justify-between text-red-400">
                          <span>Comercialmente parada:</span>
                          <Badge
                            variant="outline"
                            className="ml-2 text-red-400"
                          >
                            -{formatCurrency(billing.commerciallystoppedamount)}
                          </Badge>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card className="border-none shadow-none">
                    <CardHeader className="p-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Taxas de Movimentação
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-center justify-between">
                          <span>DTM por Hora:</span>
                          <Badge variant="outline" className="ml-2">
                            {formatCurrency(billing.dtmhouramount)}
                          </Badge>
                        </li>
                        <li className="flex items-center justify-between">
                          <span>DTM menor que 20Km:</span>
                          <Badge variant="outline" className="ml-2">
                            {formatCurrency(billing.dtmlt20amount)}
                          </Badge>
                        </li>
                        <li className="flex items-center justify-between">
                          <span>DTM entre 20Km e 50Km:</span>
                          <Badge variant="outline" className="ml-2">
                            {formatCurrency(billing.dtmbt20and50amount)}
                          </Badge>
                        </li>
                        <li className="flex items-center justify-between">
                          <span>DTM maior que 50Km:</span>
                          <Badge variant="outline" className="ml-2">
                            {formatCurrency(billing.dtmgt50amount)}
                          </Badge>
                        </li>
                        <li className="flex items-center justify-between">
                          <span>Mov. de Equipamento menor que 20Km:</span>
                          <Badge variant="outline" className="ml-2">
                            {formatCurrency(billing.equipmentlt20amount)}
                          </Badge>
                        </li>
                        <li className="flex items-center justify-between">
                          <span>Mov. de Equipamento entre 20Km e 50Km:</span>
                          <Badge variant="outline" className="ml-2">
                            {formatCurrency(billing.equipmentbt20and50amount)}
                          </Badge>
                        </li>
                        <li className="flex items-center justify-between">
                          <span>Mov. de Equipamento maior que 50Km:</span>
                          <Badge variant="outline" className="ml-2">
                            {formatCurrency(billing.equipmentgt50amount)}
                          </Badge>
                        </li>

                        <li className="flex items-center justify-between">
                          <span>Mov. de Flúido menor que 20Km:</span>
                          <Badge variant="outline" className="ml-2">
                            {formatCurrency(billing.fluidlt20amount)}
                          </Badge>
                        </li>
                        <li className="flex items-center justify-between">
                          <span>Mov. de Flúido entre 20Km e 50Km:</span>
                          <Badge variant="outline" className="ml-2">
                            {formatCurrency(billing.fluidbt20and50amount)}
                          </Badge>
                        </li>
                        <li className="flex items-center justify-between">
                          <span>Mov. de Flúido maior que 50Km:</span>
                          <Badge variant="outline" className="ml-2">
                            {formatCurrency(billing.fluidgt50amount)}
                          </Badge>
                        </li>
                        <li className="flex items-center justify-between">
                          <span>Mobilização:</span>
                          <Badge variant="outline" className="ml-2">
                            {formatCurrency(billing.mobilizationamount)}
                          </Badge>
                        </li>
                        <li className="flex items-center justify-between">
                          <span>Mob. fora de Aracaju:</span>
                          <Badge variant="outline" className="ml-2">
                            {formatCurrency(billing.mobilizationamount)}
                          </Badge>
                        </li>
                        <li className="flex items-center justify-between">
                          <span>Desmobilização:</span>
                          <Badge variant="outline" className="ml-2">
                            {formatCurrency(billing.demobilizationamount)}
                          </Badge>
                        </li>
                        <li className="flex items-center justify-between">
                          <span>Transporte:</span>
                          <Badge variant="outline" className="ml-2">
                            {formatCurrency(billing.transportationamount)}
                          </Badge>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-none shadow-none">
                    <CardHeader className="p-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Taxas de Caminhão
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-center justify-between">
                          <span>Locação Caminhão + Carreta (Mensal):</span>
                          <Badge variant="outline" className="ml-2">
                            {formatCurrency(billing.truckcartrentamount)}
                          </Badge>
                        </li>
                        <li className="flex items-center justify-between">
                          <span>Locação Caminhão + Tanque (Mensal):</span>
                          <Badge variant="outline" className="ml-2">
                            {formatCurrency(billing.trucktankamount)}
                          </Badge>
                        </li>
                        <li className="flex items-center justify-between">
                          <span>Caminhão (km):</span>
                          <Badge variant="outline" className="ml-2">
                            {formatCurrency(billing.truckkmamount)}
                          </Badge>
                        </li>
                        <li className="flex items-center justify-between">
                          <span>Taxa de Caminhão Sugador (Diária):</span>
                          <Badge variant="outline" className="ml-2">
                            {formatCurrency(billing.suckingtruckamount)}
                          </Badge>
                        </li>
                        <li className="flex items-center justify-between">
                          <span>Ávore de Natal (Hora):</span>
                          <Badge variant="outline" className="ml-2">
                            {formatCurrency(
                              billing.christmastreedisassemblyamount,
                            )}
                          </Badge>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-none shadow-none">
                    <CardHeader className="p-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Taxas de Equipamento
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-center justify-between">
                          <span>Locação de BOP (Hora):</span>
                          <Badge variant="outline" className="ml-2">
                            {formatCurrency(billing.bobrentamount)}
                          </Badge>
                        </li>
                        <li className="flex items-center justify-between">
                          <span>Combsutível Gerador (Hora):</span>
                          <Badge variant="outline" className="ml-2">
                            {formatCurrency(billing.generatorfuelamount)}
                          </Badge>
                        </li>
                        <li className="flex items-center justify-between">
                          <span>Trailer Extra:</span>
                          <Badge variant="outline" className="ml-2">
                            {formatCurrency(billing.extratraileramount)}
                          </Badge>
                        </li>
                        <li className="flex items-center justify-between">
                          <span>Locação de Munck:</span>
                          <Badge variant="outline" className="ml-2">
                            {formatCurrency(billing.munckamount)}
                          </Badge>
                        </li>
                        <li className="flex items-center justify-between">
                          <span>Locação de Power Swivel:</span>
                          <Badge variant="outline" className="ml-2">
                            {formatCurrency(billing.powerswivelamount)}
                          </Badge>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-none shadow-none">
                    <CardHeader className="p-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Taxas de Tanque Mix
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-center justify-between">
                          <span>Locação de Tanque Mix (Mensal):</span>
                          <Badge variant="outline" className="ml-2">
                            {formatCurrency(billing.mixtankmonthrentamount)}
                          </Badge>
                        </li>
                        <li className="flex items-center justify-between">
                          <span>Locação de Tanque Mix (Diária):</span>
                          <Badge variant="outline" className="ml-2">
                            {formatCurrency(billing.mixtankhourrentamount)}
                          </Badge>
                        </li>
                        <li className="flex items-center justify-between">
                          <span>Mobilização de Tanque Mix:</span>
                          <Badge variant="outline" className="ml-2">
                            {formatCurrency(billing.mixtankmobilizationamount)}
                          </Badge>
                        </li>
                        <li className="flex items-center justify-between">
                          <span>Desmobilização de Tanque Mix:</span>
                          <Badge variant="outline" className="ml-2">
                            {formatCurrency(
                              billing.mixtankdemobilizationamount,
                            )}
                          </Badge>
                        </li>
                        <li className="flex items-center justify-between">
                          <span>DTM de Tanque Mix:</span>
                          <Badge variant="outline" className="ml-2">
                            {formatCurrency(billing.mixtankdtmamount)}
                          </Badge>
                        </li>
                        <li className="flex items-center justify-between">
                          <span>Operadores de Tanque Mix:</span>
                          <Badge variant="outline" className="ml-2">
                            {formatCurrency(billing.mixtankoperatoramount)}
                          </Badge>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </CardContent>
        </>
      )}
    </Card>
  );
};
