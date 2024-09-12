import { Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";
import { currentVersion } from "@/app/config/CurrentVersion";
import { SidebarLayout, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

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
  //const {isUserAdm, userAccessLevel} = useAuth();
  return (
    <SidebarLayout>
      <div className=" w-full h-full flex ">
        {/* <Navbar /> */}

        <AppSidebar />

        <SidebarTrigger />

        {/*  <Sidebar /> */}

        <SystemVersion />

        <Outlet />
      </div>
    </SidebarLayout>
  );
};
