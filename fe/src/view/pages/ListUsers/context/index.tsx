import { createContext } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useUsers } from "../../../../app/hooks/users/useUsers";
import { ChangeEvent, useMemo, useState } from "react";
import { useAuth } from "../../../../app/hooks/useAuth";
import { User } from "@/app/entities/User";

type OrderByLastLogin = "ASC" | "DESC";

interface ListUsersContextValue {
  users: User[];
  navigate: NavigateFunction;
  hasUsers: boolean;
  searchTerm: string;
  filteredUsers: User[];
  isFetchingUsers: boolean;
  orderByLastLogin: OrderByLastLogin | null;
  handleOrderByLastLogin: (orderBy: OrderByLastLogin) => void;
  handleChangeSearchTerm: (event: ChangeEvent<HTMLInputElement>) => void;
  handleOpenEditUserDialog: (user: User) => void;
  isEditUserDialogOpen: boolean;
  selectedUser: User | null;
  handleCloseEditUserDialog: () => void;
  handleRefetchUsers: () => void;
}

export const ListUsersContext = createContext({} as ListUsersContextValue);

export const ListUsersContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const navigate = useNavigate();
  const [filters] = useState({ contractId: "" });
  const { isUserAdm } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [orderByLastLogin, setOrderByLastLogin] =
    useState<OrderByLastLogin | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditUserDialogOpen, setIsEditUserDialogOpen] = useState(false);

  const { users, isFetchingUsers, refetchUsers } = useUsers(filters, isUserAdm);

  const handleRefetchUsers = () => {
    refetchUsers();
  };

  const handleOpenEditUserDialog = (user: User) => {
    setSelectedUser(user);
    setIsEditUserDialogOpen(true);
  };

  const handleCloseEditUserDialog = () => {
    setIsEditUserDialogOpen(false);
    setSelectedUser(null);
  };

  const handleChangeSearchTerm = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleOrderByLastLogin = (orderBy: OrderByLastLogin) => {
    setOrderByLastLogin(orderBy);
  };

  const filteredUsers = useMemo(() => {
    const filteredUsers = users.filter((user) =>
      user.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()),
    );

    const sort = filteredUsers.sort((userA, userB) => {
      if (orderByLastLogin === "ASC") {
        return (
          Number(new Date(userA.userLog[0].loginTime)) -
          Number(new Date(userB.userLog[0].loginTime))
        );
      }

      return (
        Number(new Date(userB.userLog[0].loginTime)) -
        Number(new Date(userA.userLog[0].loginTime))
      );
    });

    return sort;
  }, [searchTerm, users, orderByLastLogin]);

  const hasUsers = filteredUsers.length > 0;
  return (
    <ListUsersContext.Provider
      value={{
        users,
        navigate,
        hasUsers,
        searchTerm,
        filteredUsers,
        isFetchingUsers,
        orderByLastLogin,
        handleOrderByLastLogin,
        handleChangeSearchTerm,
        handleOpenEditUserDialog,
        isEditUserDialogOpen,
        selectedUser,
        handleCloseEditUserDialog,
        handleRefetchUsers,
      }}
    >
      {children}
    </ListUsersContext.Provider>
  );
};
