"use client";

import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTheme } from "@/app/contexts/ThemeContext";
import { customColorToast } from "@/app/utils/customColorToast";
import { Button } from "@/components/ui/button";

interface Well {
  id: string;
  name: string;
}

interface DeleteWellDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  well: Well | null;
  onClose?: () => void;
  onWellDeleted?: (wellId: string) => void;
}

export function DeleteWellDialog({
  open,
  onOpenChange,
  well,
  onClose,
  onWellDeleted,
}: DeleteWellDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { primaryColor } = useTheme();

  const handleDelete = async () => {
    if (!well) return;

    setIsLoading(true);

    // Simular delay de API
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      onWellDeleted?.(well.id);
      customColorToast("Poço excluído com sucesso", primaryColor, "success");
      onOpenChange(false);
      onClose?.();
    } catch (error) {
      console.error("Erro ao excluir poço:", error);
      customColorToast("Erro ao excluir poço", primaryColor, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar Exclusão</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja excluir o poço "{well?.name}"? Esta ação não
            pode ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose disabled={isLoading}>Cancelar</DialogClose>
          <Button
            onClick={handleDelete}
            disabled={isLoading}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isLoading ? "Excluindo..." : "Excluir"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
