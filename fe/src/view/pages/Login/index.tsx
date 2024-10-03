import { Button } from "../../components/Button";
import { useLoginController } from "./useLoginController";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/view/components/Input";

export const Login = () => {
  const { handleSubmit, register, errors, isLoading } = useLoginController();
  const [showPassword, setShowPassword] = useState(false);
  return (
    //Container
    <div className="min-h-screen w-full flex items-center justify-center  p-4">
      <div className="bg-secondaryAccent-500 w-[90%] max-w-[1000px] rounded-2xl lg:w-[40%] text-center shadow-lg">
        <div
          className="w-full h-[300px] flex flex-col justify-between bg-cover bg-center bg-sonda-mar rounded-t-2xl"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 70%, 0% 100%)",
          }}
        >
          <div className="h-24 w-24 bg-no-repeat bg-contain bg-center bg-[url('/logo.png')] m-4"></div>
          <div className="h-8 w-full bg-primary"></div>
        </div>

        <h1 className="font-bold text-white text-4xl mt-6 mb-8">Login</h1>

        <form
          className="flex flex-col justify-around gap-6 px-3 lg:px-12 mb-8"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-6">
            <div>
              <Input
                type="email"
                placeholder="E-mail"
                {...register("email")}
                error={errors.email?.message}
              />
            </div>

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Senha"
                {...register("password")}
                error={errors.password?.message}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
              )}
            </div>

            <div className="w-1/2 mx-auto">
              <Button
                type="submit"
                className="mt-2 w-full bg-primary hover:bg-primary-dark text-white"
                disabled={isLoading}
              >
                {isLoading ? "Carregando..." : "Fazer Login"}
              </Button>
            </div>
          </div>
        </form>

        <div className="text-sm text-white mb-6">
          <a
            href="#"
            className="hover:underline text-gray-300 cursor-not-allowed"
            onClick={() => alert("Em breve disponível!")}
          >
            Esqueceu sua senha?
          </a>
        </div>
      </div>
    </div>
  );
};
