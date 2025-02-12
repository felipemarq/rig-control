import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash2 } from "lucide-react";
import { translateClassification } from "@/app/utils/translateClassification";
import { PeriodActionPlan } from "@/app/entities/PeriodActionPlan";

interface PeriodActionPlanItemProps {
  actionPlan: PeriodActionPlan;
  onEdit: (actionPlan: PeriodActionPlan) => void;
  onDelete: (periodActionPlanId: string) => void;
}

export const PeriodActionPlanItem = ({
  actionPlan,
  onEdit,
  onDelete,
}: PeriodActionPlanItemProps) => {
  return (
    <motion.div
      key={actionPlan.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary mix-blend-multiply" />
          <CardHeader className="relative z-10">
            <CardTitle className="text-lg font-semibold truncate text-white">
              {actionPlan.title}
            </CardTitle>
          </CardHeader>
        </div>
        <CardContent className="p-4 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray 700">
              {translateClassification(actionPlan.period.classification)}
            </span>
            <span className="text-sm text-gray 700">{actionPlan.rig.name}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">
              Criado em: {format(actionPlan.createdAt, "dd/MM/yyyy", { locale: ptBR })}
            </span>
            <Badge variant={actionPlan.isFinished ? "default" : "secondary"}>
              {actionPlan.isFinished ? "Finalizado" : "Em Andamento"}
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">
              Progresso:{" "}
              {actionPlan.periodActionPlanItems.filter((item) => item.isFinished).length}/
              {actionPlan.periodActionPlanItems.length}
            </span>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" title="Visualizar">
                <Eye className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                title="Editar"
                onClick={() => onEdit(actionPlan)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                title="Excluir"
                onClick={() => onDelete(actionPlan.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
