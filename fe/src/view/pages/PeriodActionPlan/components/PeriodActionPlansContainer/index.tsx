import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Spinner } from "@/view/components/Spinner";
import { usePeriodActionPlansContainer } from "./usePeriodActionPlansContainer";
import { DeleteModal } from "@/view/components/DeleteModal";
import { NotFound } from "@/view/components/NotFound";
import { format } from "date-fns";
import { translateClassification } from "@/app/utils/translateClassification";
import { Button } from "@/components/ui/button";
import { ChevronDown, Edit, Trash } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const PeriodActionPlansContainer = () => {
  const {
    isFetchingPeriodsActionPlans,
    periodActionPlans,
    openEditPeriodActionPlanModal,
    isDeletePeriodActionPlanModalOpen,
    periodActionPlanBeingDeleted,
    handleDeletePeriodActionPlan,
    isLoadingDeletePeriodActionPlan,
    closeDeletePeriodActionPlanModal,
    openDeletePeriodActionPlanModal,
  } = usePeriodActionPlansContainer();

  if (isDeletePeriodActionPlanModalOpen || periodActionPlanBeingDeleted) {
    return (
      <DeleteModal
        title="Excluir Plano de Ação"
        description="Você tem certeza que deseja excluir este plano de ação?"
        onConfirm={handleDeletePeriodActionPlan}
        isLoading={isLoadingDeletePeriodActionPlan}
        onClose={closeDeletePeriodActionPlanModal}
        open={isDeletePeriodActionPlanModalOpen}
      />
    );
  }
  return (
    <div className="space-y-4 col-span-full">
      <Card className="overflow-hidden bg-white">
        <CardHeader className="bg-card">
          <CardTitle className="text-black">Planos de Ação</CardTitle>
        </CardHeader>
        {isFetchingPeriodsActionPlans && <Spinner />}

        {!isFetchingPeriodsActionPlans && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Sonda</TableHead>
                <TableHead>Equipamento</TableHead>
                <TableHead>Criado em</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {periodActionPlans.map((actionPlan) => (
                <TableRow key={actionPlan.id}>
                  <TableCell>{actionPlan.title}</TableCell>
                  <TableCell>{actionPlan.rig.name}</TableCell>
                  <TableCell>
                    {translateClassification(actionPlan.period.classification)}
                  </TableCell>
                  <TableCell>
                    {format(actionPlan.createdAt, "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell>
                    {actionPlan.isFinished ? (
                      <Badge variant="default">Finalizado</Badge>
                    ) : (
                      <Badge variant="destructive">Pendente</Badge>
                    )}
                  </TableCell>

                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {/*    <DropdownMenuItem
                  onSelect={() => openChecklistModal(actionPlan)}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  <span>Visualizar</span>
                </DropdownMenuItem> */}
                        <DropdownMenuItem
                          onSelect={() =>
                            openEditPeriodActionPlanModal(actionPlan)
                          }
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Editar</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onSelect={() =>
                            openDeletePeriodActionPlanModal(actionPlan.id)
                          }
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          <span>Excluir</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {!isFetchingPeriodsActionPlans && periodActionPlans.length === 0 && (
          <div className="col-span-3 my-16">
            <NotFound>
              <strong>Não</strong> existem dados para o <strong>período</strong>{" "}
              selecionado!
            </NotFound>
          </div>
        )}
      </Card>
    </div>
  );
};
