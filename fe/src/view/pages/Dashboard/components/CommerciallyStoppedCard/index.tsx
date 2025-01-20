import { Badge } from "@/components/ui/badge";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useDashboard } from "../../DashboardContext/useDashboard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { months } from "@/app/utils/months";
import { AlertCircle } from "lucide-react";

const formatDateString = (date: string): string => {
  const [year, month, day] = date.split("-");

  const monthIndex = Number(month) - 1;

  return `${day} de ${months[monthIndex].label} de ${year}`;
};

export function CommerciallyStoppedCard() {
  const { commerciallyStoppedDates } = useDashboard();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Badge variant="secondary" className="py-2 cursor-pointer gap-x-2">
          <AlertCircle />{" "}
          {`A sonda esteve ${commerciallyStoppedDates.length} dias em parada comercial no período selecionado`}
        </Badge>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-black">Paradas Comerciais</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[300px] rounded-md border p-4 text-gray-700">
          {commerciallyStoppedDates.map((date) => (
            <div key={date}>
              <Label className="mb-2">{formatDateString(date)}</Label>
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
