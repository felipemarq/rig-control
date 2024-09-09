import { Controller, FormProvider } from "react-hook-form";
import { UF } from "../../../app/entities/Rig";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Select } from "../../components/Select";
import { useCreateRig } from "./useCreateRig";
import { Stepper } from "@/view/components/Stepper";
import { PeriodAndTaxesStep } from "@/view/components/Stepper/steps/PeriodAndTaxesStep";
import { MobilizationTaxesStep } from "@/view/components/Stepper/steps/MobilizationTaxesStep";
import { TruckTaxesStep } from "@/view/components/Stepper/steps/TruckTaxesStep";
import { EquipmentTaxesStep } from "@/view/components/Stepper/steps/EquipmentTaxesStep";
import { TankMixTaxesStep } from "@/view/components/Stepper/steps/TankMixTaxesStep";

export const CreateRig = () => {
  const { form, handleSubmit, contracts } = useCreateRig();
  return (
    <div className="w-full h-full overflow-y-scroll">
      <Header
        title="Cadastrar Sonda"
        displayRig={false}
        displayPeriodRange={false}
      >
        <></>
      </Header>

      <div className="min-h-fit flex justify-center py-6  w-full  mb-10">
        <FormProvider {...form}>
          <form
            onSubmit={handleSubmit}
            className="w-2/5  rounded-xl border bg-card text-card-foreground shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] p-2 "
          >
            <div className="p-4 text-black w-full text-center">
              Dados da Sonda
            </div>
            <div className="w-full p-4   flex flex-col gap-2 lg:flex-row">
              <div className="w-full">
                <Input
                  className=" bg-white w-full rounded-lg border-2 text-black border-white focus:border-white   hover:bg-gray-100 hover:border-3"
                  placeholder="Nome da Sonda"
                  labelStyles="text-black"
                  error={form.formState.errors.name?.message}
                  {...form.register("name")}
                />
              </div>
              <div className="w-full">
                <div className="flex gap-1">
                  <div className="flex-1">
                    <Controller
                      control={form.control}
                      defaultValue={UF.BA}
                      name="state"
                      render={({ field: { onChange, value } }) => (
                        <Select
                          value={value}
                          placeholder="Estado"
                          onChange={onChange}
                          options={Object.values(UF).map((uf) => ({
                            value: uf,
                            label: uf,
                          }))}
                        />
                      )}
                    />
                  </div>

                  <div className="flex-1">
                    <Controller
                      control={form.control}
                      name="contractId"
                      render={({ field: { onChange, value } }) => (
                        <Select
                          value={value}
                          error={form.formState.errors.contractId?.message}
                          placeholder="Contrato"
                          onChange={onChange}
                          options={contracts.map(({ id, name }) => ({
                            value: id,
                            label: name,
                          }))}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="m-4  flex justify-center">
              <span className="m-4 text-black">
                Dados para previsão de cálculo da sonda
              </span>
            </div>

            <Stepper
              steps={[
                {
                  label: "Taxas de operação",
                  content: <PeriodAndTaxesStep />,
                },
                {
                  label: "Taxas de movimentação",
                  content: <MobilizationTaxesStep />,
                },
                {
                  label: "Taxas de Caminhão",
                  content: <TruckTaxesStep />,
                },
                {
                  label: "Taxas de Equipamento",
                  content: <EquipmentTaxesStep />,
                },
                {
                  label: "Taxas de Tanque Mix",
                  content: <TankMixTaxesStep />,
                },
              ]}
            />
          </form>
        </FormProvider>
      </div>
    </div>
  );
};
