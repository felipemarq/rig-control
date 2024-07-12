import { useState } from "react";

import {
  Menu,
  MenuItem,
  MenuItemStyles,
  Sidebar as ReactProSidebar,
  SubMenu,
} from "react-pro-sidebar";
import {
  ArchiveIcon,
  BarChart,
  ChevronRight,
  CircleDollarSign,
  CircleUserRound,
  Construction,
  FileInput,
  ReceiptPoundSterling,
  Text,
} from "lucide-react";
import { Button } from "./Button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import logo from "@/assets/images/conterp-logo.png";
import { useAuth } from "@/app/hooks/useAuth";
import { useSidebarContext } from "@/app/contexts/SidebarContext";

interface SidebarProps {
  className?: string;
}

const menuItemStyles: MenuItemStyles = {
  root: {
    color: "white",
  },

  SubMenuExpandIcon: {
    color: "#b6b7b9",
  },

  button: {
    "&:hover": {
      backgroundColor: "#499595",
      color: "#fff",
    },
  },
  label: ({ open }) => ({
    fontWeight: open ? 600 : undefined,
  }),
};

export const Sidebar = ({ className }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { activeTab, handleToggleNavItem } = useSidebarContext();

  const { isUserAdm } = useAuth();

  return (
    <div className={cn("hidden lg:flex h-full", className)}>
      <ReactProSidebar collapsed={isCollapsed}>
        <div className="flex flex-col h-full bg-primary">
          <div className="p-5  flex  items-center justify-between">
            {!isCollapsed && (
              <div className=" w-full flex justify-center">
                <img
                  //onClick={() => navigate("/")}
                  src={logo}
                  // width={}
                  height={40}
                  alt="logo"
                  className="rounded-full cursor-pointer"
                />
              </div>
            )}

            <ChevronRight
              size={32}
              className={cn(
                "transform transition-transform duration-300 ease-in text-white",
                !isCollapsed ? "-rotate-180" : "rotate-0"
              )}
              onClick={() => setIsCollapsed((prevState) => !prevState)}
            />
          </div>
          <div className="flex-1  h-full">
            <Menu className="hover:bg-primary" menuItemStyles={menuItemStyles}>
              <SubMenu
                label="Dashboard"
                icon={<BarChart />}
                className="hover:bg-primary text-white"
              >
                <Link to="/global-dashboard">
                  <MenuItem className="bg-primary"> Dashboard Geral</MenuItem>
                </Link>
                <Link to="/dashboard">
                  <MenuItem className="bg-primary">
                    {" "}
                    Dashboard por Sonda
                  </MenuItem>
                </Link>
              </SubMenu>

              <SubMenu
                label="Faturamento"
                icon={<CircleDollarSign />}
                className="hover:bg-primary text-white"
              >
                <Link to="/invoicing-dashboard">
                  <MenuItem className="bg-primary"> Faturamento Geral</MenuItem>
                </Link>
                <Link to="/invoicing-rig-dashboard">
                  <MenuItem className="bg-primary">
                    Faturamento por Sonda
                  </MenuItem>
                </Link>
              </SubMenu>

              <Link to="/form/menu">
                <MenuItem icon={<FileInput />} className="bg-primary">
                  Formulário
                </MenuItem>
              </Link>

              <Link to="/list">
                <MenuItem icon={<ArchiveIcon />} className="bg-primary">
                  Ocorrências
                </MenuItem>
              </Link>

              <Link to="/occurrences">
                <MenuItem icon={<ArchiveIcon />} className="bg-primary">
                  Segurança
                </MenuItem>
              </Link>

              {isUserAdm && (
                <>
                  <Link
                    to="/list-rigs"
                    onClick={() => handleToggleNavItem("list-rigs")}
                    className={cn(
                      "text-gray-500 transition-colors hover:text-white",
                      activeTab === "list-rigs" ? "text-white " : ""
                    )}
                  >
                    <MenuItem icon={<Construction />} className="bg-primary">
                      Sondas
                    </MenuItem>
                  </Link>

                  <Link
                    to="/contracts"
                    onClick={() => handleToggleNavItem("contracts")}
                    className={cn(
                      "text-gray-500 transition-colors hover:text-white",
                      activeTab === "contracts" ? "text-white " : ""
                    )}
                  >
                    <MenuItem
                      icon={<Text />}
                      className={cn(
                        "",
                        activeTab === "contracts" ? "text-white " : ""
                      )}
                    >
                      Contratos
                    </MenuItem>
                  </Link>

                  <Link
                    to="/users"
                    onClick={() => handleToggleNavItem("users")}
                  >
                    <MenuItem icon={<CircleUserRound />} className="bg-primary">
                      Usuários
                    </MenuItem>
                  </Link>
                </>
              )}

              <Link to="/reports">
                <MenuItem
                  icon={<ReceiptPoundSterling />}
                  className="bg-primary"
                >
                  Relatórios
                </MenuItem>
              </Link>
            </Menu>
          </div>
          <div className="  p-4">
            <Button
              className="w-full bg-transparent border border-white text-white hover:bg-white/5"
              variant="ghost"
            >
              Sair
            </Button>
          </div>
        </div>
      </ReactProSidebar>
    </div>
  );
};
