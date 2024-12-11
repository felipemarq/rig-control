import { useListUsers } from "./useListUsers";
import { Activity, ListFilter, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UserCard from "./components/UserCard";
import { Spinner } from "@/view/components/Spinner";
import { useNavigate } from "react-router-dom";

const ListUsers = () => {
  const {
    filteredUsers,
    orderByLastLogin,
    searchTerm,
    handleOrderByLastLogin,
    handleChangeSearchTerm,
    isFetchingUsers,
  } = useListUsers();
  const navigate = useNavigate();
  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Gerenciamento de Usuários</h1>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full max-w-md">
          <Input
            type="text"
            placeholder="Pesquisar usuário"
            value={searchTerm}
            onChange={(event) => handleChangeSearchTerm(event)}
            className="pl-10 pr-4 py-2 w-full"
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-10">
                <ListFilter className="mr-2 h-4 w-4" />
                Ordenar
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Últimos acessos</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={orderByLastLogin === "DESC"}
                onCheckedChange={() => handleOrderByLastLogin("DESC")}
              >
                Mais Recentes
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={orderByLastLogin === "ASC"}
                onCheckedChange={() => handleOrderByLastLogin("ASC")}
              >
                Menos Recentes
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button className="h-10" onClick={() => navigate(`/users/user-logs/`)}>
            <Activity className="mr-2 h-4 w-4" />
            Ver Logs de Usuário
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {isFetchingUsers && (
          <div className="flex justify-center items-center h-1/2">
            <Spinner />
          </div>
        )}

        {!isFetchingUsers && (
          <>
            {filteredUsers.map(({ email, id, name, userLog }) => (
              <UserCard
                email={email}
                id={id}
                name={name}
                loginTime={userLog[0].loginTime}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ListUsers;
