import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarItem, SidebarLabel } from "@/components/ui/sidebar";
import { useAppsidebar } from "./useAppsidebar";

export const AppSidebar = () => {
  const { user, signout, data } = useAppsidebar();

  return (
    <Sidebar>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarItem>
          <SidebarLabel>Platform</SidebarLabel>
          <NavMain items={data.navMain} searchResults={data.searchResults} />
        </SidebarItem>
        <SidebarItem>
          {/*   <SidebarLabel>Projects</SidebarLabel> */}
          {/*   <NavProjects projects={data.projects} /> */}
        </SidebarItem>
        <SidebarItem className="mt-auto">
          <SidebarLabel>Ajuda</SidebarLabel>
          <NavSecondary items={data.navSecondary} />
        </SidebarItem>
        {/* <SidebarItem>
          <StorageCard />
        </SidebarItem> */}
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
    </Sidebar>
  );
};
