import { Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";
import { currentVersion } from "@/app/config/CurrentVersion";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Suspense } from "react";
import SuspenseFallback from "../components/SuspenseFallback";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { ErrorBoundaryFallback } from "../components/ErrorBoundaryFallback";
import { useAuth } from "@/app/hooks/useAuth";
import { WrongVersionAlertModal } from "../pages/Dashboard/components/WrongVersionAlertModal";
import UrgentWarningSummaryDialog from "../components/UrgentWarningSummaryDialog";

export const SystemVersion = () => {
  return (
    <div
      className={cn(
        "fixed   text-sm text-gray-400 p-1 lg:p-4 z-50 rounded-lg bottom-2 right-5"
      )}
    >
      <span>{currentVersion.version}</span>
    </div>
  );
};

export const ShadcnLayout = () => {
  //const {activeItem,handleNavItemChange} = useMainLayout()
  const { isWrongVersion, pendingEfficienciesConfirmation } = useAuth();

  return (
    <SidebarProvider>
      <div className=" w-full h-full flex ">
        {/* <Navbar /> */}

        <AppSidebar />
        <SidebarTrigger className="-ml-1 sm:sr-only" />

        {/*  <Sidebar /> */}

        <SystemVersion />
        <ErrorBoundary fallback={<ErrorBoundaryFallback />}>
          {" "}
          <Suspense fallback={<SuspenseFallback />}>
            {!isWrongVersion && (
              <SidebarInset>
                <Outlet />
              </SidebarInset>
            )}
            {isWrongVersion && <WrongVersionAlertModal />}
            {pendingEfficienciesConfirmation.length > 0 && (
              <UrgentWarningSummaryDialog
                //@ts-ignore
                pendingEfficienciesConfirmation={pendingEfficienciesConfirmation}
              />
            )}
          </Suspense>
        </ErrorBoundary>
      </div>
    </SidebarProvider>
  );
};
