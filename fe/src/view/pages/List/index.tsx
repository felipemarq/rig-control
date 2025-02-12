import { Header } from "../../components/Header";
import { Spinner } from "../../components/Spinner";
import { useListController } from "./useListController";
import { CustomFilterSheet } from "@/view/components/CustomFilterSheet";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ListEfficienciesDataGrid } from "../../components/ListEfficienciesDataGrid";
import { NotFound } from "@/view/components/NotFound";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";

const List = () => {
  const { efficiencies, handleApplyFilters, isFetchingEfficiencies, handlePdfDownload } =
    useListController();

  return (
    <div className="w-full h-full ">
      <Header title="LISTAGEM" displayRig>
        <CustomFilterSheet
          isLoading={isFetchingEfficiencies}
          onApplyFilters={handleApplyFilters}
        />
      </Header>

      <div className="w-full h-full  mt-5 max-w-[1400px] flex justify-center ">
        {isFetchingEfficiencies && (
          <div className="lg:w-[70vw] lg:h-[70vh] bg-card p-2 rounded-md flex justify-center items-center">
            <Spinner className="h-12 w-12" />
          </div>
        )}

        {!isFetchingEfficiencies && (
          <div className="h-full  p-2 rounded-md flex justify-center items-center lg:w-[70vw] lg:h-[80vh]">
            <Card className="w-full h-full  overflow-y-auto ">
              <CardHeader></CardHeader>

              {efficiencies.length > 0 && (
                <CardContent className="flex flex-col gap-4">
                  <div className="flex justify-end  gap-10 w-full ">
                    <Button size="sm" className="gap-1" onClick={handlePdfDownload}>
                      <span className="hidden sm:inline">Baixar PDF</span>
                      <FileDown className="h-4 w-4" />
                    </Button>
                  </div>
                  <ListEfficienciesDataGrid
                    data={efficiencies}
                    isDashboard={false}
                    limitPagination={false}
                  />
                </CardContent>
              )}

              {efficiencies.length === 0 && (
                <CardContent className=" flex justify-center items h-full w-full">
                  <div>
                    <NotFound>
                      <p>
                        <strong>Dados não encontrados</strong> para o período selecionado.
                        Por favor, verifique os filtros aplicados ou tente selecionar
                        outro intervalo de datas.
                      </p>
                    </NotFound>
                  </div>
                </CardContent>
              )}
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default List;
