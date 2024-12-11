import { UserLogsContext, UserLogsProvider } from "./components/UserLogsContext";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogType } from "@/app/entities/LogType";
import { formatLastlogin } from "@/app/utils/formatLastLogin";

const UserLogs = () => {
  return (
    <UserLogsProvider>
      <UserLogsContext.Consumer>
        {({
          isFetchingUserLogs,
          totalUserLogs,
          userLogs,
          filters,
          logTypeTranslation,
          handleChangeFilters,
          totalPages,
        }) => (
          <div className="w-full h-full ">
            <div className="container mx-auto py-10 ">
              <h1 className="text-3xl font-bold mb-8">Logs de Atividade dos Usuários</h1>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="col-span-1 md:col-span-2 lg:col-span-1 bg-white">
                  <Select
                    onValueChange={(value) =>
                      handleChangeFilters("logType")(
                        value === "ALL" ? "ALL" : (value as LogType)
                      )
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo do Log" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALL">Todos os tipos de Log</SelectItem>
                      {Object.values(LogType).map((type) => (
                        <SelectItem key={type} value={type}>
                          {logTypeTranslation[type]?.label || type.replace(/_/g, " ")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="rounded-md border shadow-sm overflow-hidden bg-white p-5">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Usuário</TableHead>
                      <TableHead>Tipo do Log</TableHead>
                      <TableHead>Horário</TableHead>
                      <TableHead>Nível de Acesso</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isFetchingUserLogs ? (
                      <TableRow>
                        <TableCell colSpan={4} className="h-24 text-center">
                          <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : userLogs.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="h-24 text-center">
                          No logs found
                        </TableCell>
                      </TableRow>
                    ) : (
                      userLogs.map((userLog) => (
                        <TableRow key={userLog.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center space-x-3">
                              <Avatar>
                                <AvatarImage
                                  src={`https://api.dicebear.com/6.x/initials/svg?seed=${userLog.user.name}`}
                                />
                                <AvatarFallback>
                                  {userLog.user.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-bold">{userLog.user.name}</div>
                                <div className="text-sm text-muted-foreground">
                                  {userLog.user.email}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={"default"}>
                              {logTypeTranslation[userLog.logType as LogType]?.label}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {formatLastlogin(userLog.loginTime)}
                          </TableCell>
                          <TableCell>{userLog.user.accessLevel}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="flex items-center justify-between space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                  Mostrando{" "}
                  <span className="font-medium">
                    {userLogs.length < Number(filters.pageSize)
                      ? userLogs.length
                      : Number(filters.pageIndex) * Number(filters.pageSize)}
                  </span>{" "}
                  de <span className="font-medium">{totalUserLogs}</span> resultados
                </div>
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      handleChangeFilters("pageIndex")(
                        (Number(filters.pageIndex) - 1).toString()
                      );
                    }}
                    disabled={filters.pageIndex === "1"}
                  >
                    Anterior
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      handleChangeFilters("pageIndex")(
                        (Number(filters.pageIndex) + 1).toString()
                      );
                    }}
                    disabled={Number(filters.pageIndex) >= totalPages}
                  >
                    Próximo
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </UserLogsContext.Consumer>
    </UserLogsProvider>
  );
};
export default UserLogs;
