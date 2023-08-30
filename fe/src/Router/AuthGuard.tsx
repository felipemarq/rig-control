import {Navigate, Outlet} from "react-router-dom";
//import {useAuth} from "../app/hooks/useAuth";

interface AuthGuardProps {
  isPrivate: Boolean;
}
export const AuthGuard = ({isPrivate}: AuthGuardProps) => {
  const signedIn = false;

  if (!signedIn && isPrivate) {
    return <Navigate to="/login" replace />;
  }

  if (signedIn && !isPrivate) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};
