import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { useUpdateUser } from "./useUpdateUser";

const UpdateUser = () => {
  const { errors, register, handleSubmit, isLoading } = useUpdateUser();

  return (
    <div className="w-full h-full flex justify-center i'tems-center">
      <Header title="" displayRig={false} displayPeriodRange={false} />

      <div className="w-full h-full ">
        <form className="p-4" onSubmit={handleSubmit}>
          <div className="w-full p-8 bg-gray-300 rounded-lg flex flex-col gap-2 lg:w-1/2 lg:mx-auto">
            <header className="py-6">
              <h1 className="text-xl font-bold text-gray-900">Atualizar Usuário</h1>
              <span className="tracking-tighter text-gray-700">Edite suas informações de perfil abaixo</span>
            </header>
            <div className="w-full">
              <Input
                className=" bg-white w-full rounded-lg border-2 text-black border-white focus:border-white   hover:bg-gray-100 hover:border-3 cursor-not-allowed"
                placeholder="Nome"
                disabled
                labelStyles="text-black"
                error={errors.name?.message}
                {...register("name")}
              />
            </div>

            <div className="w-full">
              <Input
                className=" bg-white w-full rounded-lg border-2 text-black border-white focus:border-white   hover:bg-gray-100 hover:border-3 cursor-not-allowed"
                placeholder="Email"
                type="email"
                disabled
                labelStyles="text-black"
                error={errors.email?.message}
                {...register("email")}
              />
            </div>

            <div className="w-full">
              <Input
                className=" bg-white w-full rounded-lg border-2 text-black border-white focus:border-white   hover:bg-gray-100 hover:border-3"
                placeholder="Senha"
                type="password"
                labelStyles="text-black"
                error={errors.password?.message}
                {...register("password")}
              />
            </div>

            <div className="w-full">
              <div className="flex gap-1"></div>
            </div>
            <Button type="submit" isLoading={isLoading}>
              Atualizar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
