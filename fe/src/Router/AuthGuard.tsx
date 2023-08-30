import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../app/hooks/useAuth";
//import {useAuth} from "../app/hooks/useAuth";

interface AuthGuardProps {
  isPrivate: Boolean;
}
export const AuthGuard = ({isPrivate}: AuthGuardProps) => {
  const {signedIn} = useAuth();

  if (!signedIn && isPrivate) {
    return <Navigate to="/login" replace />;
  }

  if (signedIn && !isPrivate) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};
