import { useState, useMemo } from "react";
import { AlertTriangle, CalendarDays } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EfficienciesResponse } from "@/app/services/efficienciesService/getAll";
import { useNavigate } from "react-router-dom";

type MonthSummary = {
  year: number;
  month: number;
  days: EfficienciesResponse;
  urgency: "low" | "medium" | "high";
};

const urgencyColors = {
  low: "bg-yellow-100 text-yellow-800",
  medium: "bg-orange-100 text-orange-800",
  high: "bg-red-100 text-red-800",
};

const monthNames = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export interface UrgentWarningSummaryDialogProps {
  pendingEfficienciesConfirmation: EfficienciesResponse;
}

function getUrgencyLevel(date: string): "low" | "medium" | "high" {
  const now = new Date();
  const pendingDate = new Date(date);
  const diffDays = Math.ceil(
    (now.getTime() - pendingDate.getTime()) / (1000 * 3600 * 24)
  );

  if (diffDays > 30) return "high";
  if (diffDays > 7) return "medium";
  return "low";
}

export default function UrgentWarningSummaryDialog({
  pendingEfficienciesConfirmation,
}: UrgentWarningSummaryDialogProps) {
  const [open, setOpen] = useState(pendingEfficienciesConfirmation.length > 0);
  const navigate = useNavigate();
  const missingDaysSummary = useMemo(() => {
    const summary: Record<string, MonthSummary> = {};

    pendingEfficienciesConfirmation.forEach((day) => {
      const date = new Date(day.date);
      const key = `${date.getFullYear()}-${date.getMonth()}`;

      if (!summary[key]) {
        summary[key] = {
          year: date.getFullYear(),
          month: date.getMonth(),
          days: [],
          urgency: "low",
        };
      }

      summary[key].days.push(day);
      const dayUrgency = getUrgencyLevel(day.date as string);
      if (
        dayUrgency === "high" ||
        (dayUrgency === "medium" && summary[key].urgency !== "high")
      ) {
        summary[key].urgency = dayUrgency;
      }
    });

    return Object.values(summary).sort((a, b) => b.year - a.year || b.month - a.month);
  }, []);

  const totalMissingDays = pendingEfficienciesConfirmation.length;
  /*  const mostUrgentLevel = missingDaysSummary.reduce(
    (acc, month) =>
      month.urgency === "high"
        ? "high"
        : month.urgency === "medium" && acc !== "high"
        ? "medium"
        : acc,
    "low" as "low" | "medium" | "high"
  ); */

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[650px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Dias Faltando Confirmação
          </DialogTitle>
          <DialogDescription className="text-red-600 font-semibold">
            Total de {totalMissingDays} dias faltando confirmação
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          {/* <div className="mb-4">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Nível de Urgência</span>
              <span className="text-sm font-medium">{mostUrgentLevel.toUpperCase()}</span>
            </div>
            <Progress
              value={mostUrgentLevel === "high" ? 100 : mostUrgentLevel === "medium" ? 66 : 33}
              className="h-2 bg-gray-200"
              indicatorClassName={
                mostUrgentLevel === "high"
                  ? "bg-red-600"
                  : mostUrgentLevel === "medium"
                    ? "bg-orange-500"
                    : "bg-yellow-400"
              }
            />
          </div> */}
          <Accordion
            type="single"
            collapsible
            className="w-full max-h-[50vh] overflow-y-auto"
          >
            {missingDaysSummary.map((monthData, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger
                  className={cn(
                    "flex items-center justify-between p-4 rounded-md",
                    urgencyColors[monthData.urgency]
                  )}
                >
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-5 w-5" />
                    <span>
                      {monthNames[monthData.month]} {monthData.year}
                    </span>
                  </div>
                  <span className="font-bold">{monthData.days.length} dias</span>
                </AccordionTrigger>
                <AccordionContent className="max-h-[200px] overflow-y-auto">
                  <ul className="space-y-2 pr-2">
                    {monthData.days.map((day, dayIndex) => (
                      <li
                        key={dayIndex}
                        className="flex mt-2  items-center justify-between gap-2 p-2 h-12 bg-gray-100 rounded-md"
                      >
                        <div>
                          <span className="font-medium">
                            {new Date(day.date).toLocaleDateString("pt-BR")}
                          </span>
                        </div>
                        <span className=" text-gray-600">Sonda: {day.rig.name}</span>
                        <span
                          className="text-primary underline font-semibold cursor-pointer"
                          onClick={() => {
                            navigate(`/details/${day.id}`);
                            setOpen(false);
                          }}
                        >
                          Ver Dia
                        </span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <div className="mt-6 flex justify-end">
          <Button
            onClick={() => setOpen(false)}
            variant="destructive"
            className="bg-red-600 hover:bg-red-700"
          >
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
