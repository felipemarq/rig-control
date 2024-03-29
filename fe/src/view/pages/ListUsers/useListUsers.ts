import {useNavigate} from "react-router-dom";
import {useUsers} from "../../../app/hooks/users/useUsers";
import {useState} from "react";
import {useAuth} from "../../../app/hooks/useAuth";

export const useListUsers = () => {
  const navigate = useNavigate();
  const [filters] = useState({contractId: ""});
  const {isUserAdm} = useAuth();

  const {users, isFetchingUsers} = useUsers(filters, isUserAdm);

  return {
    users,
    isFetchingUsers,
    navigate,
  };
};
