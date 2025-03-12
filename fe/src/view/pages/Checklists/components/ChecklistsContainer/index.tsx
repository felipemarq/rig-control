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
import { ChevronDown, Edit, Eye, Trash, Trash2 } from "lucide-react";
import { DeleteModal } from "@/view/components/DeleteModal";
import { NotFound } from "@/view/components/NotFound";

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
    <div>
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
                <TableCell>{format(checklist.date, "dd/MM/yyyy")}</TableCell>
                <TableCell>{checklist.rig.name}</TableCell>
                <TableCell>{checklist.well.name}</TableCell>
                <TableCell>{checklist.supervisor}</TableCell>
                <TableCell>{checklist.team}</TableCell>
                <TableCell>{checklist.score}</TableCell>
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
    </div>
  );
};
