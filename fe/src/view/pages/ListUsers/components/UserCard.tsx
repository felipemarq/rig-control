import { Info, Edit, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { formatLastlogin } from "@/app/utils/formatLastLogin";
import { useNavigate } from "react-router-dom";

interface UserCardProps {
  name: string;
  id: string;
  email: string;
  loginTime: string;
  isActive: boolean;
}

export default function UserCard({
  email,
  id,
  name,
  loginTime,
  isActive,
}: UserCardProps) {
  const navigate = useNavigate();
  return (
    <motion.div
      key={id}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card className="overflow-hidden">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-primary mix-blend-multiply" />
          <div className="w-full h-3" />
          <CardHeader className="relative z-10 pb-0">
            <div className="flex justify-between items-start">
              <Avatar className="h-16 w-16 border-2 border-white">
                <AvatarImage
                  src={`https://api.dicebear.com/6.x/initials/svg?seed=${name}`}
                />
                <AvatarFallback>
                  {name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <Badge
                variant={isActive ? "secondary" : "destructive"}
                className="mt-2"
              >
                {isActive ? "Ativo" : "Inativo"}
              </Badge>
            </div>
          </CardHeader>
        </div>
        <CardContent className="pt-4">
          <CardTitle className="text-xl mb-1">{name}</CardTitle>
          <p className="text-sm text-gray-500 mb-4">{email}</p>
          <div className="flex items-center mb-4">
            <HoverCard>
              <HoverCardTrigger asChild>
                <div className="flex items-center cursor-help">
                  <Info className="h-4 w-4 text-primary mr-2" />
                  <span className="text-sm">
                    Último login: {formatLastlogin(loginTime)}
                  </span>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <p className="text-sm">
                  {Number(new Date(loginTime)) === 0
                    ? "O usuário ainda não fez login no sistema."
                    : `Último acesso em ${formatLastlogin(loginTime)}`}
                </p>
              </HoverCardContent>
            </HoverCard>
          </div>
          <div className="flex justify-between">
            <Button
              variant="ghost"
              size="sm"
              className="text-primary hover:text-primaryAccent-800"
              onClick={() => navigate(`/users/update-rigs/${id}`)}
            >
              <Edit className="mr-1 h-4 w-4" />
              Editar Sondas
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary hover:text-primaryAccent-800"
              onClick={() => navigate(`/users/user-logs/${id}`)}
            >
              <Activity className="mr-1 h-4 w-4" />
              Ver Atividade
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
