import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import { NavMain } from "./NavMain";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useAppsidebar } from "./useAppsidebar"; /* 
import { ModeToggle } from "@/view/components/ModeToggle"; */

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, signout, data } = useAppsidebar();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          signout={signout}
          user={{
            id: user?.id!,
            name: user?.name!,
            email: user?.email!,
            avatar: "",
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

/*
 */
