import { PlusIcon } from "@radix-ui/react-icons";
import { Header } from "../../components/Header";
import { Spinner } from "../../components/Spinner";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";

import { EditRigModal } from "./modals/EditRigModal";
import { ListRigsContext, ListRigsProvider } from "./ListRigsContext";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import RigCard from "./components/RigCard";

const ListRigs = () => {
  const navigate = useNavigate();
  return (
    <ListRigsProvider>
      <ListRigsContext.Consumer>
        {({ isFetchingRigs, rigs, rigBeingEdited, handleSetRigBeingEdited }) => (
          <div className="w-full h-full overflow-y-scroll">
            <Header title="Sondas" displayRig={false} displayPeriodRange={false} />

            <div className="w-full h-full ">
              <div className="border border-b-2">
                {isFetchingRigs && (
                  <div className="flex justify-center items-center h-1/2">
                    <Spinner />
                  </div>
                )}
                {!isFetchingRigs && (
                  <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto p-6">
                    {/*  <div
                      onClick={() => navigate("/create-rig")}
                      className="p-4 bg-white rounded-2xl shadow-[0_1px_2px] flex  h-20 gap-4 justify-center items-center border-l-4  border-primary lg:w-2/5 cursor-pointer"
                    >
                      <div className="h-11 w-11 rounded-full border-2 border-dashed border-gray-600 flex justify-center items-center">
                        <PlusIcon className="w-6 h-6 text-gray-600" />
                      </div>
                      <span className="font-medium tracking-[-0.5px] block text-center  text-gray-600">
                        Adicionar Sonda
                      </span>
                    </div> */}

                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                      <Card
                        className="group cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden "
                        onClick={() => navigate("/create-rig")}
                      >
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-primary mix-blend-multiply" />

                          <CardContent className="relative flex flex-col items-center justify-center min-h-[300px] p-8 text-white">
                            <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm">
                              <Plus className="h-8 w-8" />
                            </div>
                            <h3 className="mt-6 text-2xl font-bold text-center">
                              Criar uma nova Sonda
                            </h3>
                            <p className="mt-2 text-sm text-center opacity-90 max-w-xs">
                              Expanda suas operações adicionando uma nova sonda ao seu
                              portfólio
                            </p>
                          </CardContent>
                        </div>
                      </Card>
                    </motion.div>
                    {/*     {rigs.map(({ id, name, state, isActive, stateFlagImagePath }) => (
                      <Card
                        className=" col-span-12 lg:col-span-3 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] flex flex-col justify-around"
                        key={id}
                      >
                        <CardHeader className="flex flex-row gap-6  items-center">
                          <div className=" ">
                            <img
                              className="h-8 rounded-md shadow-[0px_3px_15px_#718096]"
                              src={
                                stateFlagImagePath ??
                                "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Bandeira_da_Bahia.svg/383px-Bandeira_da_Bahia.svg.png"
                              }
                            />
                          </div>
                          <div className="flex-1 flex justify-between items-center">
                            <div className="flex flex-col gap-2">
                              <CardTitle>{name}</CardTitle>
                              <CardDescription>{state}</CardDescription>
                            </div>
                            {isActive && (
                              <div>
                                <Badge className="bg-emerald-500">Ativa</Badge>
                              </div>
                            )}

                            {!isActive && (
                              <div>
                                <Badge variant="destructive">Desativada</Badge>
                              </div>
                            )}
                          </div>
                        </CardHeader>

                        <CardFooter className="flex justify-between flex-col gap-4 ">
                          <span
                            className="text-xs underline cursor-pointer text-primary"
                            onClick={() => handleSetRigBeingEdited(id)}
                          >
                            Editar Sonda
                          </span>

                          <span
                            className="text-xs underline cursor-pointer text-primary"
                            onClick={() => navigate(`/billing-configuration/${id}`)}
                          >
                            Ver Valores para faturamento
                          </span>

                          <span className="text-xs underline cursor-pointer text-primary">
                            Adicionar período de parada comercial
                          </span>
                        </CardFooter>
                      </Card>
                    ))} */}

                    {rigs.map(({ id, name, state, isActive, stateFlagImagePath }) => (
                      <RigCard
                        id={id}
                        name={name}
                        state={state}
                        isActive={isActive}
                        stateFlagImagePath={stateFlagImagePath}
                        onSetRigBeignEdited={handleSetRigBeingEdited}
                        navigate={navigate}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {rigBeingEdited && <EditRigModal />}
          </div>
        )}
      </ListRigsContext.Consumer>
    </ListRigsProvider>
  );
};
export default ListRigs;
