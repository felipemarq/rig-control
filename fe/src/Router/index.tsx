// Importando bibliotecas e componentes necessários
import { Routes, Route, BrowserRouter, Outlet } from "react-router-dom";
import { AuthGuard } from "./AuthGuard";
import { Login } from "../view/pages/Login";
import { Register } from "../view/pages/Register";
import { AuthLayout } from "../view/Layouts/AuthLayout";
import { useAuth } from "../app/hooks/useAuth";
import { InDevelopmentPage } from "@/view/pages/InDevelopmentPage";
import { ShadcnLayout } from "@/view/Layouts/ShadcnLayout";
import { lazy, Suspense } from "react";
import { PageLoader } from "@/view/components/PageLoader";
import { ErrorBoundary } from "@/view/components/ErrorBoundary";
import { ErrorBoundaryFallback } from "@/view/components/ErrorBoundaryFallback";

const Dashboard = lazy(() => import("@/view/pages/Dashboard/index"));
const GlobalDashboard = lazy(() => import("@/view/pages/GlobalDashboard/index"));
const Form = lazy(() => import("@/view/pages/Form/index"));
const UpdateForm = lazy(() => import("@/view/pages/UpdateForm/index"));
const PendingForm = lazy(() => import("@/view/pages/PendingForm/index"));
const FormMenu = lazy(() => import("@/view/pages/FormMenu/index"));
const List = lazy(() => import("@/view/pages/List/index"));
const BillingDashboard = lazy(() => import("@/view/pages/BillingDashboard/index"));
const InvoicingMenu = lazy(() => import("@/view/pages/InvoicingMenu/index"));
const BillingRigDetailDashboard = lazy(
  () => import("@/view/pages/BillingRigDetailDashboard/index")
);
const Details = lazy(() => import("@/view/pages/Details/index"));
const CreateRig = lazy(() => import("@/view/pages/CreateRig/index"));
const ListRigs = lazy(() => import("@/view/pages/ListRigs/index"));
const CreateContract = lazy(() => import("@/view/pages/CreateContract/index"));
const Contract = lazy(() => import("@/view/pages/Contract/index"));
const ListUsers = lazy(() => import("@/view/pages/ListUsers/index"));
const CreateUser = lazy(() => import("@/view/pages/CreateUser/index"));
const UpdateUser = lazy(() => import("@/view/pages/UpdateUser/index"));
const UpdateUserRigs = lazy(() => import("@/view/pages/UpdateUserRigs/index"));
/* const Report = lazy(() => import("@/view/pages/Report/index")); */
const Occurrences = lazy(() => import("@/view/pages/Occurrences/index"));
const ManHours = lazy(() => import("@/view/pages/ManHours/index"));
const TotalManHoursDashboard = lazy(
  () => import("@/view/pages/TotalManHoursDashboard/index")
);
const CreateBillingConfiguration = lazy(
  () => import("@/view/pages/CreateBillingConfiguration/index")
);
const BillingConfiguration = lazy(
  () => import("@/view/pages/BillingConfiguration/index")
);
const ManHoursDashboard = lazy(() => import("@/view/pages/ManHoursDashboard/index"));
const SmsDashboard = lazy(() => import("@/view/pages/SmsDashboard/index"));
const UserLogs = lazy(() => import("@/view/pages/UserLogs/index"));
const CreatePeriodActionPlan = lazy(
  () => import("@/view/pages/CreatePeriodActionPlan/index")
);
const EditPeriodActionPlan = lazy(() => import("@/view/pages/EditPeriodActionPlan"));
const PeriodActionPlan = lazy(() => import("@/view/pages/PeriodActionPlan/index"));

function RouterErrorBoundary() {
  return (
    <ErrorBoundary fallback={<ErrorBoundaryFallback />}>
      <Outlet />
    </ErrorBoundary>
  );
}

export const Router = () => {
  const { isUserAdm, isUserSms, isUserSupervisor } = useAuth();
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader isLoading />}>
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
            <Route element={<ShadcnLayout />}>
              <Route element={<RouterErrorBoundary />}>
                <Route
                  path="/"
                  element={
                    isUserAdm || isUserSms || isUserSupervisor ? (
                      <GlobalDashboard />
                    ) : (
                      <Dashboard />
                    )
                  }
                />
                <Route path="/in-development" element={<InDevelopmentPage />} />

                <Route path="/dashboard" element={<Dashboard />} />
                <Route
                  path="/global-dashboard"
                  element={
                    isUserAdm || isUserSms || isUserSupervisor ? (
                      <GlobalDashboard />
                    ) : (
                      <Dashboard />
                    )
                  }
                />

                <Route path="/form" element={<Form />} />
                <Route path="/form/:efficiencyId" element={<UpdateForm />} />
                <Route path="/pending-form/:efficiencyId" element={<PendingForm />} />
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
                <Route path="/users/user-logs" element={<UserLogs />} />

                <Route path="/users/user-logs/:userId" element={<UserLogs />} />
                <Route path="/reports" element={<InDevelopmentPage />} />
                <Route path="/occurrences" element={<Occurrences />} />
                <Route path="/man-hours" element={<ManHours />} />
                <Route path="/occurrences/man-hours" element={<ManHours />} />
                <Route
                  path="/dashboard/total-man-hours"
                  element={<TotalManHoursDashboard />}
                />
                <Route
                  path="/create-billing-configuration"
                  element={<CreateBillingConfiguration />}
                />
                <Route
                  path="/billing-configuration/:rigId"
                  element={<BillingConfiguration />}
                />

                <Route path="/dashboard/man-hours" element={<ManHoursDashboard />} />
                <Route path="/dashboard/sms" element={<SmsDashboard />} />
                <Route path="/period-action-plan/" element={<PeriodActionPlan />} />
                <Route
                  path="/period-action-plan/create/:periodId"
                  element={<CreatePeriodActionPlan />}
                />
                <Route
                  path="/period-action-plan/:periodActionPlanId"
                  element={<EditPeriodActionPlan />}
                />
              </Route>
            </Route>

            <Route element={<ShadcnLayout />}>
              <Route path="/dashboard-test" element={<Dashboard />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
