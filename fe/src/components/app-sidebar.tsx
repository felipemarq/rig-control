import {
  Frame,
  History,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  Star,
  Workflow,
  CircleDollarSign,
  Shield,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
} from "@/components/ui/sidebar";
import whiteIcon from "@/assets/images/white-icon.png";
import { useAuth } from "@/app/hooks/useAuth";

const Image = () => {
  return <img src={whiteIcon} />;
};
const data = {
  teams: [
    {
      name: "Conterp",
      logo: Image,
      plan: "Enterprise",
    },
  ],
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Operação",
      url: "#",
      icon: Workflow,
      isActive: true,
      items: [
        {
          title: "Dashboard Geral",
          url: "/global-dashboard",
          icon: History,
          description: "View your recent prompts",
        },
        {
          title: "Dashboard por Sonda",
          url: "/dashboard",
          icon: Star,
          description: "Browse your starred prompts",
        },
        {
          title: "Listar Ocorrências",
          url: "/list",
          icon: Settings2,
          description: "Configure your playground",
        },
        {
          title: "Criar Ocorrência",
          url: "/form/menu",
          icon: Settings2,
          description: "Configure your playground",
        },
        {
          title: "Relatório de Períodos",
          url: "/reports",
          icon: Settings2,
          description: "Configure your playground",
        },
        {
          title: "Listar Sondas",
          url: "/list-rigs",
          icon: Settings2,
          description: "Configure your playground",
        },
        {
          title: "Listar Contratos",
          url: "/contracts",
          icon: Settings2,
          description: "Configure your playground",
        },
        {
          title: "Listar Usuários",
          url: "/users",
          icon: Settings2,
          description: "Configure your playground",
        },
      ],
    },
    {
      title: "Faturamento",
      url: "#",
      icon: CircleDollarSign,
      isActive: true,
      items: [
        {
          title: "Faturam.. Geral",
          url: "/invoicing-dashboard",
          icon: History,
          description: "View your recent prompts",
        },
        {
          title: "Faturam.. por Sonda",
          url: "/invoicing-rig-dashboard",
          icon: Star,
          description: "Browse your starred prompts",
        },
        {
          title: "Valores para Faturam..",
          url: "/create-billing-configuration",
          icon: Settings2,
          description: "Configure your playground",
        },
      ],
    },
    {
      title: "SMS",
      url: "#",
      icon: Shield,
      isActive: true,
      items: [
        {
          title: "Dashboard Geral",
          url: "/dashboard/total-man-hours",
          icon: History,
          description: "View your recent prompts",
        },
        {
          title: "Dashboard por Base",
          url: "/dashboard/man-hours",
          icon: Star,
          description: "Browse your starred prompts",
        },
        {
          title: "Listar Registros",
          url: "/occurrences",
          icon: Settings2,
          description: "Configure your playground",
        },
        {
          title: "Homem Hora",
          url: "/man-hours",
          icon: Settings2,
          description: "Configure your playground",
        },
      ],
    },
  ],

  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
  searchResults: [
    /*  {
      title: "Routing Fundamentals",
      teaser:
        "The skeleton of every application is routing. This page will introduce you to the fundamental concepts of routing for the web and how to handle routing in Next.js.",
      url: "#",
    },
    {
      title: "Layouts and Templates",
      teaser:
        "The special files layout.js and template.js allow you to create UI that is shared between routes. This page will guide you through how and when to use these special files.",
      url: "#",
    },
    {
      title: "Data Fetching, Caching, and Revalidating",
      teaser:
        "Data fetching is a core part of any application. This page goes through how you can fetch, cache, and revalidate data in React and Next.js.",
      url: "#",
    },
    {
      title: "Server and Client Composition Patterns",
      teaser:
        "When building React applications, you will need to consider what parts of your application should be rendered on the server or the client. ",
      url: "#",
    },
    {
      title: "Server Actions and Mutations",
      teaser:
        "Server Actions are asynchronous functions that are executed on the server. They can be used in Server and Client Components to handle form submissions and data mutations in Next.js applications.",
      url: "#",
    }, */
  ],
};

export function AppSidebar() {
  const { user, signout } = useAuth();
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
          <SidebarLabel>Help</SidebarLabel>
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
}
