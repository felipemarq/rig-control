import { Module } from "@/app/entities/Module";
import { useAuth } from "@/app/hooks/useAuth";
import {
  History,
  Settings2,
  Star,
  Workflow,
  CircleDollarSign,
  Shield,
  Laptop,
} from "lucide-react";

//import whiteIcon from "@/assets/images/white-icon.png";
import { useMemo } from "react";

export const useAppsidebar = () => {
  const { user, signout } = useAuth();

  const ALL_MENUS = [
    {
      title: "Operação",
      url: "#",
      icon: Workflow,
      module: Module.OPERATION,
      isActive: true,
      items: [
        {
          title: "Dashboard Geral",
          url: "/global-dashboard",
          icon: History,
          description: "View your recent prompts",
          module: Module.OPERATION,
        },
        {
          title: "Dashboard por Sonda",
          url: "/dashboard",
          icon: Star,
          description: "Browse your starred prompts",
          module: Module.OPERATION,
        },
        {
          title: "Listar BDOs",
          url: "/list",
          icon: Settings2,
          description: "Configure your playground",
          module: Module.OPERATION,
        },
        {
          title: "Planos de Ação",
          url: "/period-action-plan",
          icon: Settings2,
          description: "Configure your playground",
          module: Module.OPERATION,
        },
        {
          title: "Criar BDO",
          url: "/form/menu",
          icon: Settings2,
          description: "Configure your playground",
          module: Module.OPERATION,
        },
        {
          title: "Relatório de Períodos",
          url: "/reports",
          icon: Settings2,
          description: "Configure your playground",
          module: Module.OPERATION,
        },
      ],
    },
    {
      title: "Faturamento",
      url: "#",
      icon: CircleDollarSign,
      module: Module.BILLING,
      isActive: true,
      items: [
        {
          title: "Faturam.. Geral",
          url: "/invoicing-dashboard",
          icon: History,
          description: "View your recent prompts",
          module: Module.BILLING,
        },
        {
          title: "Valores para Faturam..",
          url: "/create-billing-configuration",
          icon: Settings2,
          description: "Configure your playground",
          module: Module.BILLING,
        },
      ],
    },
    {
      title: "SMS",
      url: "#",
      icon: Shield,
      module: Module.SMS,
      isActive: true,
      items: [
        {
          title: "Dashboard SMS",
          url: "/dashboard/sms",
          icon: History,
          description: "View your recent prompts",
          module: Module.SMS,
        },
        {
          title: "Listar Ocorrências",
          url: "/occurrences",
          icon: Settings2,
          description: "Configure your playground",
          module: Module.SMS,
        },
        {
          title: "Homem Hora",
          url: "/man-hours",
          icon: Settings2,
          description: "Configure your playground",
          module: Module.SMS,
        },
        {
          title: "Inspeção de Campo do SGI",
          url: "/checklist",
          icon: History,
          description: "View your recent prompts",
          module: Module.SMS,
        },
      ],
    },
    {
      title: "Gerenciamento",
      url: "#",
      icon: Laptop,
      module: Module.ADMIN,
      isActive: true,
      items: [
        {
          title: "Sondas",
          url: "/list-rigs",
          icon: Settings2,
          description: "Configure your playground",
          module: Module.ADMIN,
        },
        /* {
          title: "Contratos",
          url: "/contracts",
          icon: Settings2,
          description: "Configure your playground",
          module: Module.ADMIN,
        }, */
        {
          title: "Usuários",
          url: "/users",
          icon: Settings2,
          description: "Configure your playground",
          hasNews: true,
          module: Module.ADMIN,
        },
      ],
    },
  ];

  const data = useMemo(() => {
    let allowedMenus: any[] = [];

    if (user) {
      allowedMenus = ALL_MENUS.map((menu) => {
        // Filtra os subitens do menu com base nas permissões do usuário
        const allowedItems = menu.items.filter((item) =>
          user.permissions.some((p) => p.module === item.module && p.canView),
        );

        // Se o menu principal não tem itens visíveis, não adicionamos ao resultado
        if (allowedItems.length === 0) return null;

        return {
          ...menu,
          items: allowedItems,
        };
      }).filter(Boolean); // Remove menus que não têm itens permitidos
    }

    return {
      navMain: allowedMenus,
    };
  }, [user]);
  return { user, signout, data };
};
