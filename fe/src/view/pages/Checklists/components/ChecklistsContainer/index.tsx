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
import { format } from "date-fns";
import { useChecklistsContext } from "../ChecklistsContext/useChecklistsContext";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  Edit,
  Eye,
  PlusCircle,
  Search,
  Trash,
} from "lucide-react";
import { DeleteModal } from "@/view/components/DeleteModal";
import { NotFound } from "@/view/components/NotFound";
import { Badge } from "@/components/ui/badge";
import { NewChecklistModal } from "../modals/NewChecklistModal";
import { EditChecklistModal } from "../modals/EditChecklistModal";
import { ChecklistModal } from "../modals/ChecklistModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const ChecklistsContainer = () => {
  const {
    filteredChecklists,
    openEditChecklistModal,
    isDeleteModalOpen,
    handleCloseDeleteModal,
    handleOpenDeleteModal,
    handleDeleteChecklist,
    isLoadingRemoveChecklist,
    checklistIdBeingDeleted,
    openChecklistModal,
    checklistBeingSeen,
    searchTerm,
    handleChangeSearchTerm,
    openNewChecklistModal,
  } = useChecklistsContext();
  if (isDeleteModalOpen && checklistIdBeingDeleted) {
    return (
      <DeleteModal
        open={isDeleteModalOpen}
        title="Tem certeza que deseja excluir esse checklist?"
        description=" Ao excluir o checklist, também serão excluídos todos as pontuações e arquivos relacionadas."
        onClose={handleCloseDeleteModal}
        onConfirm={handleDeleteChecklist}
        isLoading={isLoadingRemoveChecklist}
      />
    );
  }
  return (
    <div className="space-y-4 col-span-full">
      <Card className="overflow-hidden bg-white">
        <CardHeader className="bg-card">
          <CardTitle className="text-black">
            Inspeções de campo do SGI
          </CardTitle>
        </CardHeader>

        <CardContent className="py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 ">
            <div className="flex items-center gap-4  w-full justify-between">
              <div className="relative w-full sm:w-96 ">
                <Input
                  placeholder="Buscar checklists..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => handleChangeSearchTerm(e)}
                />
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
              </div>
              <Button className="h-10" onClick={openNewChecklistModal}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Novo checklist
              </Button>
            </div>
          </div>
          {filteredChecklists.length <= 0 && (
            <NotFound>
              {" "}
              <div>Sem registros no período selecionado</div>
            </NotFound>
          )}
          {filteredChecklists.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Sonda</TableHead>
                  <TableHead>Poço</TableHead>
                  <TableHead>Encarregado</TableHead>
                  <TableHead>Turma</TableHead>
                  <TableHead>Pontuação</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredChecklists.map((checklist) => (
                  <TableRow key={checklist.id}>
                    <TableCell>
                      {format(checklist.date, "dd/MM/yyyy")}
                    </TableCell>
                    <TableCell>{checklist.rig.name}</TableCell>
                    <TableCell>{checklist.well.name}</TableCell>
                    <TableCell>{checklist.supervisor}</TableCell>
                    <TableCell>{checklist.team}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          checklist.score < checklist.goal
                            ? "destructive"
                            : "default"
                        }
                      >
                        {checklist.score.toFixed(2)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onSelect={() => openChecklistModal(checklist)}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            <span>Visualizar</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onSelect={() => openEditChecklistModal(checklist)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Editar</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onSelect={() => handleOpenDeleteModal(checklist.id)}
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
        </CardContent>
      </Card>

      <NewChecklistModal />
      {checklistBeingSeen && <EditChecklistModal />}
      {checklistBeingSeen && <ChecklistModal />}
    </div>
  );
};
