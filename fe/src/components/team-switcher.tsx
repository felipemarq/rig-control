import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

export function TeamSwitcher() {
  const { isMobile, state } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-sidebar hover:text-sidebar-foreground cursor-default"
        >
          {(state === "expanded" || isMobile) && (
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">Rig Manager</span>
              <span className="truncate text-xs">2025</span>
            </div>
          )}
          <SidebarTrigger />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
