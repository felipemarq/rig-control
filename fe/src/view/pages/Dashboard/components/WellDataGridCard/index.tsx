import { useWellDataGridCard } from "./useWellDataGridCard";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Spinner } from "@/view/components/Spinner";
import { NotFound } from "@/view/components/NotFound";
import { WellDataGrid } from "./components/WellDataGrid";

export const WellDataGridCard = () => {
  const { isEmpty, isFetchingEfficiencies, windowWidth } =
    useWellDataGridCard();
  return (
    <Card className="col-span-12 row-span-3 lg:col-span-7 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Poços</CardTitle>
          <CardDescription>
            Lista de poços do período selecionado
          </CardDescription>
        </div>
        {/* <Button asChild size="sm" className="ml-auto gap-1">
          <Link to="/">
            View All
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button> */}
      </CardHeader>
      <CardContent className="p-0 h-4/5 ">
        {isFetchingEfficiencies && (
          <div className="h-full flex items-center justify-center">
            <Spinner />
          </div>
        )}
        {!isEmpty && !isFetchingEfficiencies && (
          <div className="max-w-full">
            <WellDataGrid isDashboard windowWidth={windowWidth} />
          </div>
        )}

        {isEmpty && !isFetchingEfficiencies && (
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
      </CardContent>
    </Card>
  );
};
