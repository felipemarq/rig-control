import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { BillingConfigResponse } from "@/app/services/billingConfigServices/getAll";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { formatDate } from "@/app/utils/formatDate";
import { formatCurrency } from "@/app/utils/formatCurrency";

interface TaxesDetailsProps {
  configBeingSeen: BillingConfigResponse;
  onClose: () => void;
  onEdit: (isEditing: boolean) => void;
}

// Função para formatar valores monetários

// Função para formatar datas

export default function TaxesDetails({
  configBeingSeen,
  onClose,
  onEdit,
}: TaxesDetailsProps) {
  const renderBillingsTable = (billingConfig: BillingConfigResponse) => (
    <Table>
      <TableCaption>
        Valores para cálculo do faturamento - {billingConfig.rig.name}
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Descrição</TableHead>
          <TableHead>Valor</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell colSpan={2} className="font-medium">
            Informações Gerais
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Data de Início</TableCell>
          <TableCell>{formatDate(new Date(billingConfig.startDate))}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Data de Término</TableCell>
          <TableCell>{formatDate(new Date(billingConfig.endDate))}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={2} className="font-medium">
            Taxas de Operação
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Taxa Hora Disponível</TableCell>
          <TableCell>{formatCurrency(billingConfig.availableHourTax)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Taxa StandBy</TableCell>
          <TableCell>{formatCurrency(billingConfig.glossHourTax)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={2} className="font-medium">
            Taxas de Movimentação
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Taxa de Hora DTM</TableCell>
          <TableCell>{formatCurrency(billingConfig.dtmHourTax)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Taxa DTM (menor que 20Km)</TableCell>
          <TableCell>{formatCurrency(billingConfig.dtmLt20Tax)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Taxa DTM (entre 20km e 50Km)</TableCell>
          <TableCell>{formatCurrency(billingConfig.dtmBt20And50Tax)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Taxa DTM (maior que 50km)</TableCell>
          <TableCell>{formatCurrency(billingConfig.dtmGt50Tax)}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell>Taxa Equipamento (menor que 20Km)</TableCell>
          <TableCell>{formatCurrency(billingConfig.equipmentRatioLt20Tax)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Taxa Equipamento (entre 20km e 50Km)</TableCell>
          <TableCell>
            {formatCurrency(billingConfig.equipmentRatioBt20And50Tax)}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Taxa Equipamento (maior que 50km)</TableCell>
          <TableCell>{formatCurrency(billingConfig.equipmentRatioGt50Tax)}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell>Taxa Flúido (menor que 20Km)</TableCell>
          <TableCell>{formatCurrency(billingConfig.fluidRatioLt20Tax)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Taxa Flúido (entre 20km e 50Km)</TableCell>
          <TableCell>{formatCurrency(billingConfig.fluidRatioBt20And50Tax)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Taxa Flúido (maior que 50km)</TableCell>
          <TableCell>{formatCurrency(billingConfig.fluidRatioGt50Tax)}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell>Taxa de Mobilização</TableCell>
          <TableCell>{formatCurrency(billingConfig.mobilization)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Taxa de Desmobilização</TableCell>
          <TableCell>{formatCurrency(billingConfig.demobilization)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Taxa de Transporte</TableCell>
          <TableCell>{formatCurrency(billingConfig.transportationTax)}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell colSpan={2} className="font-medium">
            Taxas de Caminhão
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Taxa de Locação Caminhão + Carreta (mensal)</TableCell>
          <TableCell>{formatCurrency(billingConfig.truckCartRentTax)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Taxa de Locação Caminhão + Tanque (mensal)</TableCell>
          <TableCell>{formatCurrency(billingConfig.truckTankTax)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Taxa de Caminhão (km)</TableCell>
          <TableCell>{formatCurrency(billingConfig.truckKmTax)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Taxa de Caminhão Sugador (diária)</TableCell>
          <TableCell>{formatCurrency(billingConfig.suckingTruckTax)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Taxa de Árvore de Natal (hora)</TableCell>
          <TableCell>
            {formatCurrency(billingConfig.christmasTreeDisassemblyTax)}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={2} className="font-medium">
            Taxas de Equipamento
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Taxa de Locação BOP (hora)</TableCell>
          <TableCell>{formatCurrency(billingConfig.bobRentTax)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Combustível Gerador (diária)</TableCell>
          <TableCell>{formatCurrency(billingConfig.generatorFuelTax)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Taxa de Trailer Extra</TableCell>
          <TableCell>{formatCurrency(billingConfig.extraTrailerTax)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Taxa de Locação de Munck</TableCell>
          <TableCell>{formatCurrency(billingConfig.munckTax)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Taxa de Locação de Power Swivel</TableCell>
          <TableCell>{formatCurrency(billingConfig.powerSwivelTax)}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell colSpan={2} className="font-medium">
            Taxas de Tanque Mix
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Taxa de Locação de Tanque Mix (mensal)</TableCell>
          <TableCell>{formatCurrency(billingConfig.mixTankMonthRentTax)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Taxa de Locação de Tanque Mix (diária)</TableCell>
          <TableCell>{formatCurrency(billingConfig.mixTankHourRentTax)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Taxa de mobilização de Tanque Mix</TableCell>
          <TableCell>{formatCurrency(billingConfig.mixTankMobilizationTax)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Taxa de desmobilização de Tanque Mix</TableCell>
          <TableCell>{formatCurrency(billingConfig.mixTankDemobilizationTax)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Taxa de DTM de Tanque Mix</TableCell>
          <TableCell>{formatCurrency(billingConfig.mixTankDtmTax)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Taxa de Operadores de Tanque Mix</TableCell>
          <TableCell>{formatCurrency(billingConfig.mixTankOperatorTax)}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Valores para Cálculo do Faturamento da Operação</span>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="secondary" onClick={() => onEdit(true)}>
              Editar valores
            </Button>
            <Button size="sm" variant="destructive" onClick={onClose}>
              <X />
            </Button>
          </div>
        </CardTitle>
        <CardDescription>
          <span> Detalhamento dos valores utilizados para calcular o faturamento</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {configBeingSeen && <>{renderBillingsTable(configBeingSeen)}</>}
      </CardContent>
    </Card>
  );
}
