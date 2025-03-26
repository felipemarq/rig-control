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

const Checklists = () => {
  return (
    <ChecklistsProvider>
      <ChecklistsContext.Consumer>
        {({ handleApplyFilters, isFetchingChecklists }) => (
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

            <div>
              <StatboxContainer />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 ">
                <BarChartByCategory />
                <BarChartByRig />
                <ChecklistsContainer />
              </div>
            </div>
          </div>
        )}
      </ChecklistsContext.Consumer>
    </ChecklistsProvider>
  );
};

export default Checklists;
