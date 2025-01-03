import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, ListFilter, Eye, Edit, Trash2 } from "lucide-react";
import { usePeriodActionPlans } from "../../../app/hooks/periodActionPlans/usePeriodActionPlans";
import { translateClassification } from "@/app/utils/translateClassification";
import { Spinner } from "@/view/components/Spinner";
import { useNavigate } from "react-router-dom";

export default function PeriodActionPlan() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterFinished, setFilterFinished] = useState<"all" | "finished" | "ongoing">(
    "all"
  );
  const navigate = useNavigate();

  const { isFetchingPeriodsActionPlans, periodActionPlans } = usePeriodActionPlans();

  const filteredPlans = periodActionPlans.filter(
    (plan) =>
      (plan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plan.period.classification.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterFinished === "all" ||
        (filterFinished === "finished" && plan.isFinished) ||
        (filterFinished === "ongoing" && !plan.isFinished))
  );

  return (
    <div className="container mx-auto p-6 space-y-8">
      <Card className="overflow-hidden bg-white">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary mix-blend-multiply" />
          <CardHeader className="relative z-10 text-white">
            <CardTitle className="text-2xl font-bold">Planos de Ação</CardTitle>
          </CardHeader>
        </div>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
            <div className="relative w-full sm:w-96">
              <Input
                type="text"
                placeholder="Pesquisar planos de ação"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full"
              />
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-10">
                    <ListFilter className="mr-2 h-4 w-4" />
                    Filtrar
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={filterFinished === "all"}
                    onCheckedChange={() => setFilterFinished("all")}
                  >
                    Todos
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={filterFinished === "finished"}
                    onCheckedChange={() => setFilterFinished("finished")}
                  >
                    Finalizados
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={filterFinished === "ongoing"}
                    onCheckedChange={() => setFilterFinished("ongoing")}
                  >
                    Em Andamento
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              {/* <Button className="h-10">
                <PlusCircle className="mr-2 h-4 w-4" />
                Novo Plano de Ação
              </Button> */}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isFetchingPeriodsActionPlans && <Spinner />}
            {!isFetchingPeriodsActionPlans && (
              <>
                {" "}
                {filteredPlans.map((plan) => (
                  <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="overflow-hidden">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary mix-blend-multiply" />
                        <CardHeader className="relative z-10">
                          <CardTitle className="text-lg font-semibold truncate text-white">
                            {plan.title}
                          </CardTitle>
                        </CardHeader>
                      </div>
                      <CardContent className="p-4 space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray 700">
                            {translateClassification(plan.period.classification)}
                          </span>
                          <span className="text-sm text-gray 700">{plan.rig.name}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">
                            Criado em:{" "}
                            {format(plan.createdAt, "dd/MM/yyyy", { locale: ptBR })}
                          </span>
                          <Badge variant={plan.isFinished ? "default" : "secondary"}>
                            {plan.isFinished ? "Finalizado" : "Em Andamento"}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">
                            Progresso:{" "}
                            {
                              plan.periodActionPlanItems.filter((item) => item.isFinished)
                                .length
                            }
                            /{plan.periodActionPlanItems.length}
                          </span>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="icon" title="Visualizar">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              title="Editar"
                              onClick={() => navigate(`/period-action-plan/${plan.id}`)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" title="Excluir">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
