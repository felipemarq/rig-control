"use client";
import { UserCog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserStatusToggle } from "./UserStatusToggle";
import { UserPermissionsDialog } from "./UserPermissionsDialog";
import { User } from "@/app/entities/User";
import { useListUsers } from "../context/useListUsers";
import { formatLastlogin } from "@/app/utils/formatLastLogin";

interface UsersTableProps {
  users: User[];
}

export function UsersTable({ users }: UsersTableProps) {
  const {
    handleOpenEditUserDialog,
    selectedUser,
    isEditUserDialogOpen,
    handleCloseEditUserDialog,
  } = useListUsers();

  return (
    <Card>
      <div className="p-4 border-b"></div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Permissões</TableHead>
            <TableHead>Último Acesso</TableHead>

            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center py-6 text-muted-foreground"
              >
                No users found
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <UserStatusToggle isActive={user.isActive} />
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {user.permissions
                      .filter(
                        (permission) =>
                          permission.canCreate ||
                          permission.canEdit ||
                          permission.canView,
                      )
                      .map((permission) => (
                        <div
                          key={permission.id}
                          className="px-2 py-1 text-xs rounded-full bg-muted"
                        >
                          {permission.module}
                        </div>
                      ))}
                  </div>
                </TableCell>
                <TableCell>
                  {formatLastlogin(user.userLog[0].loginTime)}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleOpenEditUserDialog(user)}
                  >
                    <UserCog className="h-4 w-4 mr-2" />
                    Permissions
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      {selectedUser && (
        <UserPermissionsDialog
          user={selectedUser}
          open={isEditUserDialogOpen}
          onClose={handleCloseEditUserDialog}
        />
      )}
    </Card>
  );
}
