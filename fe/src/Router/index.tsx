// Importando bibliotecas e componentes necessários
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AuthGuard } from "./AuthGuard";
import { Login } from "../view/pages/Login";
import { Dashboard } from "../view/pages/Dashboard";
import { Register } from "../view/pages/Register";
import { AuthLayout } from "../view/Layouts/AuthLayout";
import { Form } from "../view/pages/Form";
import { List } from "../view/pages/List";
import { BillingDashboard } from "../view/pages/BillingDashboard";
import { Details } from "../view/pages/Details";
import { CreateRig } from "../view/pages/CreateRig";
import { CreateContract } from "../view/pages/CreateContract";
import { Contract } from "../view/pages/Contract";
import { ListUsers } from "../view/pages/ListUsers";
import { CreateUser } from "../view/pages/CreateUser";
import { UpdateUser } from "../view/pages/UpdateUser";
import { UpdateUserRigs } from "../view/pages/UpdateUserRigs";
import { ListRigs } from "../view/pages/ListRigs";
import { BillingRigDetailDashboard } from "../view/pages/BillingRigDetailDashboard";
//import { InDevelopmentPage } from "../view/pages/InDevelopmentPage";
import { UpdateForm } from "../view/pages/UpdateForm";
import { Report } from "../view/pages/Report";
import { InvoicingMenu } from "../view/pages/InvoicingMenu";
import { GlobalDashboard } from "../view/pages/GlobalDashboard";
import { useAuth } from "../app/hooks/useAuth";
import { FormMenu } from "../view/pages/FormMenu";
import { PendingForm } from "../view/pages/PendingForm";
import { AppLayout } from "@/view/Layouts/AppLayout";
import { Occurrences } from "@/view/pages/Occurrences";
import { ManHours } from "@/view/pages/ManHours";
import { ManHoursDashboard } from "@/view/pages/ManHoursDashboard";
import { InDevelopmentPage } from "@/view/pages/InDevelopmentPage";

export const Router = () => {
  const { isUserAdm } = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota para páginas não autenticadas */}
        <Route element={<AuthGuard isPrivate={false} />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Route>

        {/* Rota para páginas autenticadas */}
        <Route element={<AuthGuard isPrivate={true} />}>
          {/* Define o layout baseado na largura da janela */}
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/in-development" element={<InDevelopmentPage />} />

            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/global-dashboard"
              element={isUserAdm ? <GlobalDashboard /> : <Dashboard />}
            />

            <Route path="/form" element={<Form />} />
            <Route path="/form/:efficiencyId" element={<UpdateForm />} />
            <Route
              path="/pending-form/:efficiencyId"
              element={<PendingForm />}
            />
            <Route path="/form/menu" element={<FormMenu />} />

            <Route path="/list" element={<List />} />
            <Route path="/invoicing-dashboard" element={<BillingDashboard />} />
            <Route
              path="/invoicing-rig-dashboard"
              element={<BillingRigDetailDashboard />}
            />
            <Route path="/invoicing" element={<InvoicingMenu />} />

            <Route path="/details/:efficiencyId" element={<Details />} />
            <Route path="/create-rig" element={<CreateRig />} />
            <Route path="/list-rigs" element={<ListRigs />} />
            <Route path="/create-contract" element={<CreateContract />} />
            <Route path="/contracts" element={<Contract />} />
            <Route path="/users" element={<ListUsers />} />
            <Route path="/create-user" element={<CreateUser />} />
            <Route path="/users/:id" element={<UpdateUser />} />
            <Route path="/users/update-rigs/:id" element={<UpdateUserRigs />} />
            <Route path="/reports" element={<Report />} />
            <Route path="/occurrences" element={<Occurrences />} />
            <Route path="/man-hours" element={<ManHours />} />
            <Route path="/occurrences/man-hours" element={<ManHours />} />
            <Route
              path="/dashboard/man-hours"
              element={<ManHoursDashboard />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
