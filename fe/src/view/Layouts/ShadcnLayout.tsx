import { Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";
import { currentVersion } from "@/app/config/CurrentVersion";
import { SidebarLayout, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Suspense } from "react";
import SuspenseFallback from "../components/SuspenseFallback";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { ErrorBoundaryFallback } from "../components/ErrorBoundaryFallback";
import { useAuth } from "@/app/hooks/useAuth";
import { WrongVersionAlertModal } from "../pages/Dashboard/components/WrongVersionAlertModal";

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
  const { isWrongVersion } = useAuth();
  return (
    <SidebarLayout>
      <div className=" w-full h-full flex ">
        {/* <Navbar /> */}

        <AppSidebar />

        <SidebarTrigger />

        {/*  <Sidebar /> */}

        <SystemVersion />
        <ErrorBoundary fallback={<ErrorBoundaryFallback />}>
          {" "}
          <Suspense fallback={<SuspenseFallback />}>
            {!isWrongVersion && <Outlet />}
            {isWrongVersion && <WrongVersionAlertModal />}
          </Suspense>
        </ErrorBoundary>
      </div>
    </SidebarLayout>
  );
};
