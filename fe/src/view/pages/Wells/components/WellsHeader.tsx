"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WellDialog } from "./WellDialog";

export function WellsHeader() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Gerenciamento de Poços
        </h1>
        <p className="text-muted-foreground">
          Gerencie todos os poços do sistema
        </p>
      </div>
      <Button
        onClick={() => setIsDialogOpen(true)}
        className="w-full sm:w-auto"
      >
        <Plus className="mr-2 h-4 w-4" />
        Novo Poço
      </Button>
      <WellDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </div>
  );
}
