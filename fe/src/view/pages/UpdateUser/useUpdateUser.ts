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
import { useTheme } from "@/app/contexts/ThemeContext";

const schema = z.object({
  name: z.string().nonempty("Nome é obrigatório"),
  email: z.string().nonempty("Email é obrigatório"),
  password: z
    .string()
    .nonempty("Senha é obrigatório")
    .min(3, "A senha deve conter pelo menos 3 dígitos."),
});

type FormData = z.infer<typeof schema>;

export const useUpdateUser = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: user?.name,
      email: user?.email,
    },
  });

  const queryClient = useQueryClient();
  const { primaryColor } = useTheme();
  const { isPending: isLoading, mutateAsync } = useMutation({
    mutationFn: usersService.update,
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await mutateAsync({
        id: user?.id!,
        accessLevel: user?.accessLevel as AccessLevel,
        ...data,
      });

      customColorToast("Usuário editado com Sucesso!", primaryColor, "success");
      reset();

      queryClient.invalidateQueries({ queryKey: ["users"] });
      navigate("/dashboard");
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
  };
};
