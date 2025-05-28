"use client";

import { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { mockContracts } from "../mockData";
import { customColorToast } from "@/app/utils/customColorToast";
import { useTheme } from "@/app/contexts/ThemeContext";

const wellSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  contractId: z.string().optional(),
});

type WellFormData = z.infer<typeof wellSchema>;

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

interface WellDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  well?: Well | null;
  onClose?: () => void;
  onWellCreated?: (well: Well) => void;
  onWellUpdated?: (well: Well) => void;
}

export function WellDialog({
  open,
  onOpenChange,
  well,
  onClose,
  onWellCreated,
  onWellUpdated,
}: WellDialogProps) {
  const [contracts] = useState<Contract[]>(mockContracts);
  const [isLoading, setIsLoading] = useState(false);
  const isEditing = !!well;
  const { primaryColor } = useTheme();

  const form = useForm<WellFormData>({
    resolver: zodResolver(wellSchema),
    defaultValues: {
      name: "",
      contractId: "", // Updated default value to be a non-empty string
    },
  });

  useEffect(() => {
    if (open) {
      if (well) {
        form.reset({
          name: well.name,
          contractId: well.contractId || "",
        });
      } else {
        form.reset({
          name: "",
          contractId: "", // Updated default value to be a non-empty string
        });
      }
    }
  }, [open, well, form]);

  const onSubmit = async (data: WellFormData) => {
    setIsLoading(true);

    // Simular delay de API
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      const selectedContract = contracts.find((c) => c.id === data.contractId);

      const wellData: Well = {
        id: isEditing ? well!.id : `well-${Date.now()}`,
        name: data.name,
        contractId: data.contractId || null,
        contract: selectedContract
          ? { id: selectedContract.id, name: selectedContract.name }
          : null,
      };

      if (isEditing) {
        onWellUpdated?.(wellData);
        customColorToast(
          "Poço atualizado com sucesso!",
          primaryColor,
          "success",
        );
      } else {
        onWellCreated?.(wellData);
        customColorToast("Poço criado com sucesso!", primaryColor, "success");
      }

      onOpenChange(false);
      onClose?.();
    } catch (error) {
      console.error("Erro ao salvar poço:", error);
      customColorToast("Erro ao salvar poço!", primaryColor, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar Poço" : "Novo Poço"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            control={form.control}
            name="name"
            render={({ field }) => (
              <Input placeholder="Digite o nome do poço" {...field} />
            )}
          />
          <Controller
            control={form.control}
            name="contractId"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um contrato" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value={"null"}>Sem contrato</SelectItem>{" "}
                  {/* Updated value prop to be a non-empty string */}
                  {contracts.map((contract) => (
                    <SelectItem key={contract.id} value={contract.id}>
                      {contract.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Salvando..." : isEditing ? "Atualizar" : "Criar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
