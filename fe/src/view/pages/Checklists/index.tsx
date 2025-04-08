import {
  ChecklistsContext,
  ChecklistsProvider,
} from "./components/ChecklistsContext";
import { ChecklistsContainer } from "./components/ChecklistsContainer/index.tsx";
import { Header } from "@/view/components/Header.tsx";
import { StatboxContainer } from "./components/StatboxContainer/index.tsx";
import { BarChartByCategory } from "./components/BarChartByCategory/index.tsx";
import { BarChartByRig } from "./components/BarChartByRig/index.tsx";
import { FilterSheet } from "@/view/components/FilterSheet.tsx";
import { Spinner } from "@/view/components/Spinner.tsx";
import { NotFound } from "@/view/components/NotFound.tsx";
import { Button } from "@/components/ui/button.tsx";
import { PlusCircle } from "lucide-react";
import { NewChecklistModal } from "./components/modals/NewChecklistModal/index.tsx";

const Checklists = () => {
  return (
    <ChecklistsProvider>
      <ChecklistsContext.Consumer>
        {({
          handleApplyFilters,
          isFetchingChecklists,
          filteredChecklists,
          openNewChecklistModal,
        }) => (
          <div className="container mx-auto p-4">
            <Header
              displayRig
              displayPeriodRange={false}
              title="Inspeções de campo do SGI"
            >
              <div className="flex gap-2 items-center">
                <FilterSheet
                  onApplyFilters={handleApplyFilters}
                  isLoading={isFetchingChecklists}
                />
              </div>
            </Header>

            {isFetchingChecklists && (
              <div className=" h-full w-full flex items-center justify-center">
                <Spinner />
              </div>
            )}

            {filteredChecklists.length <= 0 && !isFetchingChecklists && (
              <NotFound>
                {" "}
                <div>Sem registros no período selecionado</div>
                <Button className="h-10" onClick={openNewChecklistModal}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Novo checklist
                </Button>
              </NotFound>
            )}

            {filteredChecklists.length > 0 && !isFetchingChecklists && (
              <div>
                <StatboxContainer />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 ">
                  <BarChartByCategory />
                  <BarChartByRig />
                  <ChecklistsContainer />
                </div>
              </div>
            )}
            <NewChecklistModal />
          </div>
        )}
      </ChecklistsContext.Consumer>
    </ChecklistsProvider>
  );
};

export default Checklists;
