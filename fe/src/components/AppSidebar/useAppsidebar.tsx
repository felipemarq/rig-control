import { useAuth } from "@/app/hooks/useAuth";
import {
  History,
  LifeBuoy,
  Send,
  Settings2,
  Star,
  Workflow,
  CircleDollarSign,
  Shield,
} from "lucide-react";

import whiteIcon from "@/assets/images/white-icon.png";
import { useMemo } from "react";

const Image = () => {
  return <img src={whiteIcon} />;
};

export const useAppsidebar = () => {
  const { user, signout, isUserAdm, isUserSms } = useAuth();
  const admData = {
    teams: [
      {
        name: "Conterp",
        logo: Image,
        plan: "Enterprise",
      },
    ],
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
    projects: [],
    searchResults: [],
  };

  const userData = {
    teams: [
      {
        name: "Conterp",
        logo: Image,
        plan: "Enterprise",
      },
    ],
    navMain: [
      {
        title: "Operação",
        url: "#",
        icon: Workflow,
        isActive: true,
        items: [
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
    projects: [],
    searchResults: [],
  };

  const smsData = {
    teams: [
      {
        name: "Conterp",
        logo: Image,
        plan: "Enterprise",
      },
    ],
    navMain: [
      {
        title: "Operação",
        url: "#",
        icon: Workflow,
        isActive: true,
        items: [
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
            title: "Relatório de Períodos",
            url: "/reports",
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
    projects: [],
    searchResults: [],
  };

  const data = useMemo(() => {
    if (isUserAdm) {
      return admData;
    }

    if (isUserSms) {
      return smsData;
    }

    return userData;
  }, [user]);
  return { user, signout, data };
};

/* const data = {
  teams: [
    {
      name: "Conterp",
      logo: Image,
      plan: "Enterprise",
    },
  ],
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
  projects: [],
  searchResults: [],
};
 */
