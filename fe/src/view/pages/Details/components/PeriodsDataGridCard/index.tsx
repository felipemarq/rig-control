import { Button } from "@/components/ui/button";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Check, FileDown, Pencil, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { Spinner } from "@/view/components/Spinner";
import { usePeriodsDataGrid } from "./usePeriodsDataGrid";
import { PeriodsDataGrid } from "./components/PeriodsDataGrid";
import { NotFound } from "@/view/components/NotFound";
import { formatDate } from "@/app/utils/formatDate";
import { MoreDetailsDialog } from "./components/MoreDetailsDialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const PeriodsDataGridCard = () => {
  const {
    isFetchingEfficiency,
    efficiency,
    canUserEdit,
    openDeleteModal,
    handleUpdateEfficiency,
    isLoadingUpdateEfficiency,
    windowWidth,
    efficiencyId,
    openDetailModal,
    handleExcelDownload,
    state,
  } = usePeriodsDataGrid();

  console.log("efficiency", efficiency);

  return (
    <Card className="col-span-12 row-span-4 lg:col-span-12 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] overflow-y-auto">
      <CardHeader className="flex flex-row items-center justify-between gap-4 ">
        <div className="grid gap-2">
          <CardTitle>Ocorrências</CardTitle>
          <CardDescription>
            <span>
              {" "}
              Lista de ocorrências da operação da sonda {efficiency?.rig.name} no dia{" "}
              {formatDate(new Date(efficiency?.date!))}
            </span>{" "}
          </CardDescription>
        </div>
        {efficiency && (
          <>
            <div className="flex justify-end  gap-5 lg:w-1/2 ">
              {!efficiency.isConfirmed && canUserEdit && (
                <Button
                  size="sm"
                  className="flex justify-center items-center gap-2"
                  disabled={isLoadingUpdateEfficiency}
                  onClick={() =>
                    handleUpdateEfficiency({ attribute: "isConfirmed", value: true })
                  }
                >
                  <Check className="h-4 w-4" />
                  <span>Confirmar Registro</span>
                </Button>
              )}

              <MoreDetailsDialog efficiency={efficiency} />

              {canUserEdit && (
                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button size="sm" className="gap-1" onClick={handleExcelDownload}>
                        <FileDown className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Baixar arquivo em Excel</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}

              {efficiency.isEditable && (
                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        asChild
                        size="sm"
                        className="flex justify-center items-center gap-1"
                      >
                        <Link to={`/form/${efficiencyId}`}>
                          <Pencil className="h-4 w-4" />
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Editar Registro</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}

              {!efficiency.isEditable && canUserEdit && (
                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="sm"
                        className="flex justify-center items-center gap-2"
                        disabled={isLoadingUpdateEfficiency}
                        onClick={() =>
                          handleUpdateEfficiency({ attribute: "isEditable", value: true })
                        }
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Tornar Registro Editável</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}

              {canUserEdit && (
                <Button
                  size="sm"
                  className="gap-1"
                  onClick={openDeleteModal}
                  variant="destructive"
                >
                  <span className="hidden sm:inline"> Deletar Registro</span>
                  <Trash className="h-4 w-4" />
                </Button>
              )}
            </div>
          </>
        )}
      </CardHeader>
      <CardContent className="p-0 h-4/5 ">
        {isFetchingEfficiency && (
          <div className="h-full flex items-center justify-center">
            <Spinner />
          </div>
        )}

        {efficiency && !isFetchingEfficiency && (
          <div className="max-w-full">
            <PeriodsDataGrid
              data={efficiency}
              windowWidth={windowWidth}
              openDetailModal={openDetailModal}
              state={state}
            />
          </div>
        )}

        {!efficiency && !isFetchingEfficiency && (
          <div className="h-full flex items-center justify-center">
            <NotFound>
              {
                <p>
                  Sem dados para o <strong>período</strong> selecionado
                </p>
              }
            </NotFound>
          </div>
        )}
        {/*  

         */}
      </CardContent>
    </Card>
  );
};
