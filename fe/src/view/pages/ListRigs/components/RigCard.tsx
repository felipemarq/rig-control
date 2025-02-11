import { ChevronRight, DollarSign, CircleOff, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { NavigateFunction } from "react-router-dom";
import { useTheme } from "@/app/contexts/ThemeContext";
import CreateCommercialPeriodModal from "./CreateCommercialPeriodModal";

interface RigCardProps {
  id: string;
  name: string;
  state: string;
  isActive: boolean;
  stateFlagImagePath?: string;
  onSetRigBeignEdited: (rigId: string) => void;
  navigate: NavigateFunction;
}

export default function RigCard({
  id,
  name,
  state,
  isActive,
  onSetRigBeignEdited,
  navigate,
}: RigCardProps) {
  const { primaryColor } = useTheme();
  return (
    <Card className="overflow-hidden shadow-lg" id={id}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-green-500 to-primary text-white p-6">
        <div className="flex items-center space-x-4">
          <div>
            <CardTitle className="text-2xl font-bold">{name}</CardTitle>
            <p className="text-sm opacity-75">{state}</p>
          </div>
        </div>
        <Badge
          variant="default"
          className="rounded-full px-3 py-1 text-sm font-medium bg-green-400 text-green-800"
        >
          {isActive}
        </Badge>
      </CardHeader>
      <CardContent className="pt-6 pb-8 px-6">
        <div className="space-y-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Button
              onClick={() => onSetRigBeignEdited(id)}
              variant="ghost"
              className="w-full justify-between text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-4 transition-all duration-200"
            >
              <span className="flex items-center space-x-3">
                <Pencil className="h-5 w-5" style={{ color: primaryColor }} />
                <span>Editar sonda</span>
              </span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </Button>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Button
              onClick={() => navigate(`/billing-configuration/${id}`)}
              variant="ghost"
              className="w-full justify-between text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-4 transition-all duration-200"
            >
              <span className="flex items-center space-x-3">
                <DollarSign className="h-5 w-5" style={{ color: primaryColor }} />
                <span>Ver Valores para faturamento</span>
              </span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </Button>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <CreateCommercialPeriodModal selectedRig={id}>
              <Button
                variant="ghost"
                className="w-full justify-between text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-4 transition-all duration-200"
              >
                <span className="flex items-center space-x-3">
                  <CircleOff className="h-5 w-5" style={{ color: primaryColor }} />
                  <span>Adicionar período de parada comercial</span>
                </span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Button>
            </CreateCommercialPeriodModal>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
}
