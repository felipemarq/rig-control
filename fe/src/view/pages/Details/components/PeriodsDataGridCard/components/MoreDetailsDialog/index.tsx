import { PersistanceEfficiency } from "@/app/entities/PersistanceEfficiency";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MoreDetailsDialogProps {
  efficiency: PersistanceEfficiency;
}

export const MoreDetailsDialog = ({ efficiency }: MoreDetailsDialogProps) => {
  const details = [];

  // Verificando os valores booleanos do registro e adicionando os detalhes relevantes
  if (efficiency.hasMixTankHourRent) details.push("Aluguel por hora de tanque mix");
  if (efficiency.hasMixTankMonthRent) details.push("Aluguel mensal de tanque mix");
  if (efficiency.hasMixTankMobilization) details.push("Mobilização de tanque mix");
  if (efficiency.hasMixTankDemobilization) details.push("Desmobilização de tanque mix");
  if (efficiency.hasGeneratorFuel) details.push("Combustível para gerador");
  if (efficiency.hasExtraTrailer) details.push("Trailer extra");
  if (efficiency.hasPowerSwivel) details.push("Power Swivel");
  if (efficiency.hasMunck) details.push("Munck");
  if (efficiency.hasTransportation) details.push("Transporte");
  if (efficiency.hasTruckCartRent) details.push("Aluguel de caminhão");
  if (efficiency.hasTruckTank) details.push("Caminhão tanque");
  if (efficiency.hasSuckingTruck) details.push("Caminhão sugador");
  if (efficiency.bobRentHours)
    details.push(`"Aluguel por hora de bob" - ${efficiency.bobRentHours} horas`);
  if (efficiency.truckKmHours)
    details.push(`"Aluguel por hora de caminhão" - ${efficiency.truckKmHours} km`);
  if (efficiency.christmasTreeDisassemblyHours)
    details.push(
      `"Desmontagem de árvore de Natal" - ${efficiency.christmasTreeDisassemblyHours} horas`
    );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-1" disabled={!(details.length > 0)}>
          Mais detalhes
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-black">Detalhes</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[300px] rounded-md border p-4 text-gray-700">
          {details.length > 0 ? (
            details.map((detail, index) => (
              <div key={index} className="mb-2">
                {detail}
              </div>
            ))
          ) : (
            <p className="text-gray-500">Nenhum detalhe disponível.</p>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
