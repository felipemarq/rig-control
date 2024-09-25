import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { useCreateContract } from "./useCreateContract";

const CreateContract = () => {
  const { errors, register, handleSubmit, isLoading } = useCreateContract();

  return (
    <div className="w-full h-full overflow-y-scroll">
      <Header title="Cadastar Contrato" displayRig={false} displayPeriodRange={false}>
        <></>
      </Header>

      <div className="w-full h-full ">
        <form className="p-4" onSubmit={handleSubmit}>
          <span className="p-4 text-black">Dados da Sonda</span>
          <div className="w-full p-4 px-10 flex items-center justify-center flex-col gap-2 ">
            <div className="w-1/2">
              <Input
                className=" bg-white w-full rounded-lg border-2 text-black border-white focus:border-white   hover:bg-gray-100 hover:border-3"
                placeholder="Nome do Contrato"
                labelStyles="text-black"
                error={errors.name?.message}
                {...register("name")}
              />
            </div>
            <div className="  w-1/2 p-4 rounded-lg  flex flex-col  ">
              <Button type="submit" isLoading={isLoading}>
                Enviar
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateContract;
