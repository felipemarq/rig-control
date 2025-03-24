"use client";

import { useEffect } from "react";
import { Check, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { User } from "@/app/entities/User";
import { z } from "zod";
import { Module } from "@/app/entities/Module";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { permissionsService } from "@/app/services/permissionsService";
import { customColorToast } from "@/app/utils/customColorToast";
import { useTheme } from "@/app/contexts/ThemeContext";
import { QueryKeys } from "@/app/config/QueryKeys";
import { useListUsers } from "../context/useListUsers";
import { AxiosError } from "axios";
import { treatAxiosError } from "@/app/utils/treatAxiosError";

// Schema de validação com Zod
const permissionSchema = z.object({
  canView: z.boolean(),
  canEdit: z.boolean(),
  canCreate: z.boolean(),
});
const allModules = Object.values(Module);

const formSchema = z.object(
  Object.fromEntries(
    allModules.map((module) => [module, permissionSchema]),
  ) as Record<Module, typeof permissionSchema>,
);

type FormData = z.infer<typeof formSchema>;

interface UserPermissionsDialogProps {
  user: User;
  open: boolean;
  onClose: () => void;
}

export function UserPermissionsDialog({
  user,
  open,
  onClose,
}: UserPermissionsDialogProps) {
  const { primaryColor } = useTheme();
  const queryClient = useQueryClient();
  const { handleRefetchUsers } = useListUsers();

  const {
    handleSubmit: hookFormHandleSubmit,
    control,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: Object.fromEntries(
      allModules.map((module) => {
        const existingPermission = user?.permissions.find(
          (p) => p.module === module,
        );
        return [
          module,
          {
            canView: existingPermission?.canView ?? false,
            canEdit: existingPermission?.canEdit ?? false,
            canCreate: existingPermission?.canCreate ?? false,
          },
        ];
      }),
    ) as z.infer<typeof formSchema>,
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: permissionsService.update,
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    const updatedPermissions = allModules.map((module) => ({
      id:
        user.permissions.find((p) => p.module === module)?.id ||
        `new-${module}`,
      userId: user.id,
      module,
      canView: data[module].canView,
      canEdit: data[module].canEdit,
      canCreate: data[module].canCreate,
    }));

    try {
      await mutateAsync({ permissions: updatedPermissions });

      customColorToast(
        "Permissões atualizadas com sucesso!",
        primaryColor,
        "success",
      );
      reset();
      onClose();

      queryClient.invalidateQueries({ queryKey: [QueryKeys.USERS] });
      handleRefetchUsers();
    } catch (error: any | typeof AxiosError) {
      treatAxiosError(error);
      console.log(error);
    }
  });

  // Resetar o formulário ao abrir o modal
  useEffect(() => {
    reset(
      Object.fromEntries(
        allModules.map((module) => {
          const existingPermission = user?.permissions.find(
            (p) => p.module === module,
          );
          return [
            module,
            {
              canView: existingPermission?.canView ?? false,
              canEdit: existingPermission?.canEdit ?? false,
              canCreate: existingPermission?.canCreate ?? false,
            },
          ];
        }),
      ) as z.infer<typeof formSchema>,
    );
  }, [user, open, reset]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Editar permissões do usuário</DialogTitle>
          <DialogDescription>
            Gerencie as permissões de módulo para {user.name} ({user.email})
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="OPERATION" className="mt-4">
            <TabsList className="grid grid-cols-4">
              {allModules.map((module) => (
                <TabsTrigger key={module} value={module}>
                  {module}
                </TabsTrigger>
              ))}
            </TabsList>

            {allModules.map((module) => (
              <TabsContent
                key={module}
                value={module}
                className="space-y-4 py-4"
              >
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Controller
                      name={`${module}.canView`}
                      control={control}
                      render={({ field }) => (
                        <>
                          <Checkbox
                            id={`${module}-view`}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                          <Label htmlFor={`${module}-view`}>
                            Pode Visualizar
                          </Label>
                        </>
                      )}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Controller
                      name={`${module}.canEdit`}
                      control={control}
                      render={({ field }) => (
                        <>
                          <Checkbox
                            id={`${module}-edit`}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                          <Label htmlFor={`${module}-edit`}>Pode Editar</Label>
                        </>
                      )}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Controller
                      name={`${module}.canCreate`}
                      control={control}
                      render={({ field }) => (
                        <>
                          <Checkbox
                            id={`${module}-create`}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                          <Label htmlFor={`${module}-create`}>Pode Criar</Label>
                        </>
                      )}
                    />
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => onClose()}>
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
            <Button type="submit" isLoading={isPending} disabled={isPending}>
              <Check className="h-4 w-4 mr-2" />
              Salvar Alterações
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
