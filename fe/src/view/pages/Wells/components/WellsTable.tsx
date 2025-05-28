"use client";

import { useState, useEffect } from "react";
import { MoreHorizontal, Pencil, Trash2, Filter } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { WellDialog } from "./WellDialog";
import { DeleteWellDialog } from "./WellDeleteDialog";
import { mockContracts, mockWells } from "../mockData";

interface Well {
  id: string;
  name: string;
  contractId: string | null;
  contract: {
    id: string;
    name: string;
  } | null;
}

interface Contract {
  id: string;
  name: string;
}

export function WellsTable() {
  const [wells, setWells] = useState<Well[]>(mockWells);
  const [contracts] = useState<Contract[]>(mockContracts);
  const [filteredWells, setFilteredWells] = useState<Well[]>(mockWells);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContract, setSelectedContract] = useState<string>("all");
  const [editingWell, setEditingWell] = useState<Well | null>(null);
  const [deletingWell, setDeletingWell] = useState<Well | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    filterWells();
  }, [wells, searchTerm, selectedContract]);

  const filterWells = () => {
    let filtered = wells;

    if (searchTerm) {
      filtered = filtered.filter((well) =>
        well.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (selectedContract !== "all") {
      filtered = filtered.filter(
        (well) => well.contractId === selectedContract,
      );
    }

    setFilteredWells(filtered);
  };

  const handleEdit = (well: Well) => {
    setEditingWell(well);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (well: Well) => {
    setDeletingWell(well);
    setIsDeleteDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsEditDialogOpen(false);
    setEditingWell(null);
  };

  const handleDeleteDialogClose = () => {
    setIsDeleteDialogOpen(false);
    setDeletingWell(null);
  };

  const handleWellCreated = (newWell: Well) => {
    setWells([...wells, newWell]);
  };

  const handleWellUpdated = (updatedWell: Well) => {
    setWells(
      wells.map((well) => (well.id === updatedWell.id ? updatedWell : well)),
    );
  };

  const handleWellDeleted = (deletedWellId: string) => {
    setWells(wells.filter((well) => well.id !== deletedWellId));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Buscar poços..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <Select value={selectedContract} onValueChange={setSelectedContract}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filtrar por contrato" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os contratos</SelectItem>
            {contracts.map((contract) => (
              <SelectItem key={contract.id} value={contract.id}>
                {contract.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome do Poço</TableHead>
              <TableHead>Contrato</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[70px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredWells.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center py-8 text-muted-foreground"
                >
                  Nenhum poço encontrado
                </TableCell>
              </TableRow>
            ) : (
              filteredWells.map((well) => (
                <TableRow key={well.id}>
                  <TableCell className="font-medium">{well.name}</TableCell>
                  <TableCell>
                    {well.contract ? (
                      <Badge variant="secondary">{well.contract.name}</Badge>
                    ) : (
                      <span className="text-muted-foreground">
                        Sem contrato
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">Ativo</Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(well)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(well)}
                          className="text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <WellDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        well={editingWell}
        onClose={handleDialogClose}
        onWellCreated={handleWellCreated}
        onWellUpdated={handleWellUpdated}
      />

      <DeleteWellDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        well={deletingWell}
        onClose={handleDeleteDialogClose}
        onWellDeleted={handleWellDeleted}
      />
    </div>
  );
}
