import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { treatAxiosError } from "../../../app/utils/treatAxiosError";
import { AxiosError } from "axios";
import { customColorToast } from "../../../app/utils/customColorToast";
import { useNavigate } from "react-router-dom";
import { usersService } from "../../../app/services/usersService";
import { AccessLevel } from "../../../app/entities/AccessLevel";
import { useAuth } from "../../../app/hooks/useAuth";
import { useContracts } from "../../../app/hooks/contracts/useContracts";
import { useContractRigs } from "../../../app/hooks/contracts/useContractRigs";
import { useEffect } from "react";
import { QueryKeys } from "../../../app/config/QueryKeys";
import { useTheme } from "@/app/contexts/ThemeContext";

const schema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().min(1, "Email é obrigatório"),
  accessLevel: z.enum(["ADM", "USER", "VIEWER", "SUPERVISOR"]),
  rigId: z.string().min(1, "Sonda é obrigatório"),
  contractId: z.string().min(1, "Contrato é obrigatório"),
});

type FormData = z.infer<typeof schema>;

export const useCreateUser = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { primaryColor } = useTheme();

  const isUserAdm = user?.accessLevel === "ADM";
  const { contracts, isFetchingContracts } = useContracts(isUserAdm);

  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const selectedContract = watch("contractId");

  const { contractRigs, refetchContractRigs, isFetchingContractRigs } =
    useContractRigs(selectedContract);

  useEffect(() => {
    refetchContractRigs();
  }, [selectedContract]);

  const queryClient = useQueryClient();
  const { isPending: isLoading, mutateAsync } = useMutation({
    mutationFn: usersService.create,
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        accessLevel: data.accessLevel as AccessLevel,
        password: "conterp",
      });

      customColorToast("Usuário cadastrado com Sucesso!", primaryColor, "success");
      reset();

      queryClient.invalidateQueries({ queryKey: [QueryKeys.USERS] });
      navigate("/users");
    } catch (error: any | typeof AxiosError) {
      treatAxiosError(error);
      console.log(error);
      navigate("/dashboard");
    }
  });

  return {
    register,
    control,
    errors,
    handleSubmit,
    isLoading,
    contracts,
    isFetchingContracts,
    contractRigs,
    isFetchingContractRigs,
  };
};
